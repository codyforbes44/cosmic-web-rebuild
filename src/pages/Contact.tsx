
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import SEO from "@/components/SEO";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFAQ from "@/components/contact/ContactFAQ";

const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with ƷBI's team of experts. We'd love to hear about your business challenges and how we can help."
        image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
        type="website"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ContactHeader />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <ContactForm />
              
              {/* Contact Information */}
              <ContactInfo />
            </div>
            
            <div className="max-w-5xl mx-auto mt-16">
              <ContactFAQ />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
