
export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = FAQItem[];

export type FAQData = Record<string, FAQCategory>;
