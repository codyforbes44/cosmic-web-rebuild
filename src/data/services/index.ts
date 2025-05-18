
import { Service } from '@/types/services';
import { strategyService } from './strategyService';
import { digitalService } from './digitalService';
import { customService } from './customService';
import { webService } from './webService';
import { analyticsService } from './analyticsService';
import { aiService } from './aiService';

export const services: Service[] = [
  strategyService,
  digitalService,
  customService,
  webService,
  analyticsService,
  aiService
];
