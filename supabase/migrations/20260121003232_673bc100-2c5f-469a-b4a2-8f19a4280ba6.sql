-- Create analytics digest configuration and history tables

-- Table to store digest configuration
CREATE TABLE public.analytics_digest_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_emails TEXT[] NOT NULL DEFAULT '{}',
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  frequency TEXT NOT NULL DEFAULT 'weekly' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  day_of_week INTEGER DEFAULT 1 CHECK (day_of_week >= 0 AND day_of_week <= 6),
  preferred_time TIME DEFAULT '09:00:00',
  last_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table to store digest history
CREATE TABLE public.analytics_digest_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  recipient_emails TEXT[] NOT NULL,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  metrics JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending')),
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analytics_digest_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_digest_history ENABLE ROW LEVEL SECURITY;

-- RLS policies - only admins can access
CREATE POLICY "Admins can view digest config"
ON public.analytics_digest_config
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update digest config"
ON public.analytics_digest_config
FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert digest config"
ON public.analytics_digest_config
FOR INSERT
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view digest history"
ON public.analytics_digest_history
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Service role can insert digest history"
ON public.analytics_digest_history
FOR INSERT
WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_analytics_digest_config_updated_at
BEFORE UPDATE ON public.analytics_digest_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default config row
INSERT INTO public.analytics_digest_config (recipient_emails, is_enabled, frequency, day_of_week)
VALUES ('{}', false, 'weekly', 1);