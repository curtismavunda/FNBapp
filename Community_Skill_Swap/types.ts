
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  password?: string; // Should not be stored in frontend state long-term
}

export interface Skill {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  featured: boolean;
  icon: string;
  userId: number;
  user: {
    name: string;
    email: string;
    phone?: string;
  },
  images?: string[];
}
