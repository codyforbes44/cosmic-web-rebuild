
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { toast } from "sonner";

interface DemoRequestModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
}

const DemoRequestModal: React.FC<DemoRequestModalProps> = ({ 
  isOpen, 
  onOpenChange,
  productTitle
}) => {
  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Demo request submitted! Our team will contact you shortly.");
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Request a Demo of {productTitle}</DialogTitle>
          <DialogDescription>
            Fill out this form to schedule a personalized demo with our product experts.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleDemoRequest} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Smith" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="john@company.com" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input id="company" placeholder="Your Company" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" type="tel" placeholder="(123) 456-7890" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">What are you most interested in learning about?</Label>
            <Textarea id="message" placeholder="Tell us about your needs..." />
          </div>
          
          <div className="text-xs text-gray-500">
            By submitting this form, you agree to our <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="bg-accent hover:bg-accent/80 text-white">
              Request Demo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestModal;
