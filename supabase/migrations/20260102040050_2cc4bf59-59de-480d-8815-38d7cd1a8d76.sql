-- Create table for edge function performance metrics
CREATE TABLE public.edge_function_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  function_name TEXT NOT NULL,
  execution_time_ms INTEGER NOT NULL,
  status_code INTEGER NOT NULL,
  error_message TEXT,
  request_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for efficient querying
CREATE INDEX idx_edge_function_metrics_function_name ON public.edge_function_metrics(function_name);
CREATE INDEX idx_edge_function_metrics_timestamp ON public.edge_function_metrics(request_timestamp DESC);
CREATE INDEX idx_edge_function_metrics_status ON public.edge_function_metrics(status_code);

-- Enable RLS
ALTER TABLE public.edge_function_metrics ENABLE ROW LEVEL SECURITY;

-- Allow inserts from edge functions (service role)
CREATE POLICY "Service role can insert metrics"
ON public.edge_function_metrics
FOR INSERT
WITH CHECK (true);

-- Allow admins to read all metrics
CREATE POLICY "Admins can read all metrics"
ON public.edge_function_metrics
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Create a function to clean up old metrics (keep last 30 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_metrics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.edge_function_metrics
  WHERE request_timestamp < now() - INTERVAL '30 days';
END;
$$;