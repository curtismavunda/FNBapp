import React from 'react';
import { Skill, User } from './types';

export const USERS: User[] = [
    { id: 1, name: "Sarah", email: "sarah.music@example.com", phone: "0711234567", password: "password123" },
    { id: 2, name: "Thabo", email: "thabo.dev@example.com", phone: "0821234567", password: "password123" },
    { id: 3, name: "Nomsa", email: "nomsa.bakes@example.com", password: "password123" },
    { id: 4, name: "Pieter", email: "pieter.lang@example.com", phone: "0831234567", password: "password123" },
    { id: 5, name: "James", email: "james.photo@example.com", password: "password123" },
    { id: 6, name: "Lebo", email: "lebo.app@example.com", phone: "0721234567", password: "password123" },
    { id: 7, name: "Sipho", email: "sipho.cooks@example.com", password: "password123" },
    { id: 8, name: "Anna", email: "anna.piano@example.com", phone: "0841234567", password: "password123" },
    { id: 9, name: "Maria", email: "maria.spanish@example.com", password: "password123" },
    { id: 10, name: "Zoe", email: "zoe.yoga@example.com", phone: "0731234567", password: "password123" }
];

export const INITIAL_CATEGORIES: string[] = ["Tech", "Cooking", "Arts", "Music", "Languages", "Fitness", "Salon"];

export const PROVINCES: string[] = [
    "Gauteng", "Limpopo", "Mpumalanga", "North West", "Kwa-Zulu Natal", "Free State", "Eastern Cape", "Northern Cape", "Western Cape"
];

export const SKILLS: Skill[] = [
  {
    id: 1, name: "Guitar Lessons", description: "Learn to play your favorite songs", category: "Music",
    location: "Cape Town, Western Cape", featured: true, icon: "fas fa-guitar",
    userId: 1, user: { name: "Sarah", email: "sarah.music@example.com", phone: "0711234567" }
  },
  {
    id: 2, name: "Web Development", description: "Build your own website from scratch", category: "Tech",
    location: "Johannesburg, Gauteng", featured: true, icon: "fas fa-laptop-code",
    userId: 2, user: { name: "Thabo", email: "thabo.dev@example.com", phone: "0821234567" }
  },
  {
    id: 3, name: "Baking Masterclass", description: "Learn to bake sourdough and pastries", category: "Cooking",
    location: "Durban, Kwa-Zulu Natal", featured: true, icon: "fas fa-bread-slice",
    userId: 3, user: { name: "Nomsa", email: "nomsa.bakes@example.com" },
    images: [
        "https://placehold.co/800x600/d4a373/ffffff?text=Sourdough",
        "https://placehold.co/800x600/e9c46a/ffffff?text=Croissants",
        "https://placehold.co/800x600/f4a261/ffffff?text=Pastries",
        "https://placehold.co/800x600/e76f51/ffffff?text=Cakes",
    ]
  },
  {
    id: 4, name: "Afrikaans Lessons", description: "Master conversational Afrikaans", category: "Languages",
    location: "Pretoria, Gauteng", featured: true, icon: "fas fa-language",
    userId: 4, user: { name: "Pieter", email: "pieter.lang@example.com", phone: "0831234567" }
  },
  {
    id: 5, name: "Photography Workshop", description: "Learn composition, lighting, and editing", category: "Arts",
    location: "Cape Town, Western Cape", featured: false, icon: "fas fa-camera-retro",
    userId: 5, user: { name: "James", email: "james.photo@example.com" },
    images: [
        "https://placehold.co/800x600/a7a7a7/ffffff?text=Sample+1",
        "https://placehold.co/800x600/bfbfbf/ffffff?text=Sample+2",
        "https://placehold.co/800x600/d9d9d9/ffffff?text=Sample+3",
    ]
  },
  {
    id: 6, name: "Mobile App Development", description: "Build Android and iOS apps with React Native", category: "Tech",
    location: "Johannesburg, Gauteng", featured: false, icon: "fas fa-mobile-alt",
    userId: 6, user: { name: "Lebo", email: "lebo.app@example.com", phone: "0721234567" }
  },
  {
    id: 7, name: "Traditional Zulu Cooking", description: "Learn to prepare authentic Zulu dishes", category: "Cooking",
    location: "Durban, Kwa-Zulu Natal", featured: false, icon: "fas fa-drumstick-bite",
    userId: 7, user: { name: "Sipho", email: "sipho.cooks@example.com" }
  },
  {
    id: 8, name: "Piano for Beginners", description: "Start your musical journey with fundamentals", category: "Music",
    location: "Pretoria, Gauteng", featured: false, icon: "fas fa-music",
    userId: 8, user: { name: "Anna", email: "anna.piano@example.com", phone: "0841234567" }
  },
  {
    id: 9, name: "Spanish Conversation", description: "Practice conversational Spanish", category: "Languages",
    location: "Cape Town, Western Cape", featured: false, icon: "fas fa-comments",
    userId: 9, user: { name: "Maria", email: "maria.spanish@example.com" }
  },
  {
    id: 10, name: "Yoga for Stress Relief", description: "Reduce stress and increase flexibility", category: "Fitness",
    location: "East London, Eastern Cape", featured: false, icon: "fas fa-spa",
    userId: 10, user: { name: "Zoe", email: "zoe.yoga@example.com", phone: "0731234567" }
  },
];
