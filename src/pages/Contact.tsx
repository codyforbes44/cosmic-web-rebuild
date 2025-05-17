
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import SEO from "@/components/SEO";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with ƷBI's team of experts. We'd love to hear about your business challenges and how we can help."
        image="/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
        type="website"
      />
      <StarBackground />
      <Navbar />
      <main className="relative min-h-screen pt-20 pb-24 z-10">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <ContactHeader />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Form */}
              <ContactForm />
              
              {/* Contact Information */}
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
