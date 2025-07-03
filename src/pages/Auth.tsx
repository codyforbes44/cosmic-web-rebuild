
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import SignInForm from '@/components/auth/SignInForm';
import SEO from '@/components/SEO';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-space-dark-blue flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Sign In to Your Account"
        description="Access your ƷBI account to unlock advanced features, project management tools, and personalized AI solutions."
        keywords="sign in, login, authentication, user account, secure access"
        image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop&crop=center"
      />
      <AuthLayout>
        <SignInForm 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </AuthLayout>
    </>
  );
};

export default Auth;
