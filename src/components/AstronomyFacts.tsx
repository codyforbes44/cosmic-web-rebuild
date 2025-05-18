
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Service {
  category: string;
  title: string;
  content: string;
  image: string;
}

const services: Record<string, Service[]> = {
  advertising: [
    {
      category: 'advertising',
      title: 'Dynamic Advertising',
      content: 'Our dynamic advertising solutions adapt in real-time to your target audience, delivering personalized content that drives engagement and conversions.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      category: 'advertising',
      title: 'Social Media Advertising',
      content: 'Leverage the power of social platforms with our targeted social media advertising strategies that connect your brand with the right audience at the right time.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
    {
      category: 'advertising',
      title: 'Recruitment Marketing',
      content: 'Attract the best talent with our specialized recruitment marketing strategies designed to showcase your company culture and opportunities.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    },
  ],
  development: [
    {
      category: 'development',
      title: 'Web Development',
      content: 'Our expert team creates responsive, high-performance websites that deliver exceptional user experiences and drive business results.',
      image: 'https://images.unsplash.com/photo-1573495612937-f02b76716e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      category: 'development',
      title: 'Custom Software',
      content: 'We design and develop tailored software solutions that address your specific business challenges and streamline your operations.',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      category: 'development',
      title: 'Workflow Automation',
      content: 'Streamline your business processes with our intelligent automation solutions that reduce manual tasks and increase efficiency.',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  ],
  innovation: [
    {
      category: 'innovation',
      title: 'Business Insights Reporting',
      content: 'Transform your data into actionable insights with our comprehensive business intelligence and reporting solutions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
      category: 'innovation',
      title: 'AI Integrations',
      content: 'Leverage the power of artificial intelligence to enhance your products and services, optimize processes, and gain competitive advantages.',
      image: 'https://images.unsplash.com/photo-1551636898-47668aa61de2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
  ],
};

const AstronomyFacts = () => {
  const [activeCategory, setActiveCategory] = useState<string>('advertising');

  return (
    <section className="py-24 bg-gradient-to-b from-space-dark-blue to-space-deep-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Services & Solutions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover how ƷBI can help transform your business with our comprehensive range of technology services
          </p>
        </div>

        <Tabs defaultValue="advertising" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger value="advertising" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                Advertising
              </TabsTrigger>
              <TabsTrigger value="development" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                Development
              </TabsTrigger>
              <TabsTrigger value="innovation" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                Innovation
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
