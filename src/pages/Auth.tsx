
import React, { useState, useEffect } from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { useAuth } from '@/components/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
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
    <AuthLayout>
      <TabsContent value="signin">
        <SignInForm 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
      </TabsContent>
      
      <TabsContent value="signup">
        <SignUpForm 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          fullName={fullName}
          setFullName={setFullName}
        />
      </TabsContent>
    </AuthLayout>
  );
};

export default Auth;
