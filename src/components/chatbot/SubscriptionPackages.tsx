
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Check, Star, Zap, Crown } from 'lucide-react';

interface SubscriptionPackage {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
  max_chatbots: number | null;
  max_monthly_messages: number;
  is_active: boolean;
}

export const SubscriptionPackages: React.FC = () => {
  const { data: packages, isLoading } = useQuery({
    queryKey: ['subscription-packages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscription_packages')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true });
      
      if (error) throw error;
      return data as SubscriptionPackage[];
    },
  });

  const getPackageIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'starter':
        return <Zap className="h-6 w-6 text-yellow-500" />;
      case 'professional':
        return <Star className="h-6 w-6 text-blue-500" />;
      case 'enterprise':
        return <Crown className="h-6 w-6 text-purple-500" />;
      default:
        return <Zap className="h-6 w-6 text-gray-500" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Chatbot Subscription Plans</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose the perfect plan for your chatbot needs. All plans include our advanced AI technology and easy embedding.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages?.map((pkg, index) => (
          <Card 
            key={pkg.id} 
            className={`bg-space-deep-blue border-gray-700 relative ${
              index === 1 ? 'border-accent border-2 scale-105' : ''
            }`}
          >
            {index === 1 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {getPackageIcon(pkg.name)}
              </div>
              <CardTitle className="text-white text-2xl">{pkg.name}</CardTitle>
              <CardDescription className="text-gray-400">
                {pkg.description}
              </CardDescription>
              <div className="mt-6">
                <div className="text-3xl font-bold text-white">
                  {formatPrice(pkg.price_monthly)}
                  <span className="text-lg font-normal text-gray-400">/month</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  or {formatPrice(pkg.price_yearly)}/year (save 2 months)
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  index === 1 
                    ? 'bg-accent hover:bg-accent/80' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-400 text-sm">
          All plans include a 14-day free trial. No setup fees. Cancel anytime.
        </p>
      </div>
    </div>
  );
};
