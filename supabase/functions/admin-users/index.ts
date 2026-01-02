import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Metric logging helper
async function logMetric(
  supabaseAdmin: any,
  functionName: string,
  executionTimeMs: number,
  statusCode: number,
  errorMessage?: string
) {
  try {
    await supabaseAdmin.from('edge_function_metrics').insert({
      function_name: functionName,
      execution_time_ms: executionTimeMs,
      status_code: statusCode,
      error_message: errorMessage || null,
    });
  } catch (e) {
    console.error('Failed to log metric:', e);
  }
}

serve(async (req) => {
  const startTime = Date.now();
  const functionName = 'admin-users';

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    // Get the user from the request
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    if (userError || !user) {
      await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 401, 'Unauthorized');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Check if user is admin
    const { data: isAdmin } = await supabaseAdmin.rpc('is_admin', { user_id: user.id })
    if (!isAdmin) {
      await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 403, 'Admin access required');
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (req.method === 'GET') {
      console.log('Fetching all users for admin dashboard');
      
      // Get all users from auth
      const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers()
      if (authError) throw authError

      // Get user roles
      const { data: userRoles, error: rolesError } = await supabaseAdmin
        .from('user_roles')
        .select('user_id, role')
      if (rolesError) throw rolesError

      // Get profiles
      const { data: profiles, error: profilesError } = await supabaseAdmin
        .from('profiles')
        .select('id, full_name')
      if (profilesError) throw profilesError

      // Combine data
      const usersWithRoles = authUsers.users.map(authUser => {
        const userRole = userRoles?.find(role => role.user_id === authUser.id)
        const profile = profiles?.find(p => p.id === authUser.id)
        
        return {
          id: authUser.id,
          email: authUser.email || '',
          full_name: profile?.full_name || authUser.user_metadata?.full_name || null,
          created_at: authUser.created_at,
          last_sign_in_at: authUser.last_sign_in_at,
          role: userRole?.role || 'user'
        }
      })

      await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 200);

      return new Response(JSON.stringify({ users: usersWithRoles }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (req.method === 'POST') {
      const body = await req.json()
      const { action } = body
      
      console.log(`Admin action: ${action}`);
      
      if (action === 'update-role') {
        const { userId, newRole } = body
        
        // First, remove existing role
        await supabaseAdmin
          .from('user_roles')
          .delete()
          .eq('user_id', userId)

        // Add new role if not 'user' (default)
        if (newRole !== 'user') {
          const { error: roleError } = await supabaseAdmin
            .from('user_roles')
            .insert({ user_id: userId, role: newRole })
          
          if (roleError) throw roleError
        }

        await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 200);

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      if (action === 'ban-user') {
        const { userId } = body
        
        const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
          ban_duration: '876000h' // 100 years
        })
        
        if (error) throw error

        await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 200);

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      if (action === 'unban-user') {
        const { userId } = body
        
        const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
          ban_duration: 'none'
        })
        
        if (error) throw error

        await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 200);

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      if (action === 'reset-password') {
        const { userId, newPassword } = body
        
        console.log('Reset password request received:', { userId, passwordLength: newPassword?.length });
        
        if (!userId || !newPassword) {
          console.error('Missing userId or newPassword');
          await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 400, 'Missing userId or newPassword');
          return new Response(JSON.stringify({ error: 'userId and newPassword are required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }
        
        try {
          const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
            password: newPassword
          })
          
          if (error) {
            console.error('Supabase auth error:', error);
            throw error
          }
          
          console.log('Password reset successful for user:', userId);
          await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 200);
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        } catch (authError) {
          console.error('Auth update failed:', authError);
          throw authError
        }
      }
    }

    await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 400, 'Invalid request');

    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    await logMetric(supabaseAdmin, functionName, Date.now() - startTime, 500, error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
