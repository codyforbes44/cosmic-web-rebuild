
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <SEO 
        title="Terms of Service" 
        description="Terms of service for ƷBI - understand our policies and agreements when using our services."
      />
      <Navbar />
      
      <div className="bg-space-deep-blue min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="flex items-center text-gray-400 text-sm mb-4">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} className="mx-2" />
              <span className="text-white">Terms of Service</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Terms of Service</h1>
            <div className="h-1 w-20 bg-accent mb-8"></div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-8 mb-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300">Last updated: May 17, 2025</p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 mb-4">
                By accessing or using the services provided by ƷBI ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use our services.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">2. Description of Services</h2>
              <p className="text-gray-300 mb-4">
                ƷBI provides technology consulting, software development, and related services as described on our website. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">3. Client Responsibilities</h2>
              <p className="text-gray-300 mb-4">
                When using our services, you agree to:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-300">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of any account credentials</li>
                <li>Promptly notify us of any unauthorized use of your account</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not interfere with or disrupt our services or servers</li>
              </ul>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">4. Intellectual Property Rights</h2>
              <p className="text-gray-300 mb-4">
                Unless otherwise stated in a separate agreement, we retain all intellectual property rights to our services, software, and content. You may not copy, modify, distribute, sell, or lease any part of our services or included software without our explicit permission.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">5. Payment and Billing</h2>
              <p className="text-gray-300 mb-4">
                For paid services, you agree to pay all fees as specified in the relevant statement of work or service agreement. Payments are non-refundable unless otherwise specified in writing.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-300 mb-4">
                To the fullest extent permitted by law, ƷBI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">7. Indemnification</h2>
              <p className="text-gray-300 mb-4">
                You agree to defend, indemnify, and hold harmless ƷBI and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of our services.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">8. Term and Termination</h2>
              <p className="text-gray-300 mb-4">
                These Terms remain in effect until terminated by either you or us. We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">9. Governing Law</h2>
              <p className="text-gray-300 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-300 mb-4">
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on our website and updating the "Last updated" date.
              </p>
              
              <h2 className="text-white text-xl font-semibold mt-8 mb-4">11. Contact Us</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-300 mb-4">
                Email: <a href="mailto:legal@zbi.io" className="text-accent hover:underline">legal@zbi.io</a><br />
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

export default TermsOfService;
