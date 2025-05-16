
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Planet {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
}

const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'The smallest and innermost planet in the Solar System, orbiting the Sun once every 88 days.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    color: '#A9A9A9'
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'The second planet from the Sun, known for its thick, toxic atmosphere and volcanic features.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80',
    color: '#E49B0F'
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'Our home planet, characterized by its blue oceans, green lands, and an atmosphere rich in oxygen.',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    color: '#1E90FF'
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'Known as the Red Planet, Mars is home to the largest volcano and the deepest canyon in the Solar System.',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    color: '#BC2732'
  },
];

const FeaturedPlanets = () => {
  const [activePlanet, setActivePlanet] = useState<Planet>(planets[0]);

  return (
    <section className="py-24 bg-space-dark-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">Explore Our Solar System</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover the unique characteristics and mysteries of the planets in our cosmic neighborhood
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Planet Image */}
          <motion.div 
            key={activePlanet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-card p-6 overflow-hidden rounded-xl"
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src={activePlanet.image} 
                alt={activePlanet.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Planet Info */}
          <div>
            <motion.div
              key={activePlanet.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: activePlanet.color }}>
                {activePlanet.name}
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                {activePlanet.description}
              </p>
              <Link 
                to={`/planets/${activePlanet.id}`} 
                className="inline-flex items-center text-accent hover:text-accent/80 transition-colors"
              >
                Discover more about {activePlanet.name} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Planet Selection */}
            <div className="flex flex-wrap gap-4">
              {planets.map((planet) => (
                <button
                  key={planet.id}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activePlanet.id === planet.id
                      ? 'bg-accent text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setActivePlanet(planet)}
                >
                  {planet.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link to="/planets" className="btn-primary inline-flex items-center">
            View All Planets <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlanets;
