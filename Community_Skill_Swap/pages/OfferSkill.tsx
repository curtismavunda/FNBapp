import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import { PROVINCES } from '../constants';
import { Skill } from '../types';
import { useAuth } from '../context/AuthContext';

type SkillFormData = Omit<Skill, 'id' | 'featured' | 'icon' | 'userId' | 'user'>;

interface OfferSkillProps {
  onAddSkill: (skillData: SkillFormData) => void;
  onAddCategory: (newCategory: string) => void;
  categories: string[];
}

const OfferSkill: React.FC<OfferSkillProps> = ({ onAddSkill, onAddCategory, categories }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [formState, setFormState] = useState({
      skill: '',
      description: '',
      province: PROVINCES[0],
      city: '',
      category: categories[0],
      newCategory: '',
      images: Array(6).fill(''),
  });
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (!isNewCategory) {
      setFormState(prevState => ({ ...prevState, category: categories[0] || '' }));
    }
  }, [isNewCategory, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...formState.images];
        newImages[index] = reader.result as string;
        setFormState(prevState => ({...prevState, images: newImages }));
      }
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formState.images];
    newImages[index] = '';
    setFormState(prevState => ({...prevState, images: newImages }));
  };
  
  const handleLocation = () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                const data = await response.json();
                const city = data.address.city || data.address.town || data.address.village || 'Unknown';
                setFormState(prevState => ({ ...prevState, city }));
            } catch (error) {
                alert('Could not fetch city name. Please enter it manually.');
            } finally {
                setIsLocating(false);
            }
        },
        () => {
            alert('Could not get your location. Please enter it manually.');
            setIsLocating(false);
        }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || isSubmitting) return;
    
    const finalCategory = isNewCategory ? formState.newCategory.trim() : formState.category;

    if (!finalCategory) {
        alert('Please select or create a category.');
        return;
    }
    
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
        if (isNewCategory) {
            onAddCategory(finalCategory);
        }
        
        onAddSkill({
            name: formState.skill,
            description: formState.description,
            category: finalCategory,
            location: `${formState.city.trim()}, ${formState.province}`,
            images: formState.images.filter(url => url.trim() !== ''),
        });
        
        setIsSubmitting(false);
        navigate('/skills');
    }, 1000);
  };

  return (
    <section id="offer" className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-fnbDark">Offer a Skill</h2>
            <div className="max-w-2xl mx-auto bg-fnbAccent rounded-xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* User info displayed as read-only */}
                    <div className="space-y-2 p-4 border rounded-lg bg-gray-50">
                        <h3 className="font-bold text-fnbDark">Your Details (from profile)</h3>
                        <p><span className="font-semibold">Name:</span> {currentUser?.name}</p>
                        <p><span className="font-semibold">Email:</span> {currentUser?.email}</p>
                        {currentUser?.phone && <p><span className="font-semibold">Phone:</span> {currentUser?.phone}</p>}
                    </div>

                    <Input id="skill" name="skill" label="Skill You Want to Offer" type="text" value={formState.skill} onChange={handleChange} required />
                    <Textarea id="description" name="description" label="Skill Description" value={formState.description} onChange={handleChange} required />

                    {/* Location Section */}
                    <div>
                      <label htmlFor="province" className="block text-gray-700 mb-2 font-semibold">Province</label>
                      <select id="province" name="province" value={formState.province} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fnbLight text-black">
                          {PROVINCES.map(prov => <option key={prov} value={prov}>{prov}</option>)}
                      </select>
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-gray-700 mb-2 font-semibold">City</label>
                        <div className="relative">
                           <input id="city" name="city" type="text" placeholder="Manually enter your city or use GPS" value={formState.city} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fnbLight text-black placeholder-gray-500" />
                           <button type="button" onClick={handleLocation} disabled={isLocating} className="absolute right-2 top-1/2 -translate-y-1/2 text-fnbDark hover:text-fnbLight disabled:text-gray-400 p-2 rounded-full">
                             {isLocating ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-map-marker-alt"></i>}
                           </button>
                        </div>
                    </div>
                    
                    {/* Category Section */}
                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">Category</label>
                        {!isNewCategory ? (
                            <select id="category" name="category" value={formState.category} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-fnbLight text-black">
                                {categories.map(cat => <option key={cat}>{cat}</option>)}
                            </select>
                        ) : (
                            <Input id="newCategory" name="newCategory" label="Enter new category name" type="text" value={formState.newCategory} onChange={handleChange} required />
                        )}
                        <div className="mt-2">
                           <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={isNewCategory} onChange={() => setIsNewCategory(!isNewCategory)} className="rounded border-gray-300 text-fnbDark shadow-sm focus:border-fnbDark focus:ring focus:ring-offset-0 focus:ring-fnbLight focus:ring-opacity-50" />
                                <span className="ml-2 text-sm text-gray-600">Create a new category</span>
                           </label>
                        </div>
                    </div>

                    {/* Portfolio Images Section */}
                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                        <h3 className="font-bold text-fnbDark">Portfolio Images (Optional)</h3>
                        <p className="text-sm text-gray-600">Upload up to 6 images from your device.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {formState.images.map((imageSrc, index) => (
                                <div key={index} className="relative aspect-square">
                                    <label 
                                        htmlFor={`image-upload-${index}`} 
                                        className="cursor-pointer flex items-center justify-center w-full h-full bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 hover:border-fnbLight transition-colors"
                                    >
                                        {imageSrc ? (
                                            <img src={imageSrc} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                                        ) : (
                                            <div className="text-center text-gray-500">
                                                <i className="fas fa-camera text-2xl"></i>
                                                <span className="mt-1 text-xs block">Upload</span>
                                            </div>
                                        )}
                                    </label>
                                    <input
                                        id={`image-upload-${index}`}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, index)}
                                    />
                                    {imageSrc && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm leading-none hover:bg-black"
                                            aria-label="Remove image"
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <Button type="submit" isLoading={isSubmitting} className="w-full">
                        Submit Skill Offer
                    </Button>
                </form>
            </div>
        </div>
    </section>
  );
};

export default OfferSkill;