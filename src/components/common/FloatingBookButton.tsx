import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingModal from "./BookingModal";

const FloatingBookButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed bottom-24 right-6 z-40"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.3, ease: "easeOut" }}
      >
        <Button
          onClick={() => setIsModalOpen(true)}
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow gap-2 px-5"
        >
          <Calendar className="h-5 w-5" />
          <span className="hidden sm:inline">Book a Call</span>
        </Button>
      </motion.div>

      <BookingModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Schedule a Call with ƷBI"
      />
    </>
  );
};

export default FloatingBookButton;
