
import { supabase } from '@/integrations/supabase/client';

export const checkAdminAndRedirect = async (userId: string, navigate: (path: string) => void) => {
  try {
    const { data, error } = await supabase.rpc('is_admin', { user_id: userId });
    if (!error && data) {
      navigate('/admin');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
};
