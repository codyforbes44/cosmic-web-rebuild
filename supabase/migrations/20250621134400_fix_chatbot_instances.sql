
-- Drop the problematic generated column and recreate the table properly
DROP TABLE IF EXISTS public.chatbot_instances CASCADE;

-- Create chatbot instances table without generated column
CREATE TABLE public.chatbot_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  configuration JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chatbot_instances ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chatbot_instances
CREATE POLICY "Users can view their own chatbot instances" 
  ON public.chatbot_instances 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chatbot instances" 
  ON public.chatbot_instances 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chatbot instances" 
  ON public.chatbot_instances 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chatbot instances" 
  ON public.chatbot_instances 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_chatbot_instances_updated_at 
    BEFORE UPDATE ON public.chatbot_instances 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
