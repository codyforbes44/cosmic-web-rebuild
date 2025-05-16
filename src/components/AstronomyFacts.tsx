
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Fact {
  category: string;
  title: string;
  content: string;
  image: string;
}

const facts: Record<string, Fact[]> = {
  planets: [
    {
      category: 'planets',
      title: 'One day on Venus is longer than one year',
      content: 'Venus has a slow rotation on its axis, taking 243 Earth days to complete one rotation. However, it takes only 225 Earth days to completely orbit the Sun, making a day on Venus longer than its year.',
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      category: 'planets',
      title: 'Jupiter has the shortest day of all the planets',
      content: 'Despite being the largest planet in our solar system, Jupiter\'s day is only about 9 hours and 55 minutes long, the shortest day of all the planets.',
      image: 'https://images.unsplash.com/photo-1630839437035-dac17da580d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
  ],
  stars: [
    {
      category: 'stars',
      title: 'There are more stars in the universe than grains of sand on Earth',
      content: 'Astronomers estimate there are about 10,000,000,000,000,000,000,000 stars in the observable universe. That\'s 10 sextillion, which is more than all the grains of sand on all of Earth\'s beaches.',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      category: 'stars',
      title: 'The biggest star is VY Canis Majoris',
      content: 'VY Canis Majoris is a red hypergiant star in the constellation Canis Major. It is one of the largest known stars and one of the most luminous of its type, with a radius about 1,420 times that of the Sun.',
      image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  ],
  galaxies: [
    {
      category: 'galaxies',
      title: 'There are over 100 billion galaxies in the observable universe',
      content: 'Using data from NASA\'s Hubble Space Telescope, astronomers have estimated that there are at least 100 billion galaxies in the observable universe, though the total number could be even higher.',
      image: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      category: 'galaxies',
      title: 'The Milky Way and Andromeda galaxies will collide',
      content: 'In about 4.5 billion years, our Milky Way galaxy will collide with the Andromeda galaxy. The two galaxies are currently moving toward each other at a rate of about 110 kilometers per second.',
      image: 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  ],
};

const AstronomyFacts = () => {
  const [activeCategory, setActiveCategory] = useState<string>('planets');

  return (
    <section className="py-24 bg-gradient-to-b from-space-dark-blue to-space-deep-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">Fascinating Astronomy Facts</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover incredible facts about our universe that will expand your cosmic knowledge
          </p>
        </div>

        <Tabs defaultValue="planets" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger value="planets" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                Planets
              </TabsTrigger>
              <TabsTrigger value="stars" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                Stars
              </TabsTrigger>
              <TabsTrigger value="galaxies" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                Galaxies
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(facts).map(([category, categoryFacts]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categoryFacts.map((fact, index) => (
                  <div
                    key={index}
                    className="space-card p-6 overflow-hidden hover:scale-[1.02] transition-all duration-300 h-full"
                  >
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={fact.image}
                        alt={fact.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{fact.title}</h3>
                    <p className="text-gray-300">{fact.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default AstronomyFacts;
