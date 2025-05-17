
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <>
      <SEO 
        title="About ƷBI"
        description="Learn about ƷBI - pioneering innovative technology solutions to empower businesses in the digital era."
      />
      <StarBackground />
      <Navbar />
      <main className="relative min-h-screen pt-20 pb-24 z-10">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-16">
              <CardContent className="p-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  About <span className="text-accent">Ʒ</span>BI
                </h1>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Pioneering innovative technology solutions to empower businesses in the digital era
                </p>
              </CardContent>
            </Card>
            
            <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl mb-16">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
                    <p className="text-gray-300 mb-6">
                      At ƷBI, our mission is to accelerate business growth through innovative technology solutions and strategic consulting. We believe that the right technology, implemented correctly, can transform businesses and drive exceptional results.
                    </p>
                    <p className="text-gray-300 mb-6">
                      Through our comprehensive range of services, we help organizations of all sizes navigate the complex digital landscape, optimize their operations, and achieve their strategic objectives.
                    </p>
                    <p className="text-gray-300">
                      Our team of technology experts and business consultants brings decades of combined experience across various industries, allowing us to deliver tailored solutions that address the unique challenges and opportunities facing each of our clients.
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1019&q=80" 
                      alt="ƷBI team collaboration"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl h-full">
                <CardContent className="p-8 text-center">
                  <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="m22 2-7 20-4-9-9-4Z"></path>
                      <path d="M22 2 11 13"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Innovation</h3>
                  <p className="text-gray-300">
                    We stay at the forefront of technology trends and continuously explore new ways to solve complex business problems.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl h-full">
                <CardContent className="p-8 text-center">
                  <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
                      <path d="M2 20h20"></path>
                      <path d="M14 12v.01"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Expertise</h3>
                  <p className="text-gray-300">
                    Our team brings deep domain knowledge and technical expertise to deliver solutions that drive measurable business value.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl h-full">
                <CardContent className="p-8 text-center">
                  <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Client Focus</h3>
                  <p className="text-gray-300">
                    We build lasting partnerships with our clients, understanding their needs and delivering solutions that exceed expectations.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="space-card bg-space-deep-blue/40 backdrop-blur-md border border-gray-800/40 rounded-xl">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Business?</h2>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                  Partner with ƷBI to leverage the power of technology and strategic innovation to achieve your business goals and stay ahead in today's competitive landscape.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button className="bg-accent hover:bg-accent/80 text-white px-8 py-3">
                      Contact Us
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="outline" className="border-gray-600 hover:bg-gray-800 text-white px-8 py-3">
                      Our Services
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
