
import { Service } from '@/types/services';
import {
  strategyService,
  digitalService,
  socialService,
  customService,
  webService,
  analyticsService,
  aiService,
  recruitmentService
} from './services';

export const services: Service[] = [
  strategyService,
  recruitmentService, // Adding our new service near the top for visibility
  digitalService,
  socialService,
  customService,
  webService,
  analyticsService,
  aiService
];
