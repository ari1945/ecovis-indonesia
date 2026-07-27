import type { ServiceContent } from '../service-types';
import { accounting } from './accounting';
import { advisory } from './advisory';
import { audit } from './audit';
import { corporateFinance } from './corporate-finance';
import { digitalSolutions } from './digital-solutions';
import { esg } from './esg';
import { payroll } from './payroll';
import { tax } from './tax';
import { transferPricing } from './transfer-pricing';

/**
 * Services that render through the shared ServicePage template.
 * `company-setup` is deliberately absent — it has a bespoke timeline layout
 * and lives at its own route.
 */
export const TEMPLATED_SERVICES: Record<string, ServiceContent> = {
  audit: audit,
  tax: tax,
  accounting: accounting,
  payroll: payroll,
  advisory: advisory,
  'corporate-finance': corporateFinance,
  'transfer-pricing': transferPricing,
  esg: esg,
  'digital-solutions': digitalSolutions,
};

export function getTemplatedService(slug: string): ServiceContent | undefined {
  return TEMPLATED_SERVICES[slug];
}
