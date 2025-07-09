interface CREnglandKnowledgeCategory {
  patterns: RegExp[];
  responses: string[];
  requiresAuth?: boolean;
}

interface ApplicationData {
  fullName?: string;
  email?: string;
  phone?: string;
  hasCDL?: boolean;
  drivingExperience?: number;
  preferredRoute?: string;
  currentLocation?: string;
}

export const crEnglandKnowledgeBase: Record<string, CREnglandKnowledgeCategory> = {
  jobTypes: {
    patterns: [
      /what.*types.*jobs/i,
      /what.*kind.*driving/i,
      /types.*routes/i,
      /driving.*positions/i,
      /job.*options/i
    ],
    responses: [
      "C.R. England offers several types of driving positions: Over-the-Road (OTR), Regional, Dedicated, and Intermodal routes. Each offers different schedules and home time options to fit your lifestyle."
    ]
  },

  cdlTraining: {
    patterns: [
      /cdl.*training/i,
      /training.*program/i,
      /learn.*drive/i,
      /get.*cdl/i,
      /paid.*training/i
    ],
    responses: [
      "Yes! C.R. England offers paid training programs to help you earn your Commercial Driver's License (CDL). You'll get hands-on training while earning money."
    ]
  },

  requirements: {
    patterns: [
      /requirements/i,
      /qualifications/i,
      /what.*need/i,
      /how.*apply/i,
      /eligible/i
    ],
    responses: [
      "The basic requirements are: You must be 21 years or older, pass a DOT drug test, and either hold or be willing to earn a CDL. We'll help you through the process!"
    ]
  },

  benefits: {
    patterns: [
      /benefits/i,
      /pay/i,
      /insurance/i,
      /compensation/i,
      /what.*offer/i,
      /retirement/i,
      /401k/i
    ],
    responses: [
      "C.R. England offers competitive pay, comprehensive health insurance, 401(k) retirement plans, paid time off, and you'll drive modern, fuel-efficient equipment with the latest safety features."
    ]
  },

  application: {
    patterns: [
      /how.*apply/i,
      /application/i,
      /get.*started/i,
      /sign.*up/i,
      /apply.*online/i
    ],
    responses: [
      "You can apply online at www.crengland.com or I can help you get started right now! Would you like me to walk you through the application process?"
    ]
  },

  careerAdvancement: {
    patterns: [
      /advancement/i,
      /career.*growth/i,
      /promotion/i,
      /trainer/i,
      /mentor/i,
      /leadership/i
    ],
    responses: [
      "Absolutely! C.R. England offers structured career paths with opportunities to advance from solo driving to trainer, mentor, and leadership roles. We invest in our drivers' futures."
    ]
  },

  hiringProcess: {
    patterns: [
      /hiring.*process/i,
      /what.*expect/i,
      /next.*steps/i,
      /interview/i,
      /background.*check/i
    ],
    responses: [
      "Our hiring process includes: application, interview, background check, drug screening, and orientation. We'll guide you through each step and keep you informed throughout the process."
    ]
  },

  texasJobs: {
    patterns: [
      /texas/i,
      /dallas/i,
      /fort.*worth/i,
      /houston/i,
      /tx/i
    ],
    responses: [
      "Yes! We actively hire drivers throughout Texas, including Fort Worth, Dallas, Houston, and surrounding areas. Texas is a major hub for our operations."
    ]
  },

  equipment: {
    patterns: [
      /trucks/i,
      /equipment/i,
      /what.*drive/i,
      /fleet/i,
      /vehicles/i
    ],
    responses: [
      "You'll drive late-model, fuel-efficient trucks equipped with advanced safety and comfort features. Our modern fleet is maintained to the highest standards for your safety and comfort."
    ]
  },

  contact: {
    patterns: [
      /contact/i,
      /phone.*number/i,
      /call/i,
      /reach.*you/i,
      /questions/i
    ],
    responses: [
      "You can reach us at 1-800-421-9004 or visit www.crengland.com. I'm also here to answer any questions you have right now!"
    ]
  },

  greeting: {
    patterns: [
      /hello/i,
      /hi/i,
      /hey/i,
      /good.*morning/i,
      /good.*afternoon/i,
      /good.*evening/i
    ],
    responses: [
      "Hello! I'm here to help you learn about driving opportunities with C.R. England. We're one of the nation's largest transportation companies with over 85 years of experience. What would you like to know about joining our team?"
    ]
  }
};

export const applicationQuestions = [
  {
    field: 'fullName',
    question: "What is your full name?",
    pattern: /name/i
  },
  {
    field: 'email',
    question: "What is your email address?",
    pattern: /email/i
  },
  {
    field: 'phone',
    question: "What is your phone number?",
    pattern: /phone/i
  },
  {
    field: 'hasCDL',
    question: "Do you currently have a CDL? (Yes/No)",
    pattern: /cdl/i
  },
  {
    field: 'drivingExperience',
    question: "How many months of driving experience do you have?",
    pattern: /experience/i
  },
  {
    field: 'preferredRoute',
    question: "What type of route are you most interested in? (OTR, Regional, Dedicated, or Intermodal)",
    pattern: /route|type/i
  },
  {
    field: 'currentLocation',
    question: "What city and state are you currently in?",
    pattern: /location|city|state/i
  }
];

export function findCREnglandResponse(userInput: string): string | undefined {
  const input = userInput.toLowerCase();
  
  for (const [category, data] of Object.entries(crEnglandKnowledgeBase)) {
    for (const pattern of data.patterns) {
      if (pattern.test(input)) {
        const responses = data.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }
  
  return undefined;
}

export function getCREnglandSuggestedQuestions(): string[] {
  return [
    "What types of driving jobs do you offer?",
    "Do you provide CDL training?",
    "What are the requirements to apply?",
    "What benefits do you offer?",
    "How can I apply?",
    "Are there jobs available in Texas?",
    "What kind of trucks will I drive?",
    "Is there room for career advancement?"
  ];
}

export function getNextApplicationQuestion(applicationData: ApplicationData): string | null {
  for (const question of applicationQuestions) {
    if (!applicationData[question.field as keyof ApplicationData]) {
      return question.question;
    }
  }
  return null; // All questions answered
}

export function isApplicationComplete(applicationData: ApplicationData): boolean {
  return applicationQuestions.every(q => 
    applicationData[q.field as keyof ApplicationData] !== undefined
  );
}