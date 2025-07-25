import { describe, it, expect, beforeEach } from 'vitest';
import { PlanMatrix, Plan } from '../src/config/planMatrix';
import { consumeCredit, getRemainingCredits, getUsedCredits } from '../src/utils/credits';

describe('Plan Gating System', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Plan Matrix Configuration', () => {
    it('should have correct quotas for each plan', () => {
      expect(PlanMatrix.FREE_TIER.quota).toBe(2);
      expect(PlanMatrix.REGISTERED.quota).toBe(5);
      expect(PlanMatrix.PREMIUM.quota).toBe(Infinity);
    });

    it('should have correct history days for each plan', () => {
      expect(PlanMatrix.FREE_TIER.historyDays).toBe(0);
      expect(PlanMatrix.REGISTERED.historyDays).toBe(7);
      expect(PlanMatrix.PREMIUM.historyDays).toBe(30);
    });

    it('should have correct advanced options access', () => {
      expect(PlanMatrix.FREE_TIER.adv).toBe('none');
      expect(PlanMatrix.REGISTERED.adv).toBe('limited');
      expect(PlanMatrix.PREMIUM.adv).toBe('full');
    });

    it('should have correct template access levels', () => {
      expect(PlanMatrix.FREE_TIER.templates).toBe('core');
      expect(PlanMatrix.REGISTERED.templates).toBe('basic');
      expect(PlanMatrix.PREMIUM.templates).toBe('all');
    });
  });

  describe('Credit System', () => {
    it('should allow consuming credits within quota for FREE_TIER', () => {
      expect(() => consumeCredit('FREE_TIER')).not.toThrow();
      expect(getUsedCredits('FREE_TIER')).toBe(1);
      expect(getRemainingCredits('FREE_TIER')).toBe(1);
    });

    it('should prevent consuming credits beyond quota for FREE_TIER', () => {
      // Consume 2 credits (quota limit)
      consumeCredit('FREE_TIER');
      consumeCredit('FREE_TIER');
      
      // Third attempt should throw
      expect(() => consumeCredit('FREE_TIER')).toThrow('quota');
      expect(getUsedCredits('FREE_TIER')).toBe(2);
      expect(getRemainingCredits('FREE_TIER')).toBe(0);
    });

    it('should allow unlimited consumption for PREMIUM', () => {
      // Should not throw for any number of consumptions
      for (let i = 0; i < 100; i++) {
        expect(() => consumeCredit('PREMIUM')).not.toThrow();
      }
      expect(getRemainingCredits('PREMIUM')).toBe(Infinity);
    });

    it('should track credits separately for different plans', () => {
      consumeCredit('FREE_TIER');
      consumeCredit('REGISTERED');
      
      expect(getUsedCredits('FREE_TIER')).toBe(1);
      expect(getUsedCredits('REGISTERED')).toBe(1);
      expect(getRemainingCredits('FREE_TIER')).toBe(1);
      expect(getRemainingCredits('REGISTERED')).toBe(4);
    });
  });

  describe('Component Visibility Matrix', () => {
    const testCases: Array<{plan: Plan, shouldShowAdvanced: boolean, expectedAdvancedLevel: string}> = [
      { plan: 'FREE_TIER', shouldShowAdvanced: false, expectedAdvancedLevel: 'none' },
      { plan: 'REGISTERED', shouldShowAdvanced: true, expectedAdvancedLevel: 'limited' },
      { plan: 'PREMIUM', shouldShowAdvanced: true, expectedAdvancedLevel: 'full' }
    ];

    testCases.forEach(({ plan, shouldShowAdvanced, expectedAdvancedLevel }) => {
      it(`should correctly gate advanced options for ${plan}`, () => {
        const config = PlanMatrix[plan];
        
        if (shouldShowAdvanced) {
          expect(config.adv).not.toBe('none');
          expect(config.adv).toBe(expectedAdvancedLevel);
        } else {
          expect(config.adv).toBe('none');
        }
      });
    });
  });

  describe('Template Access Control', () => {
    it('should allow core templates for FREE_TIER', () => {
      const config = PlanMatrix.FREE_TIER;
      expect(config.templates).toBe('core');
    });

    it('should allow basic templates for REGISTERED', () => {
      const config = PlanMatrix.REGISTERED;
      expect(config.templates).toBe('basic');
    });

    it('should allow all templates for PREMIUM', () => {
      const config = PlanMatrix.PREMIUM;
      expect(config.templates).toBe('all');
    });
  });

  describe('Cache TTL Configuration', () => {
    it('should have no caching for FREE_TIER', () => {
      expect(PlanMatrix.FREE_TIER.cacheTTL).toBe(0);
    });

    it('should have 7-day caching for REGISTERED', () => {
      expect(PlanMatrix.REGISTERED.cacheTTL).toBe(7);
    });

    it('should have 30-day priority caching for PREMIUM', () => {
      expect(PlanMatrix.PREMIUM.cacheTTL).toBe(30);
    });
  });
});