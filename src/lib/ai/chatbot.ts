// ============================================================================
// AssetFlow AI — Conversational Chatbot Engine
// Pattern-matching NLU that classifies intents and generates contextual
// responses from the asset management knowledge base.
// ============================================================================

import { ChatMessage, Asset, Employee, Booking } from '@/lib/types';
import { calculateHealthScore, getHealthColor } from '@/lib/ai/healthScore';

// ── Intent System ─────────────────────────────────────────────────────────────

type Intent =
  | 'asset_lookup'
  | 'my_assets'
  | 'maintenance_query'
  | 'analytics_query'
  | 'booking_query'
  | 'health_query'
  | 'recommendation_query'
  | 'status_query'
  | 'greeting'
  | 'help'
  | 'unknown';

interface IntentPattern {
  intent: Intent;
  patterns: RegExp[];
}

const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: 'asset_lookup',
    patterns: [
      /where\s+is\s+(.+)/i,
      /find\s+(asset\s+)?(.+)/i,
      /look\s*up\s+(.+)/i,
      /locate\s+(.+)/i,
      /tell\s+me\s+about\s+(.+)/i,
      /details?\s+(for|of|about|on)\s+(.+)/i,
      /af-\d+/i,
      /info\s+(on|about)\s+(.+)/i,
      /what\s+is\s+(af-\d+)/i,
    ],
  },
  {
    intent: 'my_assets',
    patterns: [
      /my\s+assets?/i,
      /what\s+(do\s+)?i\s+have/i,
      /assigned\s+to\s+me/i,
      /show\s+my\s+(?:devices?|equipment|assets?)/i,
      /list\s+my/i,
      /what(?:'s|\s+is)\s+allocated\s+to\s+me/i,
    ],
  },
  {
    intent: 'maintenance_query',
    patterns: [
      /maintenance/i,
      /need(?:s|ing)?\s+repair/i,
      /under\s+maintenance/i,
      /broken|faulty|defective/i,
      /repair\s+status/i,
      /fix(?:ed|ing)?/i,
      /service\s+request/i,
    ],
  },
  {
    intent: 'analytics_query',
    patterns: [
      /how\s+many\s+assets?/i,
      /total\s+(assets?|value|cost)/i,
      /analytics|statistics|stats/i,
      /breakdown|distribution/i,
      /summary|overview|report/i,
      /count\s+of/i,
      /asset\s+count/i,
    ],
  },
  {
    intent: 'health_query',
    patterns: [
      /health(?:\s+score)?/i,
      /critical\s+(?:assets?|health)/i,
      /poor\s+(?:condition|health)/i,
      /at\s+risk/i,
      /deteriorat/i,
      /worst\s+(?:condition|health)/i,
      /unhealthy/i,
      /failing/i,
    ],
  },
  {
    intent: 'booking_query',
    patterns: [
      /book(?:ing)?/i,
      /room\s+(?:available|free|open)/i,
      /conference\s+room/i,
      /meeting\s+room/i,
      /is\s+.+\s+(?:free|available|booked)/i,
      /reserve/i,
      /schedule\s+(?:a\s+)?room/i,
      /available\s+rooms?/i,
    ],
  },
  {
    intent: 'recommendation_query',
    patterns: [
      /recommend/i,
      /suggest(?:ion)?/i,
      /best\s+(?:asset|laptop|device)/i,
      /which\s+(?:asset|laptop|device)\s+should/i,
      /allocat(?:e|ion)/i,
      /assign\s+me/i,
      /i\s+need\s+a/i,
    ],
  },
  {
    intent: 'status_query',
    patterns: [
      /status\s+of/i,
      /what(?:'s|\s+is)\s+the\s+status/i,
      /(?:available|retired|lost)\s+assets?/i,
      /how\s+(?:is|are)/i,
    ],
  },
  {
    intent: 'greeting',
    patterns: [
      /^(?:hi|hello|hey|howdy|good\s+(?:morning|afternoon|evening)|greetings|yo|sup)[\s!?.]*$/i,
      /^what(?:'s)?\s+up/i,
    ],
  },
  {
    intent: 'help',
    patterns: [
      /^help$/i,
      /what\s+can\s+you\s+do/i,
      /capabilities/i,
      /how\s+(?:do|can)\s+(?:i|you)/i,
      /commands?/i,
      /features?/i,
      /what\s+(?:do|can)\s+you/i,
    ],
  },
];

// ── Intent Classifier ─────────────────────────────────────────────────────────

function classifyIntent(query: string): Intent {
  const trimmed = query.trim();
  for (const { intent, patterns } of INTENT_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(trimmed)) {
        return intent;
      }
    }
  }
  return 'unknown';
}

// ── Extract Asset ID from Query ───────────────────────────────────────────────

function extractAssetId(query: string): string | null {
  const match = query.match(/af-\d+/i);
  return match ? match[0].toUpperCase() : null;
}

function extractSearchTerm(query: string): string {
  // Strip common filler words
  return query
    .replace(
      /^(where\s+is|find|look\s*up|locate|tell\s+me\s+about|details?\s+(for|of|about|on)|info\s+(on|about)|what\s+is|show\s+me)\s*/i,
      '',
    )
    .replace(/[?.!]+$/g, '')
    .trim();
}

// ── Category Lifespan Lookup ──────────────────────────────────────────────────

const CATEGORY_LIFESPAN: Record<string, number> = {
  Laptop: 4, Desktop: 5, Monitor: 7, Mobile: 3, Tablet: 3,
  Printer: 6, Server: 6, Networking: 7, Furniture: 10, Vehicle: 8,
};

// ── Response Generators ───────────────────────────────────────────────────────

interface ChatContext {
  assets: Asset[];
  employees: Employee[];
  currentUser: Employee;
  bookings?: Booking[];
}

function respondGreeting(): string {
  const greetings = [
    '👋 Hello! I\'m the AssetFlow AI assistant. How can I help you manage your assets today?',
    '🤖 Hi there! I can help you look up assets, check maintenance status, view health scores, and more. What do you need?',
    '✨ Hey! Welcome to AssetFlow AI. Ask me about any asset, check your assigned devices, or explore analytics!',
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}

function respondHelp(): string {
  return [
    '🔧 **Here\'s what I can help you with:**\n',
    '• **Asset Lookup** — "Where is AF-000231?" or "Find MacBook Pro"',
    '• **My Assets** — "Show my assets" or "What\'s assigned to me?"',
    '• **Maintenance** — "Which assets need maintenance?" or "Show repair status"',
    '• **Health Scores** — "Show critical health assets" or "Which assets are at risk?"',
    '• **Analytics** — "How many assets do we have?" or "Show summary"',
    '• **Bookings** — "Is Conference Room A free?" or "Show available rooms"',
    '• **Recommendations** — "Suggest a laptop for me"',
    '\n💡 Just type naturally — I\'ll do my best to understand!',
  ].join('\n');
}

function respondAssetLookup(query: string, ctx: ChatContext): string {
  const assetId = extractAssetId(query);
  const searchTerm = extractSearchTerm(query).toLowerCase();

  let found: Asset | undefined;

  if (assetId) {
    found = ctx.assets.find(
      (a) => a.assetId.toUpperCase() === assetId,
    );
  }

  if (!found && searchTerm) {
    found = ctx.assets.find(
      (a) =>
        a.name.toLowerCase().includes(searchTerm) ||
        a.assetId.toLowerCase().includes(searchTerm) ||
        a.serialNumber.toLowerCase().includes(searchTerm),
    );
  }

  if (!found) {
    return `🔍 I couldn't find an asset matching "${assetId || searchTerm}". Try searching by asset tag (e.g., AF-000231), name, or serial number.`;
  }

  const owner = found.currentOwner ?? 'Unassigned';
  const statusEmoji: Record<string, string> = {
    Available: '🟢',
    Allocated: '🔵',
    'Under Maintenance': '🟠',
    Reserved: '🟡',
    Lost: '🔴',
    Retired: '⚪',
  };

  return [
    `📦 **${found.name}** (${found.assetId})\n`,
    `| Field | Value |`,
    `|-------|-------|`,
    `| Status | ${statusEmoji[found.status] ?? '⚪'} ${found.status} |`,
    `| Condition | ${found.condition} |`,
    `| Location | ${found.location} |`,
    `| Assigned To | ${owner} |`,
    `| Department | ${found.department} |`,
    `| Health | ${found.healthScore}/100 (${found.healthGrade}) |`,
    `| Purchase Price | $${found.purchasePrice.toLocaleString()} |`,
    `| Warranty | ${new Date(found.warrantyExpiry) > new Date() ? '✅ Active' : '❌ Expired'} |`,
  ].join('\n');
}

function respondMyAssets(ctx: ChatContext): string {
  const myAssets = ctx.assets.filter(
    (a) => a.currentOwnerId === ctx.currentUser.id,
  );

  if (myAssets.length === 0) {
    return `📋 You don't have any assets assigned to you currently, ${ctx.currentUser.name.split(' ')[0]}.`;
  }

  const lines = [
    `📋 **Your Assigned Assets** (${myAssets.length} total)\n`,
    `| # | Asset | Tag | Status | Health |`,
    `|---|-------|-----|--------|--------|`,
  ];

  myAssets.forEach((a, i) => {
    lines.push(
      `| ${i + 1} | ${a.name} | ${a.assetId} | ${a.status} | ${a.healthScore}/100 |`,
    );
  });

  return lines.join('\n');
}

function respondMaintenanceQuery(ctx: ChatContext): string {
  const underMaintenance = ctx.assets.filter(
    (a) => a.status === 'Under Maintenance',
  );

  if (underMaintenance.length === 0) {
    return '✅ Great news! No assets are currently under maintenance.';
  }

  const lines = [
    `🔧 **Assets Under Maintenance** (${underMaintenance.length})\n`,
    `| Asset | Tag | Condition | Location |`,
    `|-------|-----|-----------|----------|`,
  ];

  underMaintenance.slice(0, 10).forEach((a) => {
    lines.push(`| ${a.name} | ${a.assetId} | ${a.condition} | ${a.location} |`);
  });

  if (underMaintenance.length > 10) {
    lines.push(`\n_...and ${underMaintenance.length - 10} more._`);
  }

  return lines.join('\n');
}

function respondAnalyticsQuery(ctx: ChatContext): string {
  const total = ctx.assets.length;
  const statusCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  let totalValue = 0;

  ctx.assets.forEach((a) => {
    statusCounts[a.status] = (statusCounts[a.status] ?? 0) + 1;
    categoryCounts[a.category] = (categoryCounts[a.category] ?? 0) + 1;
    totalValue += a.purchasePrice;
  });

  const avgHealth =
    total > 0
      ? Math.round(
          ctx.assets.reduce((sum, a) => sum + a.healthScore, 0) / total,
        )
      : 0;

  const lines = [
    `📊 **Asset Analytics Overview**\n`,
    `| Metric | Value |`,
    `|--------|-------|`,
    `| Total Assets | ${total} |`,
    `| Total Value | $${totalValue.toLocaleString()} |`,
    `| Avg Health Score | ${avgHealth}/100 |`,
    `\n**By Status:**`,
  ];

  Object.entries(statusCounts)
    .sort(([, a], [, b]) => b - a)
    .forEach(([status, count]) => {
      lines.push(`• ${status}: ${count}`);
    });

  lines.push(`\n**By Category (top 5):**`);
  Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .forEach(([category, count]) => {
      lines.push(`• ${category}: ${count}`);
    });

  return lines.join('\n');
}

function respondHealthQuery(ctx: ChatContext): string {
  // Find assets with poor / critical health
  const critical = ctx.assets.filter((a) => a.healthScore < 30);
  const poor = ctx.assets.filter(
    (a) => a.healthScore >= 30 && a.healthScore < 50,
  );
  const atRisk = [...critical, ...poor].sort(
    (a, b) => a.healthScore - b.healthScore,
  );

  if (atRisk.length === 0) {
    return '✅ All assets are in healthy condition! No critical or poor health scores detected.';
  }

  const lines = [
    `🏥 **Assets Requiring Attention** (${atRisk.length} at risk)\n`,
    `| Asset | Tag | Health | Grade | Condition |`,
    `|-------|-----|--------|-------|-----------|`,
  ];

  atRisk.slice(0, 10).forEach((a) => {
    lines.push(
      `| ${a.name} | ${a.assetId} | ${a.healthScore}/100 | ${a.healthGrade} | ${a.condition} |`,
    );
  });

  if (atRisk.length > 10) {
    lines.push(`\n_...and ${atRisk.length - 10} more at-risk assets._`);
  }

  lines.push(
    `\n💡 **Tip:** Consider scheduling preventive maintenance for critical assets to avoid unplanned downtime.`,
  );

  return lines.join('\n');
}

function respondBookingQuery(query: string, ctx: ChatContext): string {
  if (!ctx.bookings || ctx.bookings.length === 0) {
    return '📅 No booking data is available right now. Please check the Booking module for room availability.';
  }

  // Try to extract a room name from the query
  const roomMatch = query.match(
    /(?:conference|meeting)\s+room\s+(\w+)/i,
  );
  const roomName = roomMatch?.[1];

  if (roomName) {
    const roomBookings = ctx.bookings.filter(
      (b) =>
        b.resourceName.toLowerCase().includes(roomName.toLowerCase()) &&
        b.status === 'Confirmed',
    );

    if (roomBookings.length === 0) {
      return `✅ **Conference Room ${roomName}** appears to be available! No confirmed bookings found.`;
    }

    const lines = [
      `📅 **Bookings for Conference Room ${roomName}:**\n`,
      `| Date | Time | Booked By | Title |`,
      `|------|------|-----------|-------|`,
    ];

    roomBookings.slice(0, 5).forEach((b) => {
      lines.push(
        `| ${b.date} | ${b.startTime}–${b.endTime} | ${b.bookedByName} | ${b.title} |`,
      );
    });

    return lines.join('\n');
  }

  // General booking overview
  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookings = ctx.bookings.filter(
    (b) => b.date === todayStr && b.status === 'Confirmed',
  );

  const lines = [
    `📅 **Today's Bookings** (${todayBookings.length} confirmed)\n`,
  ];

  if (todayBookings.length === 0) {
    lines.push('No bookings for today. All rooms appear to be free!');
  } else {
    lines.push(`| Room | Time | Booked By |`);
    lines.push(`|------|------|-----------|`);
    todayBookings.slice(0, 8).forEach((b) => {
      lines.push(
        `| ${b.resourceName} | ${b.startTime}–${b.endTime} | ${b.bookedByName} |`,
      );
    });
  }

  return lines.join('\n');
}

function respondRecommendationQuery(ctx: ChatContext): string {
  const available = ctx.assets.filter((a) => a.status === 'Available');

  if (available.length === 0) {
    return '😕 No assets are currently available for allocation. Check back later or contact the Asset Manager.';
  }

  // Show top available assets sorted by health
  const top = [...available]
    .sort((a, b) => b.healthScore - a.healthScore)
    .slice(0, 5);

  const lines = [
    `💡 **Top Available Assets for You:**\n`,
    `| # | Asset | Tag | Category | Health | Condition |`,
    `|---|-------|-----|----------|--------|-----------|`,
  ];

  top.forEach((a, i) => {
    lines.push(
      `| ${i + 1} | ${a.name} | ${a.assetId} | ${a.category} | ${a.healthScore}/100 | ${a.condition} |`,
    );
  });

  lines.push(
    `\n🎯 Visit the **Request** module to submit an allocation request, and our AI will provide detailed scoring for each option.`,
  );

  return lines.join('\n');
}

function respondStatusQuery(query: string, ctx: ChatContext): string {
  // Try to find a specific status mentioned
  const statuses = ['Available', 'Allocated', 'Under Maintenance', 'Reserved', 'Lost', 'Retired'];
  const mentioned = statuses.find((s) =>
    query.toLowerCase().includes(s.toLowerCase()),
  );

  if (mentioned) {
    const filtered = ctx.assets.filter((a) => a.status === mentioned);
    return [
      `📋 **${mentioned} Assets** (${filtered.length} total)\n`,
      ...filtered.slice(0, 8).map(
        (a, i) => `${i + 1}. **${a.name}** (${a.assetId}) — ${a.location}`,
      ),
      filtered.length > 8 ? `\n_...and ${filtered.length - 8} more._` : '',
    ].join('\n');
  }

  // General status overview
  const counts: Record<string, number> = {};
  ctx.assets.forEach((a) => {
    counts[a.status] = (counts[a.status] ?? 0) + 1;
  });

  const lines = [
    `📊 **Asset Status Overview:**\n`,
    ...Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([status, count]) => `• **${status}:** ${count} assets`),
  ];

  return lines.join('\n');
}

function respondUnknown(query: string): string {
  return [
    `🤔 I'm not sure I understand "${query}".`,
    '',
    'Try asking me things like:',
    '• "Where is AF-000231?"',
    '• "Show my assets"',
    '• "Which assets need maintenance?"',
    '• "Show critical health assets"',
    '• "How many assets do we have?"',
    '',
    'Type **help** for a full list of what I can do!',
  ].join('\n');
}

// ── Main Response Generator ───────────────────────────────────────────────────

/**
 * Processes a user query and generates a formatted response by searching
 * through the provided asset and employee data.
 *
 * @param query   - The user's natural language query
 * @param context - Data context: assets, employees, current user, bookings
 * @returns A formatted markdown-like response string
 */
export function generateResponse(
  query: string,
  context: {
    assets: Asset[];
    employees: Employee[];
    currentUser: Employee;
    bookings?: Booking[];
  },
): string {
  const intent = classifyIntent(query);

  switch (intent) {
    case 'greeting':
      return respondGreeting();
    case 'help':
      return respondHelp();
    case 'asset_lookup':
      return respondAssetLookup(query, context);
    case 'my_assets':
      return respondMyAssets(context);
    case 'maintenance_query':
      return respondMaintenanceQuery(context);
    case 'analytics_query':
      return respondAnalyticsQuery(context);
    case 'health_query':
      return respondHealthQuery(context);
    case 'booking_query':
      return respondBookingQuery(query, context);
    case 'recommendation_query':
      return respondRecommendationQuery(context);
    case 'status_query':
      return respondStatusQuery(query, context);
    case 'unknown':
    default:
      return respondUnknown(query);
  }
}

/**
 * Exported for testing / direct use — returns the detected intent
 * for a given query string.
 */
export function detectIntent(query: string): Intent {
  return classifyIntent(query);
}
