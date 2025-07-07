
import React from 'react';
import { motion } from 'framer-motion';
import { MinimizedVoiceChat } from './home/MinimizedVoiceChat';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-space-dark-blue z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-space-dark-blue via-space-deep-blue/80 to-space-dark-blue z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl z-0"></div>
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="text-accent font-medium inline-block mb-3 bg-accent/10 px-3 py-1 rounded-full text-xs md:text-sm">
              EXPERIENCE THE FUTURE
            </span>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
              Try Our Advanced Voice AI Assistant
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8">
              Experience next-generation voice technology with real-time AI conversation and intelligent business consulting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Direct Dial Option */}
            <Card className="bg-space-deep-blue/90 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent" />
                  Direct Connect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm">
                  For immediate assistance or technical support, connect directly with our team:
                </p>
                <div className="flex items-center justify-between bg-space-dark-blue/50 p-4 rounded-lg border border-gray-700">
                  <div>
                    <p className="text-white font-semibold text-lg">(214) 888-4394</p>
                    <p className="text-gray-400 text-sm">Direct dial • Available 24/7</p>
                  </div>
                  <Button
                    onClick={() => window.open('tel:+12148884394', '_self')}
                    className="bg-accent hover:bg-accent/80 text-black"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Voice Interface */}
            <div>
              <MinimizedVoiceChat />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
