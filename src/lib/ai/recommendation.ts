// ============================================================================
// AssetFlow AI — Recommendation Engine
// Scores available assets for a requester using multi-factor weighted ranking.
// ============================================================================

import { Asset, Employee, AIRecommendation } from '@/lib/types';
import { calculateHealthScore } from '@/lib/ai/healthScore';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RecommendationWeights {
  condition: number;
  age: number;
  maintenance: number;
  battery: number;
  warranty: number;
  utilization: number;
  proximity: number;
  departmentAffinity: number;
}

// ── Default Weights (sum = 1.0) ───────────────────────────────────────────────

export const DEFAULT_WEIGHTS: RecommendationWeights = {
  condition: 0.25,
  age: 0.15,
  maintenance: 0.15,
  battery: 0.10,
  warranty: 0.10,
  utilization: 0.10,
  proximity: 0.10,
  departmentAffinity: 0.05,
};

// ── Helper: Deterministic pseudo-random (same seed → same result) ─────────

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

// ── Helper: Clamp value between 0 and 1 ───────────────────────────────────

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

// ── Helper: Asset age in years ────────────────────────────────────────────

function getAgeYears(purchaseDate: string): number {
  const diff = Date.now() - new Date(purchaseDate).getTime();
  return Math.max(0, diff / (365.25 * 24 * 60 * 60 * 1000));
}

// ── Expected Lifespan Lookup (by category name) ───────────────────────────

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

function getExpectedLifespan(category: string): number {
  return CATEGORY_LIFESPAN[category] ?? 5;
}

// ── Factor Calculators ────────────────────────────────────────────────────────

/** Condition: Excellent=1.0, Good=0.8, Fair=0.5, Poor=0.2 */
function scoreCondition(asset: Asset): { score: number; detail: string } {
  const map: Record<string, number> = {
    Excellent: 1.0,
    Good: 0.8,
    Fair: 0.5,
    Poor: 0.2,
  };
  const score = map[asset.condition] ?? 0.5;
  return { score, detail: `Condition is ${asset.condition}` };
}

/** Age: 1 – (age / lifespan), clamped [0, 1] */
function scoreAge(asset: Asset): { score: number; detail: string } {
  const lifespan = getExpectedLifespan(asset.category);
  const age = getAgeYears(asset.purchaseDate);
  const score = clamp01(1 - age / Math.max(lifespan, 1));
  return {
    score,
    detail: `${age.toFixed(1)}y old / ${lifespan}y lifespan`,
  };
}

/** Maintenance: uses health score / 100 as a proxy */
function scoreMaintenance(asset: Asset): { score: number; detail: string } {
  // Simulate repair data from the asset's seeded random
  const repairCount = Math.floor(seededRandom(asset.id + '-rc', 0, 5));
  const totalCost = seededRandom(asset.id + '-tc', 0, asset.purchasePrice * 0.3);
  const lifespan = getExpectedLifespan(asset.category);
  const health = calculateHealthScore(asset, repairCount, totalCost, lifespan);
  const score = clamp01(health.totalScore / 100);
  return {
    score,
    detail: `Health score ${health.totalScore}/100 (${health.grade})`,
  };
}

/** Battery: simulated 70-100% for portables, 1.0 for others */
function scoreBattery(asset: Asset): { score: number; detail: string } {
  const portableCategories = ['Laptop', 'Mobile', 'Tablet'];
  if (!portableCategories.includes(asset.category)) {
    return { score: 1.0, detail: 'Non-portable — N/A' };
  }
  const batteryPct = seededRandom(asset.id + '-bat', 70, 100);
  const score = clamp01(batteryPct / 100);
  return {
    score,
    detail: `Battery health ~${Math.round(batteryPct)}%`,
  };
}

/** Warranty: 1.0 in warranty, 0.3 expired */
function scoreWarranty(asset: Asset): { score: number; detail: string } {
  const expiry = new Date(asset.warrantyExpiry);
  const now = new Date();
  if (expiry > now) {
    const monthsLeft = Math.round(
      (expiry.getTime() - now.getTime()) / (30.44 * 24 * 60 * 60 * 1000),
    );
    return { score: 1.0, detail: `In warranty (${monthsLeft} months left)` };
  }
  return { score: 0.3, detail: 'Warranty expired' };
}

/** Utilization: inverse of simulated usage (higher available time → better) */
function scoreUtilization(asset: Asset): { score: number; detail: string } {
  const usageFactor = seededRandom(asset.id + '-util', 0.2, 0.9);
  const score = clamp01(1 - usageFactor);
  const pct = Math.round(usageFactor * 100);
  return { score, detail: `~${pct}% utilized — ${Math.round(score * 100)}% available` };
}

/** Proximity: 1.0 same location, 0.7 same building implied, 0.4 otherwise */
function scoreProximity(
  asset: Asset,
  requester: Employee,
): { score: number; detail: string } {
  // Exact location match
  if (asset.location === requester.location) {
    return { score: 1.0, detail: 'Same location as requester' };
  }
  // Check if the location strings share a building identifier
  // Heuristic: compare the first segment (e.g., "HQ" in "HQ — Floor 3, Room 301")
  const assetBuilding = asset.location.split(/[—\-,]/)[0].trim().toLowerCase();
  const requesterBuilding = requester.location.split(/[—\-,]/)[0].trim().toLowerCase();
  if (assetBuilding && requesterBuilding && assetBuilding === requesterBuilding) {
    return { score: 0.7, detail: 'Same building, different area' };
  }
  return { score: 0.4, detail: 'Different building' };
}

/** Department affinity: 1.0 same department, 0.5 otherwise */
function scoreDepartmentAffinity(
  asset: Asset,
  requester: Employee,
): { score: number; detail: string } {
  if (
    asset.departmentId === requester.departmentId ||
    asset.department.toLowerCase() === requester.department.toLowerCase()
  ) {
    return { score: 1.0, detail: 'Same department' };
  }
  return { score: 0.5, detail: `Different department (${asset.department})` };
}

// ── Main Engine ───────────────────────────────────────────────────────────────

/**
 * Generates ranked AI recommendations for a requester looking for an asset
 * in a given category.
 *
 * @param categoryId       - Filter assets by this category ID
 * @param requester        - The employee requesting an asset
 * @param availableAssets  - Full asset pool (will be filtered internally)
 * @param weights          - Optional custom weights
 * @returns Top 3 recommendations sorted by composite score (descending)
 */
export function getRecommendations(
  categoryId: string,
  requester: Employee,
  availableAssets: Asset[],
  weights: RecommendationWeights = DEFAULT_WEIGHTS,
): AIRecommendation[] {
  // Filter: same category, available status
  const candidates = availableAssets.filter(
    (a) =>
      a.categoryId === categoryId &&
      a.status === 'Available',
  );

  if (candidates.length === 0) return [];

  const scored = candidates.map((asset) => {
    const factors: {
      name: string;
      score: number;
      weight: number;
      contribution: number;
      detail: string;
    }[] = [];

    const addFactor = (
      name: string,
      weightKey: keyof RecommendationWeights,
      calc: { score: number; detail: string },
    ) => {
      const w = weights[weightKey];
      const contribution = calc.score * w;
      factors.push({
        name,
        score: Math.round(calc.score * 100) / 100,
        weight: w,
        contribution: Math.round(contribution * 1000) / 1000,
        detail: calc.detail,
      });
    };

    addFactor('Condition', 'condition', scoreCondition(asset));
    addFactor('Age', 'age', scoreAge(asset));
    addFactor('Maintenance', 'maintenance', scoreMaintenance(asset));
    addFactor('Battery', 'battery', scoreBattery(asset));
    addFactor('Warranty', 'warranty', scoreWarranty(asset));
    addFactor('Utilization', 'utilization', scoreUtilization(asset));
    addFactor('Proximity', 'proximity', scoreProximity(asset, requester));
    addFactor('Dept. Affinity', 'departmentAffinity', scoreDepartmentAffinity(asset, requester));

    const rawScore = factors.reduce((sum, f) => sum + f.contribution, 0);
    const score = Math.round(rawScore * 100); // 0-100 scale

    // Build human-readable summary
    const topFactors = [...factors]
      .sort((a, b) => b.contribution - a.contribution)
      .slice(0, 3)
      .map((f) => f.name);

    return {
      assetId: asset.id,
      assetName: asset.name,
      assetAssetId: asset.assetId,
      score,
      factors: factors.map((f) => ({
        name: f.name,
        score: f.score,
        detail: f.detail,
      })),
    } satisfies AIRecommendation;
  });

  // Sort descending and take top 3
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}
