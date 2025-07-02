import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Target, TrendingUp, CheckCircle, Building, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DemoRequestModal from '../products/DemoRequestModal';
const RecruitmentMarketingSection = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const features = [{
    icon: Users,
    title: "Qualified Candidates",
    description: "Target experienced professionals with relevant skills and clean backgrounds",
    color: "#FF6B35"
  }, {
    icon: Target,
    title: "Multi-Channel Campaigns",
    description: "Reach candidates across job boards, social media, and industry-specific platforms",
    color: "#10B981"
  }, {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Reduce cost-per-hire by up to 40% while improving candidate quality and retention",
    color: "#3B82F6"
  }];
  const benefits = ["250% increase in qualified candidate applications", "38% reduction in cost-per-hire", "25% improvement in employee retention rates", "Data-driven targeting for optimal ROI", "Industry-specific recruitment expertise"];
  return;
};
export default RecruitmentMarketingSection;