import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingModal from "./BookingModal";
import { useFloatingButtonContext } from "@/context/FloatingButtonContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: { duration: 0.2 },
  },
};

interface FloatingButtonStackProps {
  showBookButton?: boolean;
  showChatButton?: boolean;
}

const FloatingButtonStack: React.FC<FloatingButtonStackProps> = ({
  showBookButton = true,
  showChatButton = true,
}) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { isChatOpen, toggleChat, unreadMessages, isPinned } = useFloatingButtonContext();

  // Don't render chat button when chat is pinned and open (it has its own close button)
  const shouldShowChatButton = showChatButton && (!isPinned || !isChatOpen);

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3 sm:gap-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Chat Toggle Button - Always at bottom */}
        {shouldShowChatButton && (
          <motion.div variants={itemVariants}>
            <button
              onClick={toggleChat}
              className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                isChatOpen
                  ? "bg-destructive hover:bg-destructive/90"
                  : "bg-accent hover:bg-accent/90"
              }`}
              aria-label={isChatOpen ? "Close chat" : "Open chat"}
            >
              {isChatOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <div className="relative">
                  <MessageSquare className="w-6 h-6 text-white" />
                  {unreadMessages > 0 && (
                    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadMessages > 9 ? "9+" : unreadMessages}
                    </span>
                  )}
                </div>
              )}
            </button>
          </motion.div>
        )}

        {/* Book a Call Button - Above chat button, slides when chat opens */}
        <AnimatePresence>
          {showBookButton && !isChatOpen && (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Button
                onClick={() => setIsBookingModalOpen(true)}
                size="lg"
                className="rounded-full shadow-lg hover:shadow-xl transition-shadow gap-2 px-5"
              >
                <Calendar className="h-5 w-5" />
                <span className="hidden sm:inline">Book a Call</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onOpenChange={setIsBookingModalOpen}
        title="Schedule a Call with ƷBI"
      />
    </>
  );
};

export default FloatingButtonStack;
