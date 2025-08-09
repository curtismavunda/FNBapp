import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };
  
  const closeMenu = () => setIsOpen(false);

  const navLinkClass = "hover:text-fnbLight transition duration-300";
  const mobileLinkClass = "block py-2 hover:text-fnbLight transition";

  return (
    <header className="bg-fnbDark text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <NavLink to={isAuthenticated ? "/" : "/login"}>
            <Logo />
          </NavLink>
          <nav className="hidden md:block">
            {isAuthenticated ? (
              <ul className="flex space-x-6 items-center">
                <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                <li><NavLink to="/skills" className={navLinkClass}>Skills Directory</NavLink></li>
                <li><NavLink to="/offer" className={navLinkClass}>Offer a Skill</NavLink></li>
                <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
                <li className="text-fnbLight">|</li>
                <li><span className="font-semibold">{currentUser?.name}</span></li>
                <li><button onClick={handleLogout} className={`${navLinkClass} bg-fnbLight px-3 py-1 rounded-md`}>Logout</button></li>
              </ul>
            ) : (
              <ul className="flex space-x-6 items-center">
                 <li><NavLink to="/login" className={navLinkClass}>Login</NavLink></li>
                 <li><NavLink to="/register" className={`${navLinkClass} bg-fnbLight px-3 py-1 rounded-md`}>Register</NavLink></li>
              </ul>
            )}
          </nav>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-fnbDark text-white absolute w-full z-40 shadow-lg">
           {isAuthenticated ? (
             <ul className="flex flex-col space-y-3 px-4 pb-4">
               <li><span className="block py-2 font-bold">{currentUser?.name}</span></li>
               <hr className="border-fnbLight"/>
               <li><NavLink to="/" className={mobileLinkClass} onClick={closeMenu}>Home</NavLink></li>
               <li><NavLink to="/skills" className={mobileLinkClass} onClick={closeMenu}>Skills Directory</NavLink></li>
               <li><NavLink to="/offer" className={mobileLinkClass} onClick={closeMenu}>Offer a Skill</NavLink></li>
               <li><NavLink to="/contact" className={mobileLinkClass} onClick={closeMenu}>Contact</NavLink></li>
               <li><button onClick={handleLogout} className={`${mobileLinkClass} w-full text-left`}>Logout</button></li>
             </ul>
           ) : (
            <ul className="flex flex-col space-y-3 px-4 pb-4">
               <li><NavLink to="/login" className={mobileLinkClass} onClick={closeMenu}>Login</NavLink></li>
               <li><NavLink to="/register" className={mobileLinkClass} onClick={closeMenu}>Register</NavLink></li>
             </ul>
           )}
        </div>
      )}
    </header>
  );
};

export default Header;