
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { USERS } from '../constants';

const saveUsersToStorage = (users: User[]) => {
  try {
    localStorage.setItem('usersDB', JSON.stringify(users));
  } catch (e) {
    console.error("Could not save users to localStorage", e);
  }
};

const getUsersFromStorage = (): User[] => {
  try {
    const storedUsers = localStorage.getItem('usersDB');
    if (storedUsers) {
      const parsed = JSON.parse(storedUsers);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // If no stored users or stored users is empty/invalid, seed with initial data
    saveUsersToStorage([...USERS]);
    return [...USERS];
  } catch (e) {
    console.error("Could not read/parse users from localStorage", e);
    // Fallback to initial data and try to save it
    saveUsersToStorage([...USERS]);
    return [...USERS];
  }
};

// For demo purposes, we'll manage the users array in localStorage to persist across reloads.
let usersDB: User[] = getUsersFromStorage();

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for a logged-in user on initial load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const user = usersDB.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userToStore } = user; // Never store password in state/localStorage
      setCurrentUser(userToStore);
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      navigate('/');
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const register = async (userData: Omit<User, 'id'>): Promise<void> => {
    // Re-read from storage to handle multi-tab scenarios
    usersDB = getUsersFromStorage(); 
    if (usersDB.some(u => u.email === userData.email)) {
      throw new Error('A user with this email already exists.');
    }
    const newUser: User = {
      ...userData,
      id: Date.now(),
    };
    usersDB.push(newUser);
    saveUsersToStorage(usersDB); // Persist the updated user list

    // Automatically log in the user after registration
    const { password, ...userToStore } = newUser;
    setCurrentUser(userToStore);
    localStorage.setItem('currentUser', JSON.stringify(userToStore));
    navigate('/');
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
