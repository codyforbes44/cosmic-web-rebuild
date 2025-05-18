
import React from 'react';
import { Check } from 'lucide-react';
import { ProductCategory } from '@/components/navbar/constants';

interface ProductFeaturesProps {
  product: ProductCategory;
  productId: string;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ product, productId }) => {
  // Content specific to each product
  if (productId === '3bi-connect') {
    return (
      <>
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Choose 3BI Connect?</h2>
            <p className="text-gray-300 mb-8">
              We understand the unique challenges faced by trucking companies in managing and 
              retaining drivers. Our platform is built specifically to address these challenges.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Driver-Centric</h3>
                <p className="text-gray-400">Built with drivers in mind, focusing on improving their experience and satisfaction.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Data-Driven</h3>
                <p className="text-gray-400">Powerful analytics help you make informed decisions to improve retention and operations.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Time-Saving</h3>
                <p className="text-gray-400">Streamlined workflows and automated processes that save you time and reduce paperwork.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Driver profile management",
                "Performance tracking",
                "Satisfaction surveys",
                "Communication tools",
                "Retention analytics",
                "Onboarding workflows",
                "Document management",
                "Integrated training modules"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 p-1 rounded-full" style={{ color: product.color }}>
                    <Check size={16} />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  } else if (productId === 'carrier-partner-network') {
    return (
      <>
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">A New Way to Connect</h2>
            <p className="text-gray-300 mb-8">
              Carrier Partner Network streamlines the employment transition process for trucking companies 
              and drivers, making it easier to find the right match and handle the paperwork securely.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Seamless Connections</h3>
                <p className="text-gray-400">Connect trucking companies with qualified drivers through a streamlined platform.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Secure Documents</h3>
                <p className="text-gray-400">Simplify employment transitions with secure document handling and verification.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Clear Communication</h3>
                <p className="text-gray-400">Streamlined communication channels between carriers and drivers throughout the hiring process.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Driver matching algorithm",
                "Secure document exchange",
                "Digital signature capabilities",
                "Background check integration",
                "Credential verification",
                "Communication portal",
                "Status tracking",
                "Compliance management"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 p-1 rounded-full" style={{ color: product.color }}>
                    <Check size={16} />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  } else if (productId === 'truck-onboard') {
    return (
      <>
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Onboarding Made Simple</h2>
            <p className="text-gray-300 mb-8">
              TruckOnboard transforms the traditional driver orientation process into a streamlined 
              digital experience that can be completed remotely, saving time and reducing errors.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Remote Onboarding</h3>
                <p className="text-gray-400">Digitize your onboarding process for drivers to complete from anywhere.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Interactive Training</h3>
                <p className="text-gray-400">Engage new drivers with interactive training modules that ensure compliance.</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3" style={{ color: product.color }}>Automated Workflows</h3>
                <p className="text-gray-400">Reduce administrative burden with automated document processing and workflow management.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Digital document collection",
                "Interactive training modules",
                "Progress tracking dashboard",
                "Automated notifications",
                "Electronic signature support",
                "Compliance verification",
                "Training assessment tools",
                "Integration with HR systems"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-3 p-1 rounded-full" style={{ color: product.color }}>
                    <Check size={16} />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }
  
  return null;
};

export default ProductFeatures;
