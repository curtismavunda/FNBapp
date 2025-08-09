
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SkillCard from '../components/SkillCard';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
  categories: string[];
}

const Skills: React.FC<SkillsProps> = ({ skills, categories }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All Skills');

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || 'All Skills');
  }, [searchParams]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === 'All Skills') {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', category);
    }
    setSearchParams(newSearchParams);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchTerm.trim()) {
        newSearchParams.set('search', newSearchTerm);
    } else {
        newSearchParams.delete('search');
    }
    setSearchParams(newSearchParams);
  }


  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = searchTerm === '' ||
                            skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            skill.user.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Skills' || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, searchTerm, selectedCategory]);

  return (
    <section id="directory" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-fnbDark">Skills Directory</h2>
          
           <div className="max-w-md mx-auto mb-10">
             <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by keyword, name, etc..."
                className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-fnbLight focus:border-fnbLight"
              />
           </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
              <button onClick={() => handleCategoryClick('All Skills')} className={`category-btn px-4 py-2 rounded-full border border-fnbLight transition ${selectedCategory === 'All Skills' ? 'bg-fnbDark text-white' : 'bg-white text-fnbDark hover:bg-fnbLight hover:text-white'}`}>All Skills</button>
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => handleCategoryClick(category)} 
                  className={`category-btn px-4 py-2 rounded-full border border-fnbLight transition ${selectedCategory === category ? 'bg-fnbDark text-white' : 'bg-white text-fnbDark hover:bg-fnbLight hover:text-white'}`}
                >
                  {category}
                </button>
              ))}
          </div>
          
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSkills.map(skill => (
                <div key={skill.id} className="fade-in">
                  <SkillCard skill={skill} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-slate-700">No Skills Found</h3>
                <p className="mt-2 text-slate-500">Try adjusting your search or filter. Or, be the first to offer this skill!</p>
            </div>
          )}
      </div>
    </section>
  );
};

export default Skills;
