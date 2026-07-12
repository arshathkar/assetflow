// ============================================================
// AssetFlow AI — Type Definitions
// ============================================================

// --------------- Enums / Union Types ---------------

export type AssetStatus =
  | 'Available'
  | 'Allocated'
  | 'Under Maintenance'
  | 'Reserved'
  | 'Lost'
  | 'Retired';

export type AssetCondition = 'Excellent' | 'Good' | 'Fair' | 'Poor';

export type MaintenanceStatus =
  | 'Pending'
  | 'Approved'
  | 'Diagnosed'
  | 'In Progress'
  | 'Completed'
  | 'Rejected';

export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type IssueType = 'Hardware' | 'Software' | 'Cosmetic' | 'Other';

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected' | 'Fulfilled';

export type AuditItemStatus =
  | 'Pending'
  | 'Verified'
  | 'Missing'
  | 'Damaged'
  | 'Mislocated';

export type BookingStatus = 'Confirmed' | 'Cancelled' | 'Completed' | 'No-Show';

export type NotificationPriority = 'Low' | 'Normal' | 'High' | 'Urgent';

export type UserRole =
  | 'Admin'
  | 'Asset Manager'
  | 'Department Head'
  | 'Employee'
  | 'Auditor';

export type HealthGrade = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';

export type RiskTier = 'Low' | 'Medium' | 'High' | 'Critical';

// --------------- Core Entities ---------------

export interface Department {
  id: string;
  name: string;
  headId: string;
  employeeCount: number;
  assetCount: number;
  createdAt: string;
}

export interface Location {
  id: string;
  building: string;
  floor: string;
  room: string;
  fullPath: string;
}

export interface AssetCategory {
  id: string;
  name: string;
  icon: string;
  expectedLifespanYears: number;
  customFields: { name: string; type: string }[];
}

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  avatar: string;
  departmentId: string;
  department: string;
  roleId: string;
  role: UserRole;
  locationId: string;
  location: string;
  isActive: boolean;
  phone: string;
  joinDate: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  assetId: string;
  name: string;
  serialNumber: string;
  categoryId: string;
  category: string;
  categoryIcon: string;
  departmentId: string;
  department: string;
  locationId: string;
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  warrantyExpiry: string;
  condition: AssetCondition;
  status: AssetStatus;
  currentOwnerId: string | null;
  currentOwner: string | null;
  healthScore: number;
  healthGrade: HealthGrade;
  qrCodeUrl: string;
  notes: string;
  specs: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface AssetHistory {
  id: string;
  assetId: string;
  action: string;
  description: string;
  performedBy: string;
  timestamp: string;
}

export interface AssetRequest {
  id: string;
  requestId: string;
  requesterId: string;
  requesterName: string;
  requesterDepartment: string;
  categoryId: string;
  category: string;
  justification: string;
  urgency: 'Low' | 'Medium' | 'High';
  status: RequestStatus;
  approvals: Approval[];
  assignedAssetId: string | null;
  assignedAsset: string | null;
  expectedReturnDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Approval {
  id: string;
  approverId: string;
  approverName: string;
  approverRole: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  comment: string;
  timestamp: string;
}

export interface MaintenanceRequest {
  id: string;
  requestId: string;
  assetId: string;
  assetName: string;
  assetAssetId: string;
  reportedBy: string;
  reportedByName: string;
  assignedTo: string | null;
  assignedToName: string | null;
  issueType: IssueType;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  resolutionNotes: string;
  partsReplaced: { name: string; cost: number }[];
  totalCost: number;
  isAiPredicted: boolean;
  createdAt: string;
  resolvedAt: string | null;
  slaDeadline: string;
}

export interface SharedResource {
  id: string;
  name: string;
  type: 'Room' | 'Vehicle' | 'Equipment';
  location: string;
  capacity: number | null;
  amenities: string[];
  isActive: boolean;
}

export interface Booking {
  id: string;
  resourceId: string;
  resourceName: string;
  resourceType: string;
  bookedBy: string;
  bookedByName: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  isRecurring: boolean;
  createdAt: string;
}

export interface AuditCycle {
  id: string;
  name: string;
  scope: string;
  departmentId: string | null;
  department: string | null;
  status: 'Planning' | 'In Progress' | 'Completed';
  assignedAuditors: string[];
  totalAssets: number;
  verifiedCount: number;
  discrepancyCount: number;
  complianceScore: number;
  startDate: string;
  endDate: string | null;
  createdAt: string;
}

export interface AuditItem {
  id: string;
  auditCycleId: string;
  assetId: string;
  assetAssetId: string;
  assetName: string;
  expectedLocation: string;
  status: AuditItemStatus;
  auditorId: string | null;
  auditorName: string | null;
  comment: string;
  scannedAt: string | null;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  recipientId: string;
  priority: NotificationPriority;
  isRead: boolean;
  link: string;
  createdAt: string;
}

export interface AIPrediction {
  id: string;
  assetId: string;
  assetName: string;
  assetAssetId: string;
  overallRisk: number;
  riskTier: RiskTier;
  components: { name: string; risk: number }[];
  predictedFailureDays: number;
  likelyComponent: string;
  recommendation: string;
  createdAt: string;
}

export interface AIRecommendation {
  assetId: string;
  assetName: string;
  assetAssetId: string;
  score: number;
  factors: { name: string; score: number; detail: string }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
