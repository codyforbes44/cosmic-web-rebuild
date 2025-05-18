
import React from 'react';

const ContactFAQ = () => {
  return (
    <div className="space-card p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-white font-bold mb-2">What services do you offer?</h3>
          <p className="text-gray-300">
            We offer a comprehensive range of business technology solutions including digital transformation, AI integration, data analytics, and custom software development.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">How do your consulting packages work?</h3>
          <p className="text-gray-300">
            We offer flexible consulting packages tailored to your business needs, from one-time assessments to ongoing strategic partnerships. Contact us for a customized solution.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">Do you serve small businesses?</h3>
          <p className="text-gray-300">
            Yes, we work with businesses of all sizes. We have specialized solutions designed specifically for small and medium enterprises looking to leverage technology.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-2">How can we get started?</h3>
          <p className="text-gray-300">
            Simply fill out our contact form or give us a call. We'll schedule an initial consultation to understand your needs and propose the right solution for your business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactFAQ;
