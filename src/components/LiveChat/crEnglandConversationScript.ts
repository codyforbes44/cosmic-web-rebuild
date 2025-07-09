interface ConversationStep {
  id: string;
  question: string;
  type: 'text' | 'phone' | 'email' | 'zip' | 'yes_no' | 'number' | 'consent';
  field: string;
  validation?: (value: string) => boolean;
  required?: boolean;
}

export interface ApplicationData {
  firstName?: string;
  lastName?: string;
  cellPhone?: string;
  email?: string;
  zipCode?: string;
  isOver21?: boolean;
  hasClassACDL?: boolean;
  drivingExperienceMonths?: number;
  canPassDrugTest?: boolean;
  hasServedMilitary?: boolean;
  consentGiven?: boolean;
}

export interface ConversationState {
  currentStep: number;
  applicationData: ApplicationData;
  isComplete: boolean;
  isInScriptMode: boolean;
}

export const conversationSteps: ConversationStep[] = [
  {
    id: 'greeting',
    question: "Hi there! Thanks for calling C.R. England Recruiting. I can help you get started with your application for a driving position. This will just take a couple of minutes. Let's begin.\n\n📛 Can I get your first name, please?",
    type: 'text',
    field: 'firstName',
    required: true
  },
  {
    id: 'lastName',
    question: "And your last name?",
    type: 'text',
    field: 'lastName',
    required: true
  },
  {
    id: 'cellPhone',
    question: "📱 What's the best cell phone number to reach you?",
    type: 'phone',
    field: 'cellPhone',
    required: true,
    validation: (value: string) => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)
  },
  {
    id: 'email',
    question: "📧 What's your email address?",
    type: 'email',
    field: 'email',
    required: true,
    validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  },
  {
    id: 'zipCode',
    question: "📍 What ZIP code are you currently located in?",
    type: 'zip',
    field: 'zipCode',
    required: true,
    validation: (value: string) => /^\d{5}(-\d{4})?$/.test(value)
  },
  {
    id: 'ageCheck',
    question: "🔞 Are you at least 21 years old?",
    type: 'yes_no',
    field: 'isOver21',
    required: true
  },
  {
    id: 'cdlCheck',
    question: "🚛 Do you currently hold a Class A CDL?",
    type: 'yes_no',
    field: 'hasClassACDL',
    required: true
  },
  {
    id: 'experience',
    question: "⏱️ How many months of Class A CDL driving experience do you have?",
    type: 'number',
    field: 'drivingExperienceMonths',
    required: true,
    validation: (value: string) => !isNaN(Number(value)) && Number(value) >= 0
  },
  {
    id: 'drugTest',
    question: "🧪 Are you able to pass a DOT drug test?",
    type: 'yes_no',
    field: 'canPassDrugTest',
    required: true
  },
  {
    id: 'military',
    question: "🎖️ Have you served in the military?",
    type: 'yes_no',
    field: 'hasServedMilitary',
    required: true
  },
  {
    id: 'consent',
    question: "✅ Before we continue, I need your consent: Do you agree to C.R. England's Privacy Policy and Mobile Terms of Service? By proceeding, you consent to receive text messages about your application.",
    type: 'consent',
    field: 'consentGiven',
    required: true
  }
];

export class CREnglandConversationHandler {
  private state: ConversationState;

  constructor() {
    this.state = {
      currentStep: 0,
      applicationData: {},
      isComplete: false,
      isInScriptMode: false
    };
  }

  startConversation(): string {
    this.state.isInScriptMode = true;
    this.state.currentStep = 0;
    return conversationSteps[0].question;
  }

  processResponse(userInput: string): string {
    if (!this.state.isInScriptMode || this.state.isComplete) {
      return "I'm not currently in application mode. Would you like to start your application?";
    }

    const currentStep = conversationSteps[this.state.currentStep];
    
    // Validate the response
    const isValid = this.validateResponse(userInput, currentStep);
    if (!isValid) {
      return this.getValidationError(currentStep);
    }

    // Store the response
    this.storeResponse(userInput, currentStep);

    // Move to next step
    this.state.currentStep++;

    // Check if we're done
    if (this.state.currentStep >= conversationSteps.length) {
      this.state.isComplete = true;
      return this.getCompletionMessage();
    }

    // Return next question
    return conversationSteps[this.state.currentStep].question;
  }

  private validateResponse(userInput: string, step: ConversationStep): boolean {
    const input = userInput.trim().toLowerCase();

    switch (step.type) {
      case 'yes_no':
      case 'consent':
        return ['yes', 'y', 'no', 'n'].includes(input);
      case 'number':
        return step.validation ? step.validation(userInput) : !isNaN(Number(userInput));
      case 'phone':
      case 'email':
      case 'zip':
        return step.validation ? step.validation(userInput) : userInput.length > 0;
      case 'text':
        return userInput.trim().length > 0;
      default:
        return true;
    }
  }

  private getValidationError(step: ConversationStep): string {
    switch (step.type) {
      case 'yes_no':
      case 'consent':
        return "Please answer with 'Yes' or 'No'.";
      case 'phone':
        return "Please enter a valid phone number (e.g., 555-123-4567).";
      case 'email':
        return "Please enter a valid email address.";
      case 'zip':
        return "Please enter a valid ZIP code (e.g., 12345 or 12345-6789).";
      case 'number':
        return "Please enter a valid number.";
      case 'text':
        return "Please provide a response.";
      default:
        return "Please provide a valid response.";
    }
  }

  private storeResponse(userInput: string, step: ConversationStep): void {
    const input = userInput.trim();
    
    switch (step.type) {
      case 'yes_no':
      case 'consent':
        (this.state.applicationData as any)[step.field] = ['yes', 'y'].includes(input.toLowerCase());
        break;
      case 'number':
        (this.state.applicationData as any)[step.field] = Number(input);
        break;
      default:
        (this.state.applicationData as any)[step.field] = input;
        break;
    }
  }

  private getCompletionMessage(): string {
    // Check if consent was given
    if (!this.state.applicationData.consentGiven) {
      return "I understand you don't consent to our terms. Unfortunately, we cannot proceed with your application without consent. Thank you for your interest in C.R. England.";
    }

    return "🎉 Awesome, thank you! You're all set. Our team will be reviewing your information, and someone will follow up with you shortly.\n\nThanks again for calling C.R. England Recruiting — have a great day!";
  }

  getCurrentStep(): number {
    return this.state.currentStep;
  }

  getApplicationData(): ApplicationData {
    return { ...this.state.applicationData };
  }

  isInScriptMode(): boolean {
    return this.state.isInScriptMode;
  }

  isComplete(): boolean {
    return this.state.isComplete;
  }

  reset(): void {
    this.state = {
      currentStep: 0,
      applicationData: {},
      isComplete: false,
      isInScriptMode: false
    };
  }

  // Check if user wants to start application
  static shouldStartApplication(userInput: string): boolean {
    const input = userInput.toLowerCase();
    const applicationTriggers = [
      'apply',
      'application',
      'start application',
      'begin application',
      'get started',
      'sign up',
      'join',
      'hire me',
      'i want to apply',
      'apply for job',
      'driving job',
      'become a driver'
    ];
    
    return applicationTriggers.some(trigger => input.includes(trigger));
  }
}

export const conversationHandler = new CREnglandConversationHandler();