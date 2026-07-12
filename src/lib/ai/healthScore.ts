// ============================================================================
// AssetFlow AI — Health Score Calculator
// Computes a 0-100 health score for each asset based on weighted penalties.
// ============================================================================

import { Asset, AssetCondition, HealthGrade } from '@/lib/types';

// ── Public Types ──────────────────────────────────────────────────────────────

export interface HealthBreakdown {
  agePenalty: number;
  repairPenalty: number;
  costPenalty: number;
  conditionPenalty: number;
  warrantyPenalty: number;
  utilizationPenalty: number;
  totalScore: number;
  grade: HealthGrade;
}

// ── Penalty Constants ─────────────────────────────────────────────────────────

const MAX_AGE_PENALTY = 30;
const MAX_REPAIR_PENALTY = 25;
const REPAIR_PENALTY_PER_INCIDENT = 5;
const MAX_COST_PENALTY = 15;
const MAX_UTILIZATION_PENALTY = 15;

const CONDITION_PENALTIES: Record<AssetCondition, number> = {
  Excellent: 0,
  Good: 5,
  Fair: 15,
  Poor: 25,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns asset age in fractional years from `purchaseDate` to now. */
function getAssetAgeYears(purchaseDate: string): number {
  const purchased = new Date(purchaseDate);
  const now = new Date();
  const diffMs = now.getTime() - purchased.getTime();
  return Math.max(0, diffMs / (365.25 * 24 * 60 * 60 * 1000));
}

/** Returns years since warranty expiry (negative if still active). */
function yearsSinceWarrantyExpiry(warrantyExpiry: string): number {
  const expiry = new Date(warrantyExpiry);
  const now = new Date();
  return (now.getTime() - expiry.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
}

/**
 * Deterministic pseudo-random based on asset ID.
 * Returns a stable value between `min` and `max` so the same asset always
 * produces the same utilization factor on a given render.
 */
function seededRandom(seed: string, min = 0, max = 1): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  const normalized = (Math.abs(hash) % 10000) / 10000;
  return min + normalized * (max - min);
}

// ── Grade Logic ───────────────────────────────────────────────────────────────

function scoreToGrade(score: number): HealthGrade {
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 30) return 'Poor';
  return 'Critical';
}

// ── Main Calculator ───────────────────────────────────────────────────────────

/**
 * Calculates the health score for a single asset.
 *
 * @param asset             - The asset entity
 * @param repairCount       - Total number of maintenance / repair events
 * @param totalRepairCost   - Cumulative cost of all repairs
 * @param expectedLifespan  - Expected lifespan in years (from category metadata)
 * @returns A full HealthBreakdown with individual penalties and the final score
 */
export function calculateHealthScore(
  asset: Asset,
  repairCount: number,
  totalRepairCost: number,
  expectedLifespan: number,
): HealthBreakdown {
  // 1. Age Penalty — linear ramp up to MAX_AGE_PENALTY over the expected lifespan
  const ageYears = getAssetAgeYears(asset.purchaseDate);
  const agePenalty = Math.min(
    MAX_AGE_PENALTY,
    (ageYears / Math.max(expectedLifespan, 1)) * MAX_AGE_PENALTY,
  );

  // 2. Repair Penalty — 5 points per repair event, capped
  const repairPenalty = Math.min(
    MAX_REPAIR_PENALTY,
    repairCount * REPAIR_PENALTY_PER_INCIDENT,
  );

  // 3. Cost Penalty — repair-cost-to-purchase-price ratio
  const costRatio =
    asset.purchasePrice > 0 ? totalRepairCost / asset.purchasePrice : 0;
  const costPenalty = Math.min(MAX_COST_PENALTY, costRatio * MAX_COST_PENALTY);

  // 4. Condition Penalty — lookup table
  const conditionPenalty = CONDITION_PENALTIES[asset.condition] ?? 15;

  // 5. Warranty Penalty — 0 if active, 5 if expired, 10 if expired > 1 year
  let warrantyPenalty = 0;
  const warrantyYearsExpired = yearsSinceWarrantyExpiry(asset.warrantyExpiry);
  if (warrantyYearsExpired > 1) {
    warrantyPenalty = 10;
  } else if (warrantyYearsExpired > 0) {
    warrantyPenalty = 5;
  }

  // 6. Utilization Penalty — simulated overutilization factor (0–0.5 range)
  const overutilizationFactor = seededRandom(asset.id, 0, 0.5);
  const utilizationPenalty = Math.min(
    MAX_UTILIZATION_PENALTY,
    overutilizationFactor * MAX_UTILIZATION_PENALTY,
  );

  // Final score — clamp between 0 and 100
  const totalPenalty =
    agePenalty +
    repairPenalty +
    costPenalty +
    conditionPenalty +
    warrantyPenalty +
    utilizationPenalty;

  const totalScore = Math.max(0, Math.min(100, Math.round(100 - totalPenalty)));
  const grade = scoreToGrade(totalScore);

  return {
    agePenalty: Math.round(agePenalty * 10) / 10,
    repairPenalty: Math.round(repairPenalty * 10) / 10,
    costPenalty: Math.round(costPenalty * 10) / 10,
    conditionPenalty,
    warrantyPenalty,
    utilizationPenalty: Math.round(utilizationPenalty * 10) / 10,
    totalScore,
    grade,
  };
}

// ── Color Helpers ─────────────────────────────────────────────────────────────

const GRADE_TEXT_COLORS: Record<string, string> = {
  Excellent: 'text-emerald-400',
  Good: 'text-green-400',
  Fair: 'text-yellow-400',
  Poor: 'text-orange-400',
  Critical: 'text-red-400',
};

const GRADE_BG_COLORS: Record<string, string> = {
  Excellent: 'bg-emerald-400/15',
  Good: 'bg-green-400/15',
  Fair: 'bg-yellow-400/15',
  Poor: 'bg-orange-400/15',
  Critical: 'bg-red-400/15',
};

const GRADE_BORDER_COLORS: Record<string, string> = {
  Excellent: 'border-emerald-400/30',
  Good: 'border-green-400/30',
  Fair: 'border-yellow-400/30',
  Poor: 'border-orange-400/30',
  Critical: 'border-red-400/30',
};

/** Returns a Tailwind text color class for a health grade. */
export function getHealthColor(grade: string): string {
  return GRADE_TEXT_COLORS[grade] ?? 'text-gray-400';
}

/** Returns a Tailwind background color class (with opacity) for a health grade. */
export function getHealthBgColor(grade: string): string {
  return GRADE_BG_COLORS[grade] ?? 'bg-gray-400/15';
}

/** Returns a Tailwind border color class for a health grade. */
export function getHealthBorderColor(grade: string): string {
  return GRADE_BORDER_COLORS[grade] ?? 'border-gray-400/30';
}
