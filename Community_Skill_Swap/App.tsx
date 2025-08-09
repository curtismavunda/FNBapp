
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Skills from './pages/Skills';
import OfferSkill from './pages/OfferSkill';
import Contact from './pages/Contact';
import SkillDetail from './pages/SkillDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import { SKILLS as initialSkills, INITIAL_CATEGORIES } from './constants';
import { Skill } from './types';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// This type represents the data needed from the form, excluding user details
type SkillFormData = Omit<Skill, 'id' | 'featured' | 'icon' | 'userId' | 'user'>;

function App() {
  const { currentUser } = useAuth();
  
  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
      const savedSkills = localStorage.getItem('skills');
      return savedSkills ? JSON.parse(savedSkills) : initialSkills;
    } catch (error) {
      console.error("Failed to parse skills from localStorage", error);
      return initialSkills;
    }
  });

  const [categories, setCategories] = useState<string[]>(() => {
    try {
      const savedCategories = localStorage.getItem('categories');
      return savedCategories ? JSON.parse(savedCategories) : INITIAL_CATEGORIES;
    } catch (error) {
      console.error("Failed to parse categories from localStorage", error);
      return INITIAL_CATEGORIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('skills', JSON.stringify(skills));
    } catch (error) {
      console.error("Failed to save skills to localStorage", error);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem('categories', JSON.stringify(categories));
    } catch (error) {
      console.error("Failed to save categories to localStorage", error);
    }
  }, [categories]);

  const handleAddSkill = (skillData: SkillFormData) => {
    if (!currentUser) {
      alert("You must be logged in to offer a skill.");
      return;
    }

    const newSkill: Skill = {
      ...skillData,
      id: Date.now(), // Use timestamp for a simple unique ID
      featured: false, // New skills are not featured by default
      icon: 'fa-star', // Default icon for new skills
      userId: currentUser.id,
      user: {
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      }
    };
    setSkills(prevSkills => [newSkill, ...prevSkills]);
  };

  const handleAddCategory = (newCategory: string) => {
    const trimmedCategory = newCategory.trim();
    if (trimmedCategory && !categories.find(cat => cat.toLowerCase() === trimmedCategory.toLowerCase())) {
        setCategories(prevCategories => [...prevCategories, trimmedCategory]);
    }
  };


  return (
    <div className="bg-gray-50 text-slate-800 font-montserrat min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home skills={skills} categories={categories} /></ProtectedRoute>} />
          <Route path="/skills" element={<ProtectedRoute><Skills skills={skills} categories={categories} /></ProtectedRoute>} />
          <Route path="/skills/:skillId" element={<ProtectedRoute><SkillDetail skills={skills} /></ProtectedRoute>} />
          <Route path="/offer" element={<ProtectedRoute><OfferSkill onAddSkill={handleAddSkill} onAddCategory={handleAddCategory} categories={categories} /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer categories={categories}/>
    </div>
  );
}

export default App;
