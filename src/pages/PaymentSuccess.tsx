
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-space-deep-blue to-space-dark-blue flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="bg-space-deep-blue/80 backdrop-blur-sm border-gray-700 text-center">
          <CardHeader className="pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-green-500/20 p-6 rounded-full">
                <CheckCircle className="h-16 w-16 text-green-400" />
              </div>
            </motion.div>
            
            <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
              Payment Successful!
            </CardTitle>
            <p className="text-gray-300 text-lg">
              Thank you for choosing our web development services. Your project is now in our queue!
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-black/20 rounded-lg p-6 text-left">
              <h3 className="text-xl font-semibold text-white mb-4">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Confirmation Email</p>
                    <p className="text-gray-400 text-sm">You'll receive a detailed confirmation email within 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Project Kickoff</p>
                    <p className="text-gray-400 text-sm">Our team will contact you within 24 hours to schedule your project kickoff meeting</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Development Begins</p>
                    <p className="text-gray-400 text-sm">We'll start working on your project immediately after the kickoff meeting</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 w-full sm:w-auto">
                  Return Home
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 px-6 py-3 w-full sm:w-auto">
                  Contact Support
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-300 text-sm">
                <strong>Order ID:</strong> We've sent your order details to your email. Please keep this for your records.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
