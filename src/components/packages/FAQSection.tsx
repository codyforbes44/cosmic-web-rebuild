
import React from "react";

const FAQSection: React.FC = () => {
  return (
    <div className="mt-24 text-center">
      <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
      <p className="text-gray-300 mb-8">
        Have more questions about our packages? Check out our <a href="/faq" className="underline">FAQ page</a> or <a href="/contact" className="underline">contact us</a>.
      </p>
    </div>
  );
};

export default FAQSection;
