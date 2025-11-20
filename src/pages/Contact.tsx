
import React from 'react';
import StandardPageLayout from "@/layouts/StandardPageLayout";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

const Contact = () => {
  return (
    <StandardPageLayout
      seo={{
        title: "Contact Us - Get in Touch with ƷBI",
        description: "Get in touch with ƷBI's team of experts. We'd love to hear about your business challenges and how we can help.",
        image: "/og-images/contact.png",
        type: "website"
      }}
      breadcrumb={{ label: "Contact Us" }}
      className="pt-20 pb-24"
    >
      <section className="py-20">
        <ContactHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <ContactForm />
          
          {/* Contact Information */}
          <ContactInfo />
        </div>
      </section>
    </StandardPageLayout>
  );
};

export default Contact;
