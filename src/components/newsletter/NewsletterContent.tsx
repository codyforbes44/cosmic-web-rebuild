
import { motion } from 'framer-motion';
import { Download, CheckCircle } from 'lucide-react';

const NewsletterContent = () => {
  return (
    <div>
      <motion.div
        className="bg-accent/10 p-3 rounded-full inline-flex mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Download className="h-6 w-6 text-accent" />
      </motion.div>
      
      <motion.h2 
        className="text-2xl md:text-3xl font-bold mb-4 text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Get Our Free Guide: <span className="text-accent">Technology ROI Blueprint</span>
      </motion.h2>
      
      <motion.p 
        className="text-gray-300 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Learn how to calculate the real ROI of technology investments and convince stakeholders with our step-by-step guide. Plus receive industry insights and exclusive offers.
      </motion.p>
      
      <motion.ul
        className="space-y-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {[
          "ROI calculation templates",
          "Case studies with real numbers",
          "Stakeholder presentation guide",
          "Implementation checklist"
        ].map((item, i) => (
          <li key={i} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{item}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default NewsletterContent;
