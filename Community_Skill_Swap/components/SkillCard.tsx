
import React from 'react';
import { Link } from 'react-router-dom';
import { Skill } from '../types';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <Link to={`/skills/${skill.id}`} className="block skill-card bg-white rounded-xl p-6 shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-fnbDark">{skill.name}</h3>
                <p className="text-gray-600 mt-2">{skill.description}</p>
            </div>
            <span className="bg-fnbLight text-white px-3 py-1 rounded-full text-sm flex-shrink-0 ml-2">{skill.category}</span>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span><i className="fas fa-user-circle mr-1 text-fnbLight"></i> {skill.user.name}</span>
            <span><i className="fas fa-map-marker-alt mr-1 text-fnbLight"></i> {skill.location}</span>
        </div>
    </Link>
  );
};

export default SkillCard;
