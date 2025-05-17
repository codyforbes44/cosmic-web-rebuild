
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ServicesList = () => {
  const services = [
    {
      category: "Digital Marketing",
      items: [
        "Dynamic Advertising",
        "Social Media Advertising",
        "Recruitment Marketing"
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      category: "Technology Solutions",
      items: [
        "Web Development",
        "Custom Software",
        "Workflow Automation"
      ],
      image: "https://images.unsplash.com/photo-1573495612937-f02b76716e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      category: "Innovation",
      items: [
        "AI Integrations",
        "Web3 Services",
        "Business Intelligence Reporting"
      ],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="space-y-6">
      {services.map((service, index) => (
        <Card key={index} className="bg-opacity-20 backdrop-blur-lg bg-space-deep-blue border border-opacity-20 border-white rounded-xl overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-white flex items-center justify-between">
              {service.category}
              {service.image && (
                <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-700">
                  <img 
                    src={service.image} 
                    alt={`${service.category} icon`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ul className="space-y-2">
              {service.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
      
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
