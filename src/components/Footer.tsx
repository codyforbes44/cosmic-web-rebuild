
import React from 'react';
import FooterBackground from './footer/FooterBackground';
import FooterContent from './footer/FooterContent';
import FooterBottom from './footer/FooterBottom';

const Footer: React.FC = () => {
  return (
    <FooterBackground>
      <FooterContent />
      <FooterBottom />
    </FooterBackground>
  );
};

export default Footer;
