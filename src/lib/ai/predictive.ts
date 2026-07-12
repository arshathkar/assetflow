// ============================================================================
// AssetFlow AI — Predictive Maintenance Engine
// Estimates failure probability and generates proactive maintenance alerts.
// ============================================================================

import { Asset, AIPrediction, RiskTier } from '@/lib/types';
import { calculateHealthScore } from '@/lib/ai/healthScore';

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORY_LIFESPAN: Record<string, number> = {
  Laptop: 4,
  Desktop: 5,
  Monitor: 7,
  Mobile: 3,
  Tablet: 3,
  Printer: 6,
  Server: 6,
  Networking: 7,
  Furniture: 10,
  Vehicle: 8,
};

/** Components that can be assessed per category. */
const CATEGORY_COMPONENTS: Record<string, string[]> = {
  Laptop: ['Battery', 'Keyboard', 'Display', 'Storage', 'Hinge', 'Fan', 'Touchpad'],
  Desktop: ['Power Supply', 'Storage', 'Fan', 'RAM', 'Motherboard', 'GPU'],
  Monitor: ['Panel', 'Backlight', 'Stand', 'Ports'],
  Mobile: ['Battery', 'Screen', 'Charging Port', 'Speaker', 'Camera'],
  Tablet: ['Battery', 'Screen', 'Charging Port', 'Speaker'],
  Printer: ['Print Head', 'Paper Feed', 'Toner/Ink System', 'Fuser', 'Scanner'],
  Server: ['Storage Array', 'Power Supply', 'Fan', 'RAM', 'RAID Controller', 'NIC'],
  Networking: ['Ports', 'Firmware', 'Fan', 'Power Module'],
  Furniture: ['Structure', 'Upholstery', 'Mechanism', 'Surface'],
  Vehicle: ['Engine', 'Transmission', 'Brakes', 'Tires', 'Battery', 'Suspension'],
};

const DEFAULT_COMPONENTS = ['General', 'Structural', 'Electrical'];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getAgeYears(purchaseDate: string): number {
  const diff = Date.now() - new Date(purchaseDate).getTime();
  return Math.max(0, diff / (365.25 * 24 * 60 * 60 * 1000));
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Deterministic pseudo-random seeded by string. */
function seededRandom(seed: string, min = 0, max = 1): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const normalized = (Math.abs(hash) % 10000) / 10000;
  return min + normalized * (max - min);
}

function riskToTier(risk: number): RiskTier {
  if (risk <= 30) return 'Low';
  if (risk <= 60) return 'Medium';
  if (risk <= 80) return 'High';
  return 'Critical';
}

function componentStatusLabel(risk: number): 'Healthy' | 'Watch' | 'Warning' | 'Critical' {
  if (risk <= 25) return 'Healthy';
  if (risk <= 50) return 'Watch';
  if (risk <= 75) return 'Warning';
  return 'Critical';
}

// ── Recommendation Text Generator ─────────────────────────────────────────────

function buildRecommendation(
  asset: Asset,
  overallRisk: number,
  tier: RiskTier,
  worstComponent: string,
  daysToFailure: number,
): string {
  const lines: string[] = [];

  if (tier === 'Critical') {
    lines.push(
      `⚠️ CRITICAL: ${asset.name} requires immediate attention.`,
      `The ${worstComponent} component is at highest risk.`,
      `Estimated failure within ${daysToFailure} days.`,
      `Recommendation: Schedule emergency maintenance or plan replacement.`,
    );
  } else if (tier === 'High') {
    lines.push(
      `🔶 HIGH RISK: ${asset.name} shows elevated failure probability (${overallRisk}%).`,
      `Primary concern: ${worstComponent}.`,
      `Schedule preventive maintenance within ${Math.min(daysToFailure, 30)} days.`,
    );
  } else if (tier === 'Medium') {
    lines.push(
      `🔵 MODERATE: ${asset.name} has moderate wear indicators.`,
      `Monitor ${worstComponent} closely.`,
      `Next maintenance recommended within ${Math.min(daysToFailure, 90)} days.`,
    );
  } else {
    lines.push(
      `✅ LOW RISK: ${asset.name} is in healthy condition.`,
      `Continue standard maintenance schedule.`,
      `No immediate action required.`,
    );
  }

  return lines.join(' ');
}

// ── Main Prediction Generator ─────────────────────────────────────────────────

/**
 * Generates a predictive maintenance assessment for a single asset.
 *
 * @param asset                - The asset to evaluate
 * @param repairCount          - Number of past repairs
 * @param daysSinceLastRepair  - Days since the most recent repair
 * @param totalMaintenanceCost - Cumulative maintenance spend
 */
export function generatePrediction(
  asset: Asset,
  repairCount: number,
  daysSinceLastRepair: number,
  totalMaintenanceCost: number,
): AIPrediction {
  const expectedLifespan = CATEGORY_LIFESPAN[asset.category] ?? 5;
  const ageYears = getAgeYears(asset.purchaseDate);

  // ── Factor Calculations (each 0-100) ──────────────────────────────────────

  // Age factor: ramps up linearly, then accelerates beyond lifespan
  const ageRatio = ageYears / Math.max(expectedLifespan, 1);
  const ageFactor = clamp(ageRatio >= 1 ? 70 + (ageRatio - 1) * 30 : ageRatio * 70, 0, 100);

  // Repair frequency: more repairs → higher risk, exponential curve
  const repairFactor = clamp(
    (1 - Math.exp(-repairCount * 0.5)) * 100,
    0,
    100,
  );

  // Time since last repair: long gaps can indicate either stability or neglect
  // Beyond 365 days without repair for an older asset is concerning
  const gapFactor =
    ageYears > 1
      ? clamp((daysSinceLastRepair / 365) * 30, 0, 40)
      : clamp((daysSinceLastRepair / 365) * 10, 0, 20);

  // Cost ratio: cumulative repair cost vs. purchase price
  const costRatio =
    asset.purchasePrice > 0
      ? totalMaintenanceCost / asset.purchasePrice
      : 0;
  const costFactor = clamp(costRatio * 100, 0, 100);

  // Condition: direct mapping
  const conditionMap: Record<string, number> = {
    Excellent: 5,
    Good: 20,
    Fair: 50,
    Poor: 80,
  };
  const conditionFactor = conditionMap[asset.condition] ?? 40;

  // Health score inversion
  const health = calculateHealthScore(
    asset,
    repairCount,
    totalMaintenanceCost,
    expectedLifespan,
  );
  const healthFactor = clamp(100 - health.totalScore, 0, 100);

  // ── Weighted Overall Risk ─────────────────────────────────────────────────

  const overallRisk = Math.round(
    clamp(
      ageFactor * 0.2 +
        repairFactor * 0.2 +
        conditionFactor * 0.2 +
        healthFactor * 0.15 +
        costFactor * 0.15 +
        gapFactor * 0.1,
      0,
      100,
    ),
  );

  const riskTier = riskToTier(overallRisk);

  // ── Component-Level Risk ──────────────────────────────────────────────────

  const componentNames =
    CATEGORY_COMPONENTS[asset.category] ?? DEFAULT_COMPONENTS;

  const components = componentNames.map((name) => {
    // Base component risk is derived from overall risk + per-component jitter
    const jitter = seededRandom(`${asset.id}-${name}`, -15, 20);
    const componentRisk = clamp(Math.round(overallRisk + jitter), 0, 100);
    return { name, risk: componentRisk };
  });

  // Sort so highest-risk component is first
  components.sort((a, b) => b.risk - a.risk);

  const worstComponent = components[0]?.name ?? 'General';

  // ── Estimated Days to Failure ─────────────────────────────────────────────
  // Lower risk → more days; higher risk → fewer days
  // Scale: risk 100 → ~7 days, risk 0 → ~730 days (2 years)
  const estimatedDaysToFailure = Math.max(
    7,
    Math.round(730 * Math.pow(1 - overallRisk / 100, 2)),
  );

  // ── Build Recommendation ──────────────────────────────────────────────────

  const recommendation = buildRecommendation(
    asset,
    overallRisk,
    riskTier,
    worstComponent,
    estimatedDaysToFailure,
  );

  return {
    id: `pred-${asset.id}`,
    assetId: asset.id,
    assetName: asset.name,
    assetAssetId: asset.assetId,
    overallRisk,
    riskTier,
    components,
    predictedFailureDays: estimatedDaysToFailure,
    likelyComponent: worstComponent,
    recommendation,
    createdAt: new Date().toISOString(),
  };
}

// ── Color Helpers ─────────────────────────────────────────────────────────────

const TIER_TEXT_COLORS: Record<string, string> = {
  Low: 'text-emerald-400',
  Medium: 'text-yellow-400',
  High: 'text-orange-400',
  Critical: 'text-red-400',
};

const TIER_BG_COLORS: Record<string, string> = {
  Low: 'bg-emerald-400/15',
  Medium: 'bg-yellow-400/15',
  High: 'bg-orange-400/15',
  Critical: 'bg-red-400/15',
};

const TIER_BORDER_COLORS: Record<string, string> = {
  Low: 'border-emerald-400/30',
  Medium: 'border-yellow-400/30',
  High: 'border-orange-400/30',
  Critical: 'border-red-400/30',
};

/** Returns a Tailwind text color class for a risk tier. */
export function getRiskTierColor(tier: string): string {
  return TIER_TEXT_COLORS[tier] ?? 'text-gray-400';
}

/** Returns a Tailwind background color class (with opacity) for a risk tier. */
export function getRiskTierBgColor(tier: string): string {
  return TIER_BG_COLORS[tier] ?? 'bg-gray-400/15';
}

/** Returns a Tailwind border color class for a risk tier. */
export function getRiskTierBorderColor(tier: string): string {
  return TIER_BORDER_COLORS[tier] ?? 'border-gray-400/30';
}

/** Returns the status label for a component-level risk value. */
export function getComponentStatus(risk: number): string {
  return componentStatusLabel(risk);
}
