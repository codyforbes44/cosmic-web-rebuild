
import React from "react";
import { Link } from "react-router-dom";
import BreadcrumbNav from "@/components/BreadcrumbNav";

import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="Privacy policy for ƷBI - learn how we collect, use, and protect your personal information."
      />
      <Navbar />
      <StarBackground />
      
      <div className="bg-transparent min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb navigation */}
          <BreadcrumbNav currentPageLabel="Privacy Policy" />
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
            <div className="h-1 w-20 bg-accent mb-8"></div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-8 mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">Last updated: May 17, 2025</p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p className="text-gray-300 mb-4">
                ƷBI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
              <p className="text-gray-300 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-300">
                <li>Register on our website</li>
                <li>Subscribe to our newsletter</li>
                <li>Request a consultation or quote</li>
                <li>Participate in surveys or promotions</li>
                <li>Contact our support team</li>
              </ul>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-300">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Responding to your inquiries and providing customer support</li>
                <li>Sending administrative information, updates, and marketing communications</li>
                <li>Protecting our rights and preventing fraud</li>
              </ul>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="text-gray-300 mb-4">
                We use cookies and similar tracking technologies to collect information about your browsing activities on our website. These technologies help us analyze website traffic, customize content, and improve your experience.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">5. Third-Party Disclosure</h2>
              <p className="text-gray-300 mb-4">
                We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you. These parties agree to keep this information confidential and secure.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">6. Data Security</h2>
              <p className="text-gray-300 mb-4">
                We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">7. Your Rights</h2>
              <p className="text-gray-300 mb-4">
                Depending on your location, you may have rights regarding your personal information, such as the right to access, correct, or delete your data. Please contact us if you wish to exercise these rights.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
              <p className="text-gray-300 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-gray-300 mb-4">
                Email: <a href="mailto:privacy@zbi.io" className="text-accent hover:underline">privacy@zbi.io</a><br />
                Address: 123 Tech Plaza, Suite 400, San Francisco, CA 94103
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
