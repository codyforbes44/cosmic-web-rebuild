
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";
import SEO from "@/components/SEO";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

// FAQ categories and questions
const faqData = {
  services: [
    {
      question: "What technology consulting services does ƷBI offer?",
      answer: "ƷBI offers a comprehensive range of technology consulting services including digital transformation strategy, cloud migration, data analytics implementation, custom software development, AI and machine learning integration, technology infrastructure optimization, cybersecurity assessment and implementation, and business process automation."
    },
    {
      question: "How does your project engagement process work?",
      answer: "Our engagement process starts with a detailed discovery phase where we understand your business needs and objectives. We then develop a strategic roadmap and implementation plan, followed by execution with regular checkpoints and milestone deliveries. We maintain transparent communication throughout the project and provide comprehensive post-implementation support."
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Yes, we offer several tiers of post-implementation support based on your needs, from basic troubleshooting to comprehensive managed services. Our support packages include regular maintenance, performance optimization, security updates, and continuous improvement recommendations."
    },
    {
      question: "Can you work with our existing technology stack?",
      answer: "Absolutely. We have expertise across a wide range of technologies and platforms. We'll evaluate your existing stack, identify opportunities for optimization, and integrate new solutions seamlessly with your current systems whenever possible."
    }
  ],
  process: [
    {
      question: "How long does a typical consulting project take?",
      answer: "Project timelines vary significantly based on scope, complexity, and organizational readiness. Small-scale implementations might take 1-3 months, while comprehensive digital transformation initiatives could span 12-18 months. During our initial assessment, we'll provide you with a detailed timeline specific to your project."
    },
    {
      question: "What methodologies do you use for project management?",
      answer: "We employ a hybrid approach that combines elements of Agile and traditional project management methodologies. This allows us to maintain structured governance while remaining adaptable to changing requirements. For software development specifically, we utilize Scrum or Kanban frameworks depending on the project needs."
    },
    {
      question: "How do you measure project success?",
      answer: "We establish clear, measurable KPIs at the beginning of each engagement. These typically include both technical metrics (system performance, uptime, etc.) and business outcomes (efficiency improvements, cost savings, revenue growth). We track these metrics throughout the project and conduct formal reviews at project milestones."
    },
    {
      question: "How involved do our internal teams need to be?",
      answer: "Successful technology initiatives require collaboration. We typically need engagement from key stakeholders and subject matter experts during the discovery and planning phases, as well as for periodic reviews. For implementation, we can either work alongside your team for knowledge transfer or handle the full implementation independently, depending on your preference."
    }
  ],
  pricing: [
    {
      question: "How do you structure your consulting fees?",
      answer: "We offer flexible engagement models including project-based fixed pricing, time and materials, and retainer arrangements. The appropriate model depends on project complexity, timeline certainty, and scope definition. We'll recommend the most suitable approach after our initial assessment."
    },
    {
      question: "Do you offer packages for startups or small businesses?",
      answer: "Yes, we have tailored offerings specifically for startups and small businesses that provide essential services at scale-appropriate pricing. These packages focus on foundational technology needs and growth enablement while remaining cost-effective."
    },
    {
      question: "What's your typical ROI timeframe?",
      answer: "While this varies by project type, our clients typically see ROI within 6-18 months for most technology initiatives. We build ROI modeling into our project planning process and track actual returns compared to projections throughout implementation."
    },
    {
      question: "Are there any hidden costs in your projects?",
      answer: "We pride ourselves on transparent pricing. Our proposals clearly outline all anticipated costs, including implementation, licensing, maintenance, and support. If any additional costs arise during the project due to scope changes or unforeseen challenges, we discuss these with you before proceeding."
    }
  ],
  technology: [
    {
      question: "What technologies do you specialize in?",
      answer: "Our expertise spans cloud platforms (AWS, Azure, Google Cloud), data technologies (SQL, NoSQL, data warehousing), AI/ML frameworks, modern development frameworks (React, Angular, Node.js), enterprise systems (SAP, Oracle, Salesforce), and mobile development environments (iOS, Android)."
    },
    {
      question: "How do you keep up with rapidly changing technology?",
      answer: "We have a dedicated innovation lab that continuously evaluates emerging technologies. Our consultants participate in ongoing education programs, maintain industry certifications, and often contribute to technology communities through open source work, speaking engagements, and technical publications."
    },
    {
      question: "Can you help us choose between different technology options?",
      answer: "Yes, technology selection consulting is one of our core services. We conduct thorough assessments based on your business needs, technical requirements, budget constraints, and long-term strategy to recommend the optimal technology stack and specific solutions."
    },
    {
      question: "Do you develop custom solutions or only implement existing platforms?",
      answer: "We offer both services. When existing platforms can meet your needs efficiently, we'll recommend and implement those solutions. However, we also have extensive experience developing custom solutions when standard offerings don't address unique business requirements or when competitive differentiation is critical."
    }
  ],
  security: [
    {
      question: "How do you ensure the security of implemented solutions?",
      answer: "Security is integrated throughout our development and implementation processes, not added as an afterthought. We follow security-by-design principles, conduct regular security assessments, implement industry best practices, and perform penetration testing before deployment. Our solutions comply with relevant industry standards like ISO 27001, GDPR, HIPAA, etc."
    },
    {
      question: "Do you offer dedicated cybersecurity services?",
      answer: "Yes, our cybersecurity services include comprehensive security audits, vulnerability assessments, security architecture design, implementation of security controls and technologies, compliance consulting, and security training for your teams."
    },
    {
      question: "How do you handle data protection and privacy?",
      answer: "We implement robust data protection measures including encryption (at rest and in transit), access controls, anonymization techniques when appropriate, and comprehensive data governance frameworks. All our solutions are designed to comply with relevant privacy regulations such as GDPR, CCPA, and industry-specific requirements."
    },
    {
      question: "What's your approach to disaster recovery and business continuity?",
      answer: "We develop comprehensive disaster recovery and business continuity plans tailored to your organization's needs. This typically includes redundant systems, automated backup solutions, geographical distribution of data centers, and documented recovery procedures with regular testing."
    }
  ]
};

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('services');
  const navigate = useNavigate();

  // Simplified search functionality
  const filteredFAQs = Object.entries(faqData).reduce((acc, [category, questions]) => {
    const filteredQuestions = questions.filter(
      (item) => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filteredQuestions.length > 0) {
      acc[category] = filteredQuestions;
    }
    
    return acc;
  }, {} as Record<string, typeof faqData.services>);
  
  const hasResults = Object.values(filteredFAQs).some(questions => questions.length > 0);

  return (
    <>
      <SEO 
        title="Frequently Asked Questions" 
        description="Find answers to commonly asked questions about ƷBI's business technology consulting services, process, pricing, and more."
        image="/lovable-uploads/10a43409-3847-4d52-bf9a-80e8508797c3.png"
        type="website"
      />
      <Navbar />
      <StarBackground />
      <main className="min-h-screen pt-20 pb-24">
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Find answers to common questions about our services, process, and technology solutions.
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  type="text"
                  placeholder="Search for answers..."
                  className="pl-10 py-6 bg-space-deep-blue/50 border-gray-700 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="max-w-4xl mx-auto space-card p-8 rounded-xl">
              {searchQuery ? (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-white">Search Results</h2>
                  {hasResults ? (
                    Object.entries(filteredFAQs).map(([category, questions]) => (
                      <div key={category} className="mb-8">
                        <h3 className="text-xl font-semibold text-accent capitalize mb-4">{category}</h3>
                        <Accordion type="single" collapsible className="space-y-4">
                          {questions.map((item, index) => (
                            <AccordionItem 
                              key={index} 
                              value={`${category}-${index}`}
                              className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/30"
                            >
                              <AccordionTrigger className="px-4 py-3 text-white hover:text-accent text-left">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4 text-gray-300">
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-300 mb-4">No results found for "{searchQuery}"</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery('')}
                        className="border-accent text-accent hover:bg-accent hover:text-white"
                      >
                        Clear Search
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Tabs defaultValue="services" value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="process">Process</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="technology">Technology</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(faqData).map(([category, questions]) => (
                    <TabsContent key={category} value={category} className="space-y-4">
                      <Accordion type="single" collapsible className="space-y-4">
                        {questions.map((item, index) => (
                          <AccordionItem 
                            key={index} 
                            value={`${category}-${index}`}
                            className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/30"
                          >
                            <AccordionTrigger className="px-4 py-3 text-white hover:text-accent text-left">
                              {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 text-gray-300">
                              {item.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>
            
            {/* Contact CTA */}
            <Card className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-space-purple/20 to-accent/20 border border-accent/20">
              <CardContent className="p-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4 text-white">Still have questions?</h2>
                  <p className="text-gray-300 mb-6">
                    Our team is ready to help answer any questions you might have about our services.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={() => navigate('/contact')}
                      className="bg-accent hover:bg-accent/80 text-white"
                    >
                      Contact Us
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/get-quote')}
                      className="border-accent text-accent hover:bg-accent hover:text-white"
                    >
                      Get a Quote
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Common Topics */}
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center text-white">Popular Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Collapsible className="space-card p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Digital Transformation</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                        <Search className="h-4 w-4 text-accent" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-4">
                    <p className="text-gray-300 mb-4">
                      Digital transformation is the integration of digital technology into all areas of a business, 
                      fundamentally changing how you operate and deliver value to customers.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-accent p-0 h-auto"
                      onClick={() => navigate('/services')}
                    >
                      Learn about our digital transformation services
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
                
                <Collapsible className="space-card p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">AI & Machine Learning</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                        <Search className="h-4 w-4 text-accent" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-4">
                    <p className="text-gray-300 mb-4">
                      Our AI and machine learning solutions help businesses automate processes, 
                      gain deeper insights from data, and create intelligent applications.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-accent p-0 h-auto"
                      onClick={() => navigate('/services')}
                    >
                      Discover our AI & ML capabilities
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
                
                <Collapsible className="space-card p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Cloud Migration</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                        <Search className="h-4 w-4 text-accent" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-4">
                    <p className="text-gray-300 mb-4">
                      Moving your business applications and data to the cloud offers 
                      flexibility, scalability, and cost savings.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-accent p-0 h-auto"
                      onClick={() => navigate('/services')}
                    >
                      Explore our cloud migration services
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
                
                <Collapsible className="space-card p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Data Analytics</h3>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                        <Search className="h-4 w-4 text-accent" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-4">
                    <p className="text-gray-300 mb-4">
                      Turn your data into actionable insights with our advanced analytics solutions.
                    </p>
                    <Button 
                      variant="link" 
                      className="text-accent p-0 h-auto"
                      onClick={() => navigate('/services')}
                    >
                      Learn about our data analytics services
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
