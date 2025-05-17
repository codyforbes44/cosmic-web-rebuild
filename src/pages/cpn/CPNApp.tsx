
import React from "react";
import { Helmet } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import CPNNavbar from "./CPNNavbar";
import CPNFooter from "./CPNFooter";
import CPNHome from "./CPNHome";
import CPNAbout from "./CPNAbout";
import CPNPackages from "./CPNPackages";
import CPNContact from "./CPNContact";
import CPNNotFound from "./CPNNotFound";
import StarBackground from "@/components/StarBackground";

const CPNApp: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Carrier Partner Network | ƷBI Technology Solutions</title>
        <meta name="description" content="A comprehensive platform connecting trucking companies and drivers, streamlining the employment transition process." />
      </Helmet>

      <StarBackground />
      <CPNNavbar />
      
      <main className="min-h-screen pt-24 pb-24 relative z-10">
        <Routes>
          <Route path="/" element={<CPNHome />} />
          <Route path="/about" element={<CPNAbout />} />
          <Route path="/packages" element={<CPNPackages />} />
          <Route path="/contact" element={<CPNContact />} />
          <Route path="*" element={<CPNNotFound />} />
        </Routes>
      </main>
      
      <CPNFooter />
    </>
  );
};

export default CPNApp;
