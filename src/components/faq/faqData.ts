
import { FAQData } from './types';

// FAQ categories and questions
export const faqData: FAQData = {
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

export default faqData;
