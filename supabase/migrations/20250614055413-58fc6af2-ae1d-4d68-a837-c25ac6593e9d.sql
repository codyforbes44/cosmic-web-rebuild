-- Create table for ZEPHEL chat sessions
CREATE TABLE public.zephel_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_name TEXT NOT NULL DEFAULT 'New Session',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for ZEPHEL messages
CREATE TABLE public.zephel_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.zephel_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create table for ZEPHEL system metrics
CREATE TABLE public.zephel_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.zephel_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zephel_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zephel_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for zephel_sessions
CREATE POLICY "Users can view their own ZEPHEL sessions" 
ON public.zephel_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ZEPHEL sessions" 
ON public.zephel_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ZEPHEL sessions" 
ON public.zephel_sessions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ZEPHEL sessions" 
ON public.zephel_sessions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for zephel_messages
CREATE POLICY "Users can view messages from their own ZEPHEL sessions" 
ON public.zephel_messages 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.zephel_sessions 
  WHERE id = session_id AND user_id = auth.uid()
));

CREATE POLICY "Users can create messages in their own ZEPHEL sessions" 
ON public.zephel_messages 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.zephel_sessions 
  WHERE id = session_id AND user_id = auth.uid()
));

CREATE POLICY "Users can update messages in their own ZEPHEL sessions" 
ON public.zephel_messages 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.zephel_sessions 
  WHERE id = session_id AND user_id = auth.uid()
));

CREATE POLICY "Users can delete messages in their own ZEPHEL sessions" 
ON public.zephel_messages 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM public.zephel_sessions 
  WHERE id = session_id AND user_id = auth.uid()
));

-- Create policies for zephel_metrics
CREATE POLICY "Users can view their own ZEPHEL metrics" 
ON public.zephel_metrics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ZEPHEL metrics" 
ON public.zephel_metrics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_zephel_sessions_updated_at
  BEFORE UPDATE ON public.zephel_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_zephel_sessions_user_id ON public.zephel_sessions(user_id);
CREATE INDEX idx_zephel_messages_session_id ON public.zephel_messages(session_id);
CREATE INDEX idx_zephel_metrics_user_id ON public.zephel_metrics(user_id);
CREATE INDEX idx_zephel_metrics_recorded_at ON public.zephel_metrics(recorded_at);