
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Service {
  category: string;
  title: string;
  content: string;
  image: string;
}

const services: Record<string, Service[]> = {
  consulting: [
    {
      category: 'consulting',
      title: 'Strategic Technology Consulting',
      content: 'Our expert consultants work with your team to develop comprehensive technology strategies aligned with your business objectives, ensuring optimal ROI and competitive advantage.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      category: 'consulting',
      title: 'Digital Transformation',
      content: 'We guide businesses through their digital transformation journey, helping modernize legacy systems, implement new technologies, and create seamless digital experiences for customers.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
  ],
  development: [
    {
      category: 'development',
      title: 'Custom Software Development',
      content: 'Our team designs and builds tailored software solutions that address your specific business challenges, from enterprise applications to specialized industry tools.',
      image: 'https://images.unsplash.com/photo-1573495612937-f02b76716e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      category: 'development',
      title: 'Web & Mobile Applications',
      content: 'We create responsive, user-friendly web and mobile applications that deliver exceptional user experiences across all devices, helping your business reach customers wherever they are.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  ],
  analytics: [
    {
      category: 'analytics',
      title: 'Business Intelligence & Analytics',
      content: 'Transform your data into actionable insights with our advanced analytics solutions, helping you make data-driven decisions that improve operations and drive business growth.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      category: 'analytics',
      title: 'Predictive Analytics & AI',
      content: 'Leverage the power of artificial intelligence and machine learning to forecast trends, optimize processes, and gain competitive advantages in your market.',
      image: 'https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  ],
};

const AstronomyFacts = () => {
  const [activeCategory, setActiveCategory] = useState<string>('consulting');

  return (
    <section className="py-24 bg-gradient-to-b from-space-dark-blue to-space-deep-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Services & Solutions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover how ƷBI can help transform your business with our comprehensive range of technology services
          </p>
        </div>

        <Tabs defaultValue="consulting" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger value="consulting" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                Consulting
              </TabsTrigger>
              <TabsTrigger value="development" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                Development
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(services).map(([category, categoryServices]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categoryServices.map((service, index) => (
                  <div
                    key={index}
                    className="space-card p-6 overflow-hidden hover:scale-[1.02] transition-all duration-300 h-full"
                  >
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                    <p className="text-gray-300">{service.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default AstronomyFacts;
