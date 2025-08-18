
import React from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import StandardPageLayout from "@/layouts/StandardPageLayout";
import ScrollToTopLink from "@/components/ScrollToTopLink";

const About = () => {
  return (
    <StandardPageLayout
      seo={{
        title: "About ƷBI - Leading Technology Solutions Provider",
        description: "Learn about ƷBI's mission to accelerate business growth through innovative technology solutions and strategic consulting.",
        keywords: "about ZBI, technology solutions, business consulting, innovation, expertise",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop&crop=center"
      }}
      breadcrumb={{ label: "About" }}
      header={{
        title: "About ƷBI",
        description: "Pioneering innovative technology solutions to empower businesses in the digital era",
        icon: Users
      }}
    >
      <div className="space-card p-4 sm:p-6 md:p-8 rounded-xl mb-8 sm:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Our Mission</h2>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              At ƷBI, our mission is to accelerate business growth through innovative technology solutions and strategic consulting. We believe that the right technology, implemented correctly, can transform businesses and drive exceptional results.
            </p>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Through our comprehensive range of services, we help organizations of all sizes navigate the complex digital landscape, optimize their operations, and achieve their strategic objectives.
            </p>
            <p className="text-gray-300 text-sm sm:text-base">
              Our team of technology experts and business consultants brings decades of combined experience across various industries, allowing us to deliver tailored solutions that address the unique challenges and opportunities facing each of our clients.
            </p>
          </div>
          <div className="space-card p-6 sm:p-8 rounded-xl order-first lg:order-last bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10 border border-accent/20">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center border border-border/50">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-card p-4 sm:p-6 md:p-8 rounded-xl mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-space-deep-blue/50 p-4 sm:p-6 md:p-8 rounded-xl text-center">
            <div className="bg-accent/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent sm:w-6 sm:h-6">
                <path d="m22 2-7 20-4-9-9-4Z"></path>
                <path d="M22 2 11 13"></path>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Innovation</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              We stay at the forefront of technology trends and continuously explore new ways to solve complex business problems.
            </p>
          </div>
          
          <div className="bg-space-deep-blue/50 p-4 sm:p-6 md:p-8 rounded-xl text-center">
            <div className="bg-accent/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent sm:w-6 sm:h-6">
                <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"></path>
                <path d="M2 20h20"></path>
                <path d="M14 12v.01"></path>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Expertise</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Our team brings deep domain knowledge and technical expertise to deliver solutions that drive measurable business value.
            </p>
          </div>
          
          <div className="bg-space-deep-blue/50 p-4 sm:p-6 md:p-8 rounded-xl text-center sm:col-span-2 md:col-span-1">
            <div className="bg-accent/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent sm:w-6 sm:h-6">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">Client Focus</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              We build lasting partnerships with our clients, understanding their needs and delivering solutions that exceed expectations.
            </p>
          </div>
        </div>
      </div>

      <div className="space-card p-4 sm:p-6 md:p-8 rounded-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">Ready to Transform Your Business?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
          Partner with ƷBI to leverage the power of technology and strategic innovation to achieve your business goals and stay ahead in today's competitive landscape.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <ScrollToTopLink to="/contact">
            <Button className="bg-accent hover:bg-accent/80 text-white px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto">
              Contact Us
            </Button>
          </ScrollToTopLink>
          <ScrollToTopLink to="/services">
            <Button variant="outline" className="border-gray-600 hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto">
              Our Services
            </Button>
          </ScrollToTopLink>
        </div>
      </div>
    </StandardPageLayout>
  );
};

export default About;
