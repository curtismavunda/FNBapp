import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Skill } from '../types';
import Button from '../components/Button';

const ContactModal: React.FC<{ skill: Skill, onClose: () => void }> = ({ skill, onClose }) => {
    const cleanPhoneNumber = skill.user.phone?.replace(/\D/g, '');

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-300"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-sm w-full transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-fnbDark">Contact {skill.user.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl" aria-label="Close modal">&times;</button>
                </div>
                <p className="text-gray-600 mb-6">Choose your preferred way to get in touch.</p>
                <div className="space-y-3">
                    <a 
                        href={`mailto:${skill.user.email}?subject=Skill Swap Interest: ${skill.name}`} 
                        className="flex items-center w-full text-left bg-fnbAccent p-4 rounded-lg hover:bg-fnbLight hover:text-white transition group"
                    >
                        <i className="fas fa-envelope text-fnbDark text-xl mr-4 group-hover:text-white"></i>
                        <div>
                            <span className="font-bold">Email</span>
                            <span className="text-sm block text-gray-600 group-hover:text-gray-200">{skill.user.email}</span>
                        </div>
                    </a>
                    {cleanPhoneNumber && (
                        <>
                            <a 
                                href={`https://wa.me/${cleanPhoneNumber.startsWith('0') ? '27' + cleanPhoneNumber.substring(1) : cleanPhoneNumber}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center w-full text-left bg-fnbAccent p-4 rounded-lg hover:bg-fnbLight hover:text-white transition group"
                            >
                                <i className="fab fa-whatsapp text-fnbDark text-xl mr-4 group-hover:text-white"></i>
                                <div>
                                    <span className="font-bold">WhatsApp</span>
                                    <span className="text-sm block text-gray-600 group-hover:text-gray-200">{skill.user.phone}</span>
                                </div>
                            </a>
                             <a 
                                href={`tel:${skill.user.phone}`}
                                className="flex items-center w-full text-left bg-fnbAccent p-4 rounded-lg hover:bg-fnbLight hover:text-white transition group"
                            >
                                <i className="fas fa-phone text-fnbDark text-xl mr-4 group-hover:text-white"></i>
                                <div>
                                    <span className="font-bold">Call</span>
                                     <span className="text-sm block text-gray-600 group-hover:text-gray-200">{skill.user.phone}</span>
                                </div>
                            </a>
                        </>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fadeInScale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale { animation: fadeInScale 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};


const SkillDetail: React.FC<{ skills: Skill[] }> = ({ skills }) => {
  const { skillId } = useParams<{ skillId: string }>();
  const skill = skills.find(s => s.id === Number(skillId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (skill?.images && skill.images.length > 0) {
      setSelectedImage(skill.images[0]);
    } else {
      setSelectedImage(null);
    }
  }, [skill]);

  if (!skill) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-xl shadow-sm container mx-auto my-12">
        <h1 className="text-3xl font-bold mb-4 text-fnbDark">Skill Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the skill you're looking for.</p>
        <Link to="/skills" className="bg-fnbDark text-white py-2 px-6 rounded-lg hover:bg-opacity-90 transition">
          Back to Skills Directory
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto my-12">
          <div className="mb-6">
              <Link to="/skills" className="text-sm font-semibold text-fnbDark hover:text-fnbLight transition-colors">
                  &larr; Back to all skills
              </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="md:col-span-2">
                  <span className="inline-block bg-fnbLight text-white px-3 py-1 rounded-full text-sm mb-2">{skill.category}</span>
                  <h1 className="text-4xl font-bold text-fnbDark mt-2 mb-4">{skill.name}</h1>
                  <p className="text-gray-700 text-lg leading-relaxed">{skill.description}</p>
                  <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                      <p><span className="font-semibold text-fnbDark">Location:</span> {skill.location}</p>
                  </div>
              </div>
              <div className="md:col-span-1">
                  <div className="bg-fnbAccent rounded-xl p-6 border border-gray-200 h-full flex flex-col justify-between">
                      <div>
                          <h2 className="text-xl font-bold text-fnbDark">Offered By</h2>
                          <p className="text-lg text-gray-800 mt-1">{skill.user.name}</p>
                          <p className="text-sm text-gray-600 mt-4">To express your interest and arrange a swap, choose a contact method.</p>
                      </div>
                      <Button onClick={() => setIsModalOpen(true)} className="mt-6 w-full !py-2.5">
                         Contact {skill.user.name.split(' ')[0]}
                      </Button>
                  </div>
              </div>
          </div>

          {/* Portfolio Gallery */}
          {skill.images && skill.images.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-fnbDark mb-4">Portfolio</h2>
              <div className="bg-gray-100 rounded-lg p-4">
                {/* Main Image */}
                <div className="mb-4">
                  <img src={selectedImage || ''} alt="Selected portfolio work" className="w-full h-auto max-h-[500px] object-contain rounded-lg shadow-md bg-white" />
                </div>
                {/* Thumbnails */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {skill.images.map((image, index) => (
                    <button 
                      key={index} 
                      onClick={() => setSelectedImage(image)} 
                      className={`rounded-lg overflow-hidden border-2 transition focus:outline-none focus:ring-2 focus:ring-fnbDark ${selectedImage === image ? 'border-fnbDark' : 'border-transparent hover:border-fnbLight'}`}
                    >
                      <img src={image} alt={`Portfolio item ${index + 1}`} className="w-full h-24 object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
      </div>
      {isModalOpen && <ContactModal skill={skill} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default SkillDetail;