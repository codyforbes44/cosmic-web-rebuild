
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import ScheduleButton from '@/components/calendly/ScheduleButton';

const ScheduleCTA = () => {
  return (
    <motion.div
      className="max-w-5xl mx-auto bg-gradient-to-r from-space-purple/20 to-accent/20 rounded-xl p-8 mt-16 mb-8 border border-accent/20 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="bg-accent/20 p-3 rounded-full">
            <Calendar className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Prefer to talk in person?</h3>
            <p className="text-gray-300">
              Schedule a free consultation with one of our experts at a time that works for you.
            </p>
          </div>
        </div>
        <ScheduleButton className="bg-accent hover:bg-accent/80 text-white px-6 py-3 whitespace-nowrap">
          Schedule a Meeting <ArrowRight className="ml-2 h-4 w-4" />
        </ScheduleButton>
      </div>
    </motion.div>
  );
};

export default ScheduleCTA;
