
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ServicesList = () => {
  const services = [
    {
      category: "Advertising",
      items: [
        "Dynamic Advertising",
        "Social Media Advertising",
        "Recruitment Marketing"
      ]
    },
    {
      category: "Development",
      items: [
        "Web Development",
        "Custom Software",
        "Workflow Automation"
      ]
    },
    {
      category: "Business & AI",
      items: [
        "Business Insights Reporting",
        "AI Integrations"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-opacity-20 backdrop-blur-lg bg-space-deep-blue border border-opacity-20 border-white rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Our Services</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold text-brand-blue">{service.category}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                      <span className="text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-opacity-20 backdrop-blur-lg bg-space-deep-blue border border-opacity-20 border-white rounded-xl overflow-hidden">
        <CardContent className="pt-6">
          <p className="text-gray-200">
            <span className="text-white font-medium">Need a custom service?</span> No problem! 
            Describe your specific requirements in the form and our team will create a 
            tailored solution for you.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesList;
