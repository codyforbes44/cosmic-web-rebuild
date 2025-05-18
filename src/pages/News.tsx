
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'New Exoplanet Discovered in Habitable Zone',
    excerpt: 'Astronomers have found a potentially habitable exoplanet orbiting a nearby star, raising hopes for finding extraterrestrial life.',
    content: 'Scientists at the European Southern Observatory have announced the discovery of a new exoplanet orbiting within the habitable zone of its star. The planet, named Kepler-438b, is approximately 1.5 times the size of Earth and orbits a red dwarf star located 470 light-years away in the constellation Lyra.\n\nThe planet receives about 40% more light from its star than Earth does from the Sun, giving it an equilibrium temperature estimated to be around 60°C (140°F) if it has an Earth-like atmosphere. This places it firmly within the habitable zone, the region around a star where conditions might be suitable for liquid water to exist on a planet\'s surface.\n\n"This is one of the most promising candidates for a habitable planet we\'ve found so far," said Dr. Emma Rodriguez, lead astronomer on the project. "The next step is to analyze its atmosphere, if it has one, to look for biosignatures that might indicate the presence of life."\n\nThe discovery was made using data from the Transiting Exoplanet Survey Satellite (TESS) combined with follow-up observations from ground-based telescopes. Further studies are planned using the James Webb Space Telescope, which has the capability to analyze the atmospheric composition of distant planets.',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    date: '2025-05-15',
    author: 'Dr. Sarah Johnson',
    category: 'exoplanets'
  },
  {
    id: '2',
    title: 'Black Hole at Center of Milky Way Becomes More Active',
    excerpt: 'Sagittarius A*, the supermassive black hole at the center of our galaxy, has shown increased activity in recent months.',
    content: 'Astronomers monitoring Sagittarius A*, the supermassive black hole at the center of our Milky Way galaxy, have reported a significant increase in activity over the past three months. The black hole, which is typically relatively quiet, has been emitting stronger radio signals and X-ray flares than usual.\n\n"We\'ve been observing Sagittarius A* for decades, and it\'s typically quite dormant as supermassive black holes go," explained Dr. Michael Chen of the Harvard-Smithsonian Center for Astrophysics. "This recent uptick in activity gives us a rare opportunity to study how matter behaves as it falls toward the event horizon."\n\nScientists believe the increased activity may be due to a large cloud of gas and dust that was observed approaching the black hole several years ago. As this material gets closer to the black hole, it heats up and emits radiation across multiple wavelengths.\n\nDespite the increased activity, Dr. Chen assures that there is no cause for concern. "Sagittarius A* is about 26,000 light-years from Earth, so this activity poses absolutely no danger to our planet. It\'s simply an exciting scientific event that allows us to better understand these cosmic phenomena."',
    image: 'https://images.unsplash.com/photo-1552276385-7a5ea7e4b16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: '2025-05-12',
    author: 'Dr. Michael Chen',
    category: 'black-holes'
  },
  {
    id: '3',
    title: 'Perseverance Rover Finds Evidence of Ancient Microbial Life on Mars',
    excerpt: 'NASA\'s Perseverance rover has discovered compelling evidence suggesting that microbial life once existed on Mars.',
    content: 'In a groundbreaking announcement, NASA scientists revealed that the Perseverance rover has found evidence strongly suggesting the presence of ancient microbial life on Mars. The discovery was made in sedimentary rocks within the Jezero Crater, which scientists believe was once filled with water.\n\n"What we\'ve found are complex organic molecules arranged in patterns that, on Earth, would be strong biosignatures - evidence of past life," said Dr. Jennifer Lopez, NASA\'s lead astrobiologist for the Mars mission. "These molecules show a level of complexity that\'s very difficult to explain through non-biological processes."\n\nThe rover used its SHERLOC (Scanning Habitable Environments with Raman & Luminescence for Organics & Chemicals) instrument to detect specific carbon compounds that, on Earth, are typically associated with biological activity. The samples have been sealed for a future mission to return them to Earth for more detailed analysis.\n\n"While we\'re not making a definitive claim that we\'ve found evidence of aliens, this is the strongest indication yet that Mars once harbored life, likely in the form of simple microorganisms," Dr. Lopez added. "If confirmed by further analysis, this would be one of the most significant scientific discoveries in human history."',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    date: '2025-05-08',
    author: 'Dr. Jennifer Lopez',
    category: 'mars'
  },
  {
    id: '4',
    title: 'James Webb Space Telescope Captures Most Distant Galaxy Yet',
    excerpt: 'The James Webb Space Telescope has observed a galaxy from just 300 million years after the Big Bang, the earliest ever seen.',
    content: 'The James Webb Space Telescope (JWST) has shattered another cosmic record by capturing images of a galaxy that existed approximately 300 million years after the Big Bang, making it the most distant and earliest galaxy ever observed.\n\nThe galaxy, designated JWST-HD1, appears to us as it was about 13.5 billion years ago, when the universe was only 2% of its current age. This discovery pushes back our understanding of when the first galaxies began to form after the Big Bang.\n\n"What\'s particularly surprising is how bright and evolved this galaxy appears to be, despite forming so early in the universe\'s history," said Dr. Alex Patel, an astrophysicist at the Space Telescope Science Institute. "It challenges our current models of galaxy formation and suggests that the earliest galaxies may have formed more rapidly than we previously thought."\n\nJWST-HD1 was identified through a deep field observation, where the telescope focused on a seemingly empty patch of sky for an extended period to collect as much light as possible. Spectroscopic analysis revealed the galaxy\'s extreme distance through its redshift, a measure of how much its light has been stretched by the expansion of the universe.\n\nScientists are now planning follow-up observations to better understand the galaxy\'s composition and how it managed to form so quickly after the Big Bang.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    date: '2025-05-05',
    author: 'Dr. Alex Patel',
    category: 'deep-space'
  },
  {
    id: '5',
    title: 'Astronomers Detect Mysterious Radio Signals from Beyond Our Galaxy',
    excerpt: 'A series of unexplained radio signals originating from outside the Milky Way has scientists puzzled.',
    content: 'Astronomers using the Square Kilometre Array (SKA) radio telescope have detected a series of unusual radio signals originating from a source approximately 3 billion light-years from Earth. The signals, which repeat in a complex but non-random pattern, have scientists puzzled as they do not match any known natural astronomical phenomenon.\n\n"These signals exhibit characteristics that are difficult to explain through known astrophysical processes," said Dr. Ibrahim Nasser, a radio astronomer involved in the discovery. "They show a level of complexity that suggests they could be artificial in origin, though we\'re not jumping to any conclusions."\n\nThe signals repeat approximately every 67 hours and contain what appears to be a mathematical sequence within their structure. This has led some researchers to speculate about the possibility of an artificial origin, potentially from an advanced extraterrestrial civilization.\n\nHowever, Dr. Nasser urges caution: "Throughout the history of radio astronomy, we\'ve encountered signals that initially seemed artificial but were later explained by natural phenomena we didn\'t previously understand. We need to conduct more observations and analyze the data thoroughly before making any extraordinary claims."\n\nThe research team has submitted their findings to the International Astronomical Union and plans to allocate more telescope time to monitor the source of these mysterious signals.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80',
    date: '2025-05-01',
    author: 'Dr. Ibrahim Nasser',
    category: 'seti'
  },
  {
    id: '6',
    title: 'NASA Announces Artemis IV Mission to Build Lunar Gateway',
    excerpt: 'The next phase of the Artemis program will focus on constructing the Lunar Gateway, a space station orbiting the Moon.',
    content: 'NASA has officially announced plans for the Artemis IV mission, scheduled for 2027, which will mark a significant milestone in the agency\'s lunar exploration program. The mission will focus on the construction of the Lunar Gateway, a space station designed to orbit the Moon and serve as a staging point for future lunar and deep space missions.\n\n"Artemis IV will deliver the I-HAB module, which is the habitation module built by our international partners," explained NASA Administrator Jane Wilson. "This will be attached to the Power and Propulsion Element and the HALO module, which will be launched earlier. Together, these components will form the initial configuration of the Lunar Gateway."\n\nThe Lunar Gateway is designed to be a multi-purpose outpost orbiting the Moon, providing essential capabilities for human exploration of the lunar surface while also serving as a staging platform for deep space exploration. Unlike the International Space Station, the Gateway will not be continuously crewed but will host astronauts for periods of one to three months.\n\n"The Gateway represents a new era of sustainable lunar exploration and development," Wilson continued. "It will enable extended lunar surface missions and help us prepare for future missions to Mars by testing new technologies and systems in the deep space environment."',
    image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: '2025-04-25',
    author: 'Jane Wilson',
    category: 'space-exploration'
  }
];

const News = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const categories = [
    { value: 'exoplanets', label: 'Exoplanets' },
    { value: 'black-holes', label: 'Black Holes' },
    { value: 'mars', label: 'Mars Exploration' },
    { value: 'deep-space', label: 'Deep Space' },
    { value: 'seti', label: 'SETI' },
    { value: 'space-exploration', label: 'Space Exploration' },
  ];

  const filteredArticles = newsArticles.filter(article => {
    // Filter by category if one is selected
    const categoryMatch = activeCategory ? article.category === activeCategory : true;
    
    // Filter by search query if one is entered
    const searchMatch = searchQuery 
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return categoryMatch && searchMatch;
  });

  return (
    <>
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mt-12 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Astronomy News
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Stay informed with the latest discoveries, missions, and breakthroughs in astronomy and space exploration
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 pl-10 pr-4 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                />
              </div>
              <Button
                onClick={() => setSearchQuery("")}
                variant="outline"
                className="border-gray-700 hover:bg-gray-700 text-white"
                disabled={!searchQuery}
              >
                Clear
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              <button
                className={`px-3 py-1 rounded-full transition-colors text-sm ${
                  activeCategory === null
                    ? 'bg-accent text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(null)}
              >
                All Topics
              </button>
              {categories.map((category) => (
                <button
                  key={category.value}
                  className={`px-3 py-1 rounded-full transition-colors text-sm ${
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
          </div>

          {/* News Articles */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="space-card overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {categories.find(c => c.value === article.category)?.label || article.category}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{article.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{article.excerpt}</p>
                    <p className="text-accent text-sm">Read full article</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl text-white mb-2">No articles found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Modal for Selected Article */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-space-deep-blue border border-gray-700 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
              <div className="relative">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  className="w-full h-auto max-h-[40vh] object-cover"
                />
                <button
                  className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2"
                  onClick={() => setSelectedArticle(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {categories.find(c => c.value === selectedArticle.category)?.label || selectedArticle.category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(selectedArticle.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">{selectedArticle.title}</h2>
                <p className="text-gray-400 mb-6">By {selectedArticle.author}</p>
                <div className="prose prose-invert max-w-none">
                  {selectedArticle.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-gray-300">{paragraph}</p>
                  ))}
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

export default News;
