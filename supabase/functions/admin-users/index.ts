
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
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

    // Get the user from the request
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token)
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // Check if user is admin
    const { data: isAdmin } = await supabaseAdmin.rpc('is_admin', { user_id: user.id })
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (req.method === 'GET') {
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

      return new Response(JSON.stringify({ users: usersWithRoles }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (req.method === 'POST') {
      const body = await req.json()
      const { action } = body
      
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

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }
    }

    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
