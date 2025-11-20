
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { Button } from '@/components/ui/button';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'The Milky Way Galaxy',
    description: 'Our home galaxy contains billions of stars, planets, and other celestial objects.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    category: 'galaxies'
  },
  {
    id: '2',
    title: 'The Andromeda Galaxy',
    description: 'The nearest major galaxy to the Milky Way, Andromeda is approximately 2.5 million light-years away.',
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    category: 'galaxies'
  },
  {
    id: '3',
    title: 'Saturn and Its Rings',
    description: 'Saturn\'s rings are made mostly of chunks of ice and small amounts of carbonaceous dust.',
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'planets'
  },
  {
    id: '4',
    title: 'Mars Surface',
    description: 'The red planet\'s distinctive color comes from iron oxide, or rust, on its surface.',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    category: 'planets'
  },
  {
    id: '5',
    title: 'Nebula Formation',
    description: 'Nebulae are vast clouds of gas and dust in interstellar space where new stars form.',
    image: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'nebulae'
  },
  {
    id: '6',
    title: 'Horsehead Nebula',
    description: 'This distinctive nebula resembles a horse\'s head and is part of the Orion Molecular Cloud.',
    image: 'https://images.unsplash.com/photo-1443440596982-a4ffa3a4bb37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'nebulae'
  },
  {
    id: '7',
    title: 'Solar Eclipse',
    description: 'A solar eclipse occurs when the Moon passes between Earth and the Sun, blocking the Sun\'s light.',
    image: 'https://images.unsplash.com/photo-1532198528077-0d9e4ca9bb40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'events'
  },
  {
    id: '8',
    title: 'Aurora Borealis',
    description: 'These natural light displays in Earth\'s sky are caused by solar particles interacting with the atmosphere.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'events'
  },
  {
    id: '9',
    title: 'International Space Station',
    description: 'The ISS is a habitable artificial satellite orbiting Earth as a space laboratory and observatory.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80',
    category: 'space-tech'
  },
  {
    id: '10',
    title: 'Lunar Surface',
    description: 'The Moon\'s surface is covered in regolith, a layer of loose, heterogeneous material covering solid rock.',
    image: 'https://images.unsplash.com/photo-1532187643603-5a7913efd62d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'planets'
  },
  {
    id: '11',
    title: 'Hubble Space Telescope',
    description: 'Named after astronomer Edwin Hubble, this space telescope has made over 1.4 million observations since its launch.',
    image: 'https://images.unsplash.com/photo-1445869330315-9d5572fbb7f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'space-tech'
  },
  {
    id: '12',
    title: 'Meteor Shower',
    description: 'Meteor showers occur when Earth passes through debris left by comets or asteroids.',
    image: 'https://images.unsplash.com/photo-1606985752023-89aa8c80c601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'events'
  },
];

import SEO from "@/components/SEO";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = [
    { value: 'planets', label: 'Planets' },
    { value: 'galaxies', label: 'Galaxies' },
    { value: 'nebulae', label: 'Nebulae' },
    { value: 'events', label: 'Celestial Events' },
    { value: 'space-tech', label: 'Space Technology' },
  ];

  const filteredItems = activeCategory 
    ? galleryItems.filter(item => item.category === activeCategory)
    : galleryItems;

  return (
    <>
      <SEO 
        title="Cosmic Gallery - Space & Universe Images"
        description="Explore stunning images of our universe, from neighboring planets to distant galaxies. Browse our collection of celestial photography including nebulae, galaxies, and space technology."
        keywords="space gallery, universe images, cosmic photography, planets, galaxies, nebulae, astronomy, space exploration"
        image="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=630&fit=crop"
        type="website"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mt-12 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Cosmic Gallery
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Explore stunning images of our universe, from neighboring planets to distant galaxies
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === null
                  ? 'bg-accent text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.value
                    ? 'bg-accent text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="space-card overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Selected Item */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-space-deep-blue border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="relative">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title} 
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
                <button
                  className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2"
                  onClick={() => setSelectedItem(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-white">{selectedItem.title}</h2>
                <p className="text-gray-300 mb-4">{selectedItem.description}</p>
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                    {categories.find(c => c.value === selectedItem.category)?.label || selectedItem.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
