import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { MinimizedVoiceChat } from './home/MinimizedVoiceChat';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Sparkles, MessageCircle, Clock } from 'lucide-react';

/**
 * CTASection - Primary conversion section
 * Voice AI is prioritized as the unique value proposition
 * Phone contact is secondary for users who prefer direct communication
 */
const CTASection: React.FC = memo(() => {
  return (
    <section className="py-12 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-background" />
      <div className="absolute -top-40 -right-40 w-72 md:w-96 h-72 md:h-96 bg-accent/15 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-20 -left-20 w-48 md:w-64 h-48 md:h-64 bg-primary/10 rounded-full blur-2xl" aria-hidden="true" />
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <span className="text-accent font-medium inline-flex items-center gap-2 mb-3 bg-accent/10 px-3 py-1.5 rounded-full text-xs md:text-sm">
              <Sparkles className="w-3.5 h-3.5" />
              EXPERIENCE THE FUTURE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-foreground">
              Talk to Our AI Assistant
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Experience next-generation voice technology with real-time AI conversation and intelligent business consulting.
            </p>
          </div>
          
          {/* Main Content Grid - Voice AI First (larger), Phone Second */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            
            {/* Voice AI Interface - Primary (takes 3/5 on desktop) */}
            <motion.div 
              className="lg:col-span-3 order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative">
                {/* Glow effect for emphasis */}
                <div className="absolute -inset-1 bg-accent/20 rounded-xl blur-xl" aria-hidden="true" />
                <MinimizedVoiceChat />
              </div>
            </motion.div>

            {/* Direct Call Option - Secondary (takes 2/5 on desktop) */}
            <motion.div 
              className="lg:col-span-2 order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border-border h-full">
                <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-base sm:text-lg">
                        Prefer to Talk?
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Connect with our team directly
                      </p>
                    </div>
                  </div>
                  
                  {/* Phone Number Display */}
                  <div className="bg-muted/30 rounded-lg p-4 mb-4 border border-border/50">
                    <p className="text-foreground font-bold text-xl sm:text-2xl mb-1">
                      (214) 888-4394
                    </p>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Available 24/7</span>
                    </div>
                  </div>
                  
                  {/* Call Button */}
                  <Button
                    onClick={() => window.open('tel:+12148884394', '_self')}
                    variant="outline"
                    className="w-full border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 py-5 sm:py-6 font-medium"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  
                  {/* Benefits - push to bottom */}
                  <div className="mt-auto pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                      <MessageCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span>Immediate human assistance</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
                      <MessageCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      <span>Technical support available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;
