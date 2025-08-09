
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Skill } from '../types';

interface HomeProps {
  skills: Skill[];
  categories: string[];
}

const FeaturedSkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div className="skill-card bg-fnbAccent rounded-xl p-6 shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
        <div className="text-center mb-4 flex-grow">
            <div className="bg-fnbLight text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${skill.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-bold text-fnbDark">{skill.name}</h3>
            <p className="text-gray-600 mt-2">{skill.description}</p>
        </div>
        <div className="flex justify-between items-center text-sm mt-4 text-gray-600">
            <span className="bg-white text-fnbDark px-3 py-1 rounded-full">{skill.category}</span>
            <span><i className="fas fa-map-marker-alt mr-1"></i> {skill.location}</span>
        </div>
        <Link to={`/skills/${skill.id}`} className="block w-full text-center mt-4 bg-fnbDark text-white py-2 rounded-lg hover:bg-opacity-90 transition">
            View Details
        </Link>
    </div>
);


const Home: React.FC<HomeProps> = ({ skills, categories }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/skills?search=${searchQuery}`);
    }
  };

  const featuredSkills = skills.filter(skill => skill.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-fnbDark to-fnbLight text-white">
          <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Skills Can Change Someone's Life</h1>
              <p className="text-xl mb-10 max-w-2xl mx-auto">Request Services or Swap skills with your community - Learn what you need, share what you know.</p>
              
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
                  <div className="relative">
                      <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for skills..." 
                        className="w-full py-4 px-6 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-fnbLight"
                      />
                      <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-fnbDark text-white py-2 px-6 rounded-full hover:bg-opacity-90 transition">
                          <i className="fas fa-search mr-2"></i> Search
                      </button>
                  </div>
              </form>
              
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {categories.slice(0, 5).map(cat => (
                  <Link key={cat} to={`/skills?category=${cat}`} className="bg-white text-fnbDark px-4 py-2 rounded-full cursor-pointer hover:bg-fnbAccent transition">{cat}</Link>
                ))}
              </div>
          </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12 text-fnbDark">Featured Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredSkills.map(skill => (
                  <FeaturedSkillCard key={skill.id} skill={skill} />
                ))}
              </div>
          </div>
      </section>
    </>
  );
};

export default Home;
