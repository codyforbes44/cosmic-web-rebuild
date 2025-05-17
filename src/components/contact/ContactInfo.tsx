import React from 'react';
const ContactInfo = () => {
  return <div>
      <div className="space-card p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="bg-accent/20 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold">Email</h3>
              <a href="mailto:info@zbi-consulting.com" className="text-gray-300 hover:text-accent transition-colors">support@3bi.io</a>
              <br />
              
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-accent/20 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold">Phone</h3>
              <a href="tel:+15551234567" className="text-gray-300 hover:text-accent transition-colors">+1 (817) 757-2828</a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-accent/20 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold">Location</h3>
              <p className="text-gray-300">123 Business Way</p>
              
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-card p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-white">Connect With Us</h2>
        <p className="text-gray-300 mb-6">
          Follow us on social media for the latest industry insights, company news, and technology updates.
        </p>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/3bi.io" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://x.com/3bi_io" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/3biio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </div>;
};
export default ContactInfo;