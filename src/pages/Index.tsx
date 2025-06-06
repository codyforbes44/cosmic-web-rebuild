
import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import HomeLayout from "@/components/home/HomeLayout";
import WelcomeMessage from "@/components/home/WelcomeMessage";
import MainContent from "@/components/home/MainContent";

const Index = () => {
  const { user } = useAuth();

  return (
    <HomeLayout>
      <MainContent />
      
      {/* Welcome message for authenticated users */}
      {user && <WelcomeMessage user={user} />}
    </HomeLayout>
  );
};

export default Index;
