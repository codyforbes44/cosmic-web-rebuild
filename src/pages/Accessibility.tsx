
import React from "react";
import { Link } from "react-router-dom";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { FileText, Shield, Accessibility as AccessibilityIcon } from "lucide-react";

import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";

const Accessibility = () => {
  return (
    <>
      <SEO 
        title="Accessibility Statement" 
        description="Our commitment to digital accessibility and providing an inclusive experience for all users."
      />
      <Navbar />
      <StarBackground />
      
      <div className="bg-transparent min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb navigation */}
          <BreadcrumbNav currentPageLabel="Accessibility Statement" />
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Accessibility Statement</h1>
            <div className="h-1 w-20 bg-accent mb-8"></div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-8 mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">Last updated: May 17, 2025</p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">Our Commitment</h2>
              <p className="text-gray-300 mb-4">
                ƷBI is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">Conformance Status</h2>
              <p className="text-gray-300 mb-4">
                The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p className="text-gray-300 mb-4">
                Our website is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">Accessibility Features</h2>
              <p className="text-gray-300 mb-4">
                Our website includes the following accessibility features:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-300">
                <li>Semantic HTML to ensure proper document structure</li>
                <li>ARIA landmarks to identify regions of a page</li>
                <li>Alt text for all informative images</li>
                <li>Keyboard navigation for all interactive elements</li>
                <li>Sufficient color contrast for text content</li>
                <li>Resizable text without loss of content or functionality</li>
                <li>Focus indicators for keyboard users</li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-gray-800/50 p-6 rounded-lg flex flex-col items-center text-center">
                  <AccessibilityIcon size={40} className="text-accent mb-4" />
                  <h3 className="text-white font-medium mb-2">Inclusive Design</h3>
                  <p className="text-gray-300 text-sm">We design our services to be usable by as many people as possible</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg flex flex-col items-center text-center">
                  <FileText size={40} className="text-accent mb-4" />
                  <h3 className="text-white font-medium mb-2">Clear Content</h3>
                  <p className="text-gray-300 text-sm">We strive for clear and simple content that is easy to understand</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg flex flex-col items-center text-center">
                  <Shield size={40} className="text-accent mb-4" />
                  <h3 className="text-white font-medium mb-2">Standards Compliance</h3>
                  <p className="text-gray-300 text-sm">We work to meet WCAG 2.1 Level AA standards across our digital properties</p>
                </div>
              </div>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">Limitations and Alternatives</h2>
              <p className="text-gray-300 mb-4">
                Despite our best efforts, there may be some parts of our website that are not fully accessible. We are working to address these issues and improve the accessibility of our site.
              </p>
              <p className="text-gray-300 mb-4">
                If you experience any difficulties accessing our website, please contact us. We'll be happy to assist you and provide information in an alternative format.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">Feedback</h2>
              <p className="text-gray-300 mb-4">
                We welcome your feedback on the accessibility of our website. Please let us know if you encounter any barriers or if you have suggestions for improvement:
              </p>
              <p className="text-gray-300 mb-4">
                Email: <a href="mailto:accessibility@zbi.io" className="text-accent hover:underline">accessibility@zbi.io</a><br />
                Phone: (123) 456-7890<br />
                Address: 123 Tech Plaza, Suite 400, San Francisco, CA 94103
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">Continuous Improvement</h2>
              <p className="text-gray-300 mb-4">
                We are committed to ongoing accessibility improvements. Our accessibility policy and implementation are regularly reviewed and updated.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Accessibility;
