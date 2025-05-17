
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const CPNAbout: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About | Carrier Partner Network</title>
        <meta name="description" content="Learn about the Carrier Partner Network platform, our mission, and how we're transforming driver transitions in the trucking industry." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800/40 mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            About Carrier Partner Network
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Connecting carriers and drivers with innovative technology solutions for seamless transitions and improved retention.
          </p>
        </motion.div>

        {/* Our Story Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Carrier Partner Network was born from a simple observation: the trucking industry needed a better way to handle driver transitions between carriers. The traditional process was slow, paper-heavy, and often resulted in delays that cost both carriers and drivers valuable time and money.
              </p>
              <p className="text-gray-300 mb-4">
                Founded in 2020 by industry veterans with over 30 years of combined experience in transportation logistics, our platform was designed to streamline the entire transition process—from document transfer to credential verification.
              </p>
              <p className="text-gray-300">
                Today, we're proud to serve hundreds of carriers nationwide, helping them reduce onboarding time by an average of 80% while improving driver satisfaction and retention rates.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-3xl"></div>
              <img 
                src="/lovable-uploads/b526c888-e2db-4d66-b8eb-fc8218763c99.png" 
                alt="CPN Team" 
                className="relative z-10 rounded-xl shadow-xl border border-purple-900/50"
              />
            </motion.div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Our Mission</h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              To transform the driver transition process through innovative technology, creating a seamless experience that benefits carriers, drivers, and the entire transportation ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Efficiency",
                description: "Reducing administrative overhead and paperwork through digital transformation and automation.",
                icon: "⚡"
              },
              {
                title: "Transparency",
                description: "Providing visibility into every step of the transition process for all stakeholders involved.",
                icon: "👁️"
              },
              {
                title: "Security",
                description: "Maintaining the highest standards of data security and privacy protection for sensitive information.",
                icon: "🔒"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-purple-900/50 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-purple-400">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative md:order-2"
            >
              <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-3xl"></div>
              <img 
                src="/lovable-uploads/b526c888-e2db-4d66-b8eb-fc8218763c99.png" 
                alt="CPN Technology" 
                className="relative z-10 rounded-xl shadow-xl border border-purple-900/50"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="md:order-1"
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-400">Our Technology</h2>
              <p className="text-gray-300 mb-4">
                At the core of Carrier Partner Network is our proprietary platform built with security, compliance, and user experience in mind. Our development team consists of industry experts who understand the unique challenges faced by trucking companies and their drivers.
              </p>
              <p className="text-gray-300 mb-4">
                We leverage advanced technologies including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
                <li>Blockchain-based document verification for maximum security</li>
                <li>AI-powered matching algorithms to connect carriers with qualified drivers</li>
                <li>Cloud infrastructure ensuring 99.9% uptime and accessibility from anywhere</li>
                <li>Mobile-first design for on-the-go access by field personnel</li>
              </ul>
              <p className="text-gray-300">
                Our platform undergoes continuous improvement based on user feedback and industry trends, ensuring we're always at the forefront of transportation technology.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CPNAbout;
