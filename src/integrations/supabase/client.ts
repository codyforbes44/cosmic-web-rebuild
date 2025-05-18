
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://strixttogzthapdhuczm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0cml4dHRvZ3p0aGFwZGh1Y3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1OTkyNjIsImV4cCI6MjA2MzE3NTI2Mn0.bhSZ6QY907hrVEK9fPCKHVDYI-6BKgLmi36mMOVxTxs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
