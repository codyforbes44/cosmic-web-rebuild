
import { useState } from 'react';

export const useVoiceInterface = () => {
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voiceMessages, setVoiceMessages] = useState<string[]>([]);
  const [systemMode, setSystemMode] = useState<'professional' | 'godmode'>('professional');
  const [professionalInput, setProfessionalInput] = useState('');
  const [professionalMessages, setProfessionalMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [isProfessionalProcessing, setIsProfessionalProcessing] = useState(false);

  const handleVoiceMessage = (message: string) => {
    setVoiceMessages(prev => [...prev, message]);
  };

  const handleModeChange = (mode: 'professional' | 'godmode') => {
    setSystemMode(mode);
    console.log('System mode changed to:', mode);
  };

  const handleProfessionalChat = async () => {
    if (!professionalInput.trim() || isProfessionalProcessing) return;

    const userMessage = professionalInput.trim();
    setProfessionalInput('');
    setIsProfessionalProcessing(true);

    // Add user message
    setProfessionalMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Simulate professional assistant response
    setTimeout(() => {
      const responses = [
        "Thank you for your inquiry. ƷBI offers comprehensive technology solutions tailored to your business needs. Our team specializes in delivering proven results with measurable ROI. Would you like to schedule a FREE consultation to discuss your specific requirements?",
        "I'd be happy to help you explore our services. Based on your message, I recommend starting with our professional consultation to assess your needs and provide customized recommendations. Our solutions range from web development to AI integration, all designed to drive business growth.",
        "Excellent question! ƷBI's approach focuses on delivering reliable, enterprise-grade solutions. We work with businesses of all sizes, from startups to Fortune 500 companies. Our free initial consultation will help determine the best solution path for your specific situation.",
        "That's a great use case for our technology services. We've helped similar companies achieve significant results - including 300% sales increases and 70% support ticket reductions. I'd recommend scheduling a consultation to discuss how we can replicate similar success for your business."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setProfessionalMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsProfessionalProcessing(false);
    }, 1500);
  };

  return {
    voiceEnabled,
    setVoiceEnabled,
    voiceMessages,
    systemMode,
    professionalInput,
    setProfessionalInput,
    professionalMessages,
    isProfessionalProcessing,
    handleVoiceMessage,
    handleModeChange,
    handleProfessionalChat
  };
};
