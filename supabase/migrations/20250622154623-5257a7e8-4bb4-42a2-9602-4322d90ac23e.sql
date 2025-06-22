
-- Create subscription packages table with best practice pricing tiers
CREATE TABLE public.subscription_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_monthly INTEGER NOT NULL, -- Price in cents
  price_yearly INTEGER NOT NULL, -- Price in cents (usually ~17% discount)
  features TEXT[] NOT NULL,
  max_chatbots INTEGER, -- NULL means unlimited
  max_monthly_messages INTEGER NOT NULL,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscription_packages ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read active packages (for pricing page)
CREATE POLICY "Anyone can view active subscription packages" 
  ON public.subscription_packages 
  FOR SELECT 
  USING (is_active = true);

-- Create trigger for updated_at
CREATE TRIGGER update_subscription_packages_updated_at 
    BEFORE UPDATE ON public.subscription_packages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert best practice subscription tiers
INSERT INTO public.subscription_packages (name, description, price_monthly, price_yearly, features, max_chatbots, max_monthly_messages, is_popular, sort_order) VALUES
('Starter', 'Perfect for small businesses getting started with AI chatbots', 1900, 1520, ARRAY[
  'Up to 2 AI chatbots',
  '1,000 messages per month',
  'Basic customization',
  'Email support',
  'Website embedding',
  'Standard response time',
  '24/7 chatbot availability'
], 2, 1000, false, 1),

('Professional', 'Ideal for growing businesses with multiple customer touchpoints', 4900, 3920, ARRAY[
  'Up to 10 AI chatbots',
  '10,000 messages per month',
  'Advanced customization',
  'Priority email support',
  'Website & app embedding',
  'Custom branding',
  'Analytics dashboard',
  'Multi-language support',
  'API access',
  'Fast response time'
], 10, 10000, true, 2),

('Enterprise', 'Comprehensive solution for large organizations with complex needs', 14900, 11920, ARRAY[
  'Unlimited AI chatbots',
  '100,000 messages per month',
  'Full customization suite',
  'Dedicated account manager',
  'Priority phone & email support',
  'White-label solution',
  'Advanced analytics & reporting',
  'Custom integrations',
  'SSO authentication',
  'SLA guarantee',
  'Custom AI training',
  'Multi-team collaboration'
], NULL, 100000, false, 3);
