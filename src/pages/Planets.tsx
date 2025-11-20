
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { useState } from "react";

const planets = [
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'The smallest and innermost planet in the Solar System, orbiting the Sun once every 88 days.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    color: '#A9A9A9',
    distance: '57.9 million km',
    diameter: '4,879 km',
    day_length: '58.6 Earth days',
    year_length: '88 Earth days',
    gravity: '3.7 m/s²',
    temperature: '-173°C to 427°C',
    fun_fact: 'Mercury has wrinkles! As the iron core of the planet cooled and contracted, the surface of the planet became wrinkled. Scientists have named these wrinkles, "lobate scarps."'
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'The second planet from the Sun, known for its thick, toxic atmosphere and volcanic features.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    color: '#E49B0F',
    distance: '108.2 million km',
    diameter: '12,104 km',
    day_length: '243 Earth days',
    year_length: '225 Earth days',
    gravity: '8.87 m/s²',
    temperature: '462°C',
    fun_fact: 'Venus rotates in the opposite direction to most planets, meaning the Sun rises in the west and sets in the east.'
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'Our home planet, characterized by its blue oceans, green lands, and an atmosphere rich in oxygen.',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    color: '#1E90FF',
    distance: '149.6 million km',
    diameter: '12,742 km',
    day_length: '24 hours',
    year_length: '365.25 days',
    gravity: '9.8 m/s²',
    temperature: '-88°C to 58°C',
    fun_fact: 'Earth is the only planet not named after a god. The name Earth comes from the Old English word "eorþe" and the Anglo-Saxon word "ertha", which means ground or soil.'
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'Known as the Red Planet, Mars is home to the largest volcano and the deepest canyon in the Solar System.',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    color: '#BC2732',
    distance: '227.9 million km',
    diameter: '6,779 km',
    day_length: '24.6 hours',
    year_length: '687 Earth days',
    gravity: '3.72 m/s²',
    temperature: '-153°C to 20°C',
    fun_fact: 'Mars has the largest dust storms in our solar system. They can last for months and cover the entire planet.'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description: 'The largest planet in our Solar System, known for its massive size and distinctive bands of clouds.',
    image: 'https://images.unsplash.com/photo-1630839437035-dac17da580d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    color: '#E59F43',
    distance: '778.5 million km',
    diameter: '139,820 km',
    day_length: '9.93 hours',
    year_length: '11.86 Earth years',
    gravity: '24.79 m/s²',
    temperature: '-145°C',
    fun_fact: 'Jupiter has the shortest day of all the planets. It rotates once about every 10 hours.'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    description: 'Famous for its stunning ring system, Saturn is a gas giant with a complex and beautiful appearance.',
    image: 'https://images.unsplash.com/photo-1637984135921-301a7d39e3b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    color: '#C5AB6E',
    distance: '1.4 billion km',
    diameter: '116,460 km',
    day_length: '10.7 hours',
    year_length: '29.46 Earth years',
    gravity: '10.44 m/s²',
    temperature: '-178°C',
    fun_fact: 'Saturn is the only planet in our solar system that is less dense than water. If placed in a giant bathtub, Saturn would float.'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    description: 'Unique for rotating on its side, Uranus appears to roll around the Sun rather than spin like other planets.',
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    color: '#89CFF0',
    distance: '2.9 billion km',
    diameter: '50,724 km',
    day_length: '17.2 hours',
    year_length: '84 Earth years',
    gravity: '8.87 m/s²',
    temperature: '-195°C',
    fun_fact: 'Uranus is tilted so far that it essentially orbits the Sun on its side, with its axis pointing almost directly at the Sun.'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    description: 'The windiest planet in our Solar System, with winds reaching up to 2,100 km per hour.',
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    color: '#3D61AF',
    distance: '4.5 billion km',
    diameter: '49,244 km',
    day_length: '16.1 hours',
    year_length: '165 Earth years',
    gravity: '11.15 m/s²',
    temperature: '-214°C',
    fun_fact: 'Neptune has the strongest winds in the Solar System, reaching up to 2,100 kilometers per hour.'
  }
];

import SEO from "@/components/SEO";

const Planets = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(planets[0]);

  return (
    <>
      <SEO 
        title="Interactive Solar System Explorer - Explore the Planets"
        description="Discover the wonders of our solar system. Explore detailed information about all eight planets including Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune."
        keywords="solar system, planets, space exploration, astronomy, Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, planetary science"
        image="/og-images/planets.png"
        type="website"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mt-12 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Solar System
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Explore the planets that orbit our Sun, each with its unique characteristics and mysteries
            </p>
          </div>

          {/* Planet Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {planets.map((planet) => (
              <button
                key={planet.id}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPlanet.id === planet.id
                    ? 'bg-accent text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setSelectedPlanet(planet)}
              >
                {planet.name}
              </button>
            ))}
          </div>

          {/* Selected Planet Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-card p-6 overflow-hidden rounded-xl">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src={selectedPlanet.image} 
                  alt={selectedPlanet.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-card p-8 rounded-xl">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4" 
                style={{ color: selectedPlanet.color }}
              >
                {selectedPlanet.name}
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {selectedPlanet.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800/60 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400 mb-1">Distance from Sun</h3>
                  <p className="text-white font-medium">{selectedPlanet.distance}</p>
                </div>
                <div className="bg-gray-800/60 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400 mb-1">Diameter</h3>
                  <p className="text-white font-medium">{selectedPlanet.diameter}</p>
                </div>
                <div className="bg-gray-800/60 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400 mb-1">Length of day</h3>
                  <p className="text-white font-medium">{selectedPlanet.day_length}</p>
                </div>
                <div className="bg-gray-800/60 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400 mb-1">Length of year</h3>
                  <p className="text-white font-medium">{selectedPlanet.year_length}</p>
                </div>
                <div className="bg-gray-800/60 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400 mb-1">Gravity</h3>
                  <p className="text-white font-medium">{selectedPlanet.gravity}</p>
                </div>
                <div className="bg-gray-800/60 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400 mb-1">Surface temperature</h3>
                  <p className="text-white font-medium">{selectedPlanet.temperature}</p>
                </div>
              </div>

              <div className="bg-accent/20 p-5 rounded-lg">
                <h3 className="text-lg font-medium text-accent mb-2">Fun Fact</h3>
                <p className="text-gray-300">
                  {selectedPlanet.fun_fact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Planets;
