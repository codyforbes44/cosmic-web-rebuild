
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                About AstroVision
              </h1>
              <p className="text-gray-300 text-lg">
                Exploring the wonders of our universe through stunning visuals and educational content about astronomy
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
                <p className="text-gray-300 mb-6">
                  At AstroVision, we're passionate about making the wonders of astronomy accessible to everyone. Our mission is to inspire curiosity about the cosmos and foster a deeper understanding of our place in the universe.
                </p>
                <p className="text-gray-300 mb-6">
                  Through captivating imagery, accessible explanations, and up-to-date discoveries, we aim to bridge the gap between complex astronomical concepts and public understanding, creating a community of space enthusiasts and lifelong learners.
                </p>
                <p className="text-gray-300">
                  We believe that by sharing the beauty and mystery of the universe, we can inspire the next generation of astronomers, astrophysicists, and space explorers who will push the boundaries of human knowledge even further.
                </p>
              </div>
              <div className="space-card p-6 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1501862700950-18382cd41497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1019&q=80" 
                  alt="Telescopes at night"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
              <div className="space-card p-8 rounded-xl text-center">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Education</h3>
                <p className="text-gray-300">
                  We provide accessible, accurate information about astronomy and space science to foster learning and discovery for all ages.
                </p>
              </div>
              
              <div className="space-card p-8 rounded-xl text-center">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Research</h3>
                <p className="text-gray-300">
                  We stay updated with the latest astronomical research and discoveries, translating complex findings into engaging content.
                </p>
              </div>
              
              <div className="space-card p-8 rounded-xl text-center">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                    <path d="M9 18h6"></path>
                    <path d="M10 22h4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Inspiration</h3>
                <p className="text-gray-300">
                  Through stunning imagery and compelling storytelling, we aim to inspire wonder and curiosity about the cosmos.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl font-bold mb-6 text-center text-white">Our Team</h2>
              <p className="text-gray-300 text-center mb-12">
                AstroVision is brought to you by a dedicated team of astronomers, educators, writers, and space enthusiasts who share a passion for the cosmos and a commitment to sharing its wonders with the world.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-accent">
                    <img 
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=922&q=80" 
                      alt="Dr. Elena Rodriguez"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">Dr. Elena Rodriguez</h3>
                  <p className="text-accent mb-2">Founder & Astrophysicist</p>
                  <p className="text-gray-400 text-center">
                    PhD in Astrophysics with over 15 years of research experience, specializing in exoplanetology.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-accent">
                    <img 
                      src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=934&q=80" 
                      alt="Marcus Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">Marcus Johnson</h3>
                  <p className="text-accent mb-2">Science Communicator</p>
                  <p className="text-gray-400 text-center">
                    Former NASA educator with a talent for explaining complex astronomical concepts in accessible ways.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-space-deep-blue rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Join Our Cosmic Journey</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Whether you're a seasoned astronomer or just beginning to explore the wonders of the cosmos, we invite you to join our community and embark on this incredible journey of discovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button className="bg-accent hover:bg-accent/80 text-white px-8 py-3">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/newsletter">
                  <Button variant="outline" className="border-gray-600 hover:bg-gray-800 text-white px-8 py-3">
                    Subscribe to Updates
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
