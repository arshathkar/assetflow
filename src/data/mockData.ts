import type {
  Department,
  Location,
  AssetCategory,
  Employee,
  Asset,
  AssetHistory,
  AssetRequest,
  MaintenanceRequest,
  SharedResource,
  Booking,
  AuditCycle,
  AuditItem,
  Notification,
  AIPrediction,
} from '@/lib/types';

// ============================================================
// 1. DEPARTMENTS (6)
// ============================================================

export const departments: Department[] = [
  { id: 'dept-1', name: 'IT',          headId: 'emp-7',  employeeCount: 8,  assetCount: 18, createdAt: '2024-01-10T08:00:00Z' },
  { id: 'dept-2', name: 'HR',          headId: 'emp-8',  employeeCount: 5,  assetCount: 8,  createdAt: '2024-01-10T08:00:00Z' },
  { id: 'dept-3', name: 'Finance',     headId: 'emp-9',  employeeCount: 5,  assetCount: 7,  createdAt: '2024-01-10T08:00:00Z' },
  { id: 'dept-4', name: 'Marketing',   headId: 'emp-10', employeeCount: 4,  assetCount: 6,  createdAt: '2024-01-10T08:00:00Z' },
  { id: 'dept-5', name: 'Operations',  headId: 'emp-11', employeeCount: 4,  assetCount: 6,  createdAt: '2024-01-10T08:00:00Z' },
  { id: 'dept-6', name: 'Engineering', headId: 'emp-12', employeeCount: 4,  assetCount: 5,  createdAt: '2024-01-10T08:00:00Z' },
];

// ============================================================
// 2. LOCATIONS (8 across 2 buildings)
// ============================================================

export const locations: Location[] = [
  { id: 'loc-1', building: 'HQ Tower',      floor: '1st Floor', room: 'Room 101 – IT Lab',           fullPath: 'HQ Tower > 1st Floor > Room 101' },
  { id: 'loc-2', building: 'HQ Tower',      floor: '1st Floor', room: 'Room 102 – Server Room',      fullPath: 'HQ Tower > 1st Floor > Room 102' },
  { id: 'loc-3', building: 'HQ Tower',      floor: '2nd Floor', room: 'Room 201 – HR Office',        fullPath: 'HQ Tower > 2nd Floor > Room 201' },
  { id: 'loc-4', building: 'HQ Tower',      floor: '2nd Floor', room: 'Room 202 – Finance Wing',     fullPath: 'HQ Tower > 2nd Floor > Room 202' },
  { id: 'loc-5', building: 'HQ Tower',      floor: '3rd Floor', room: 'Room 301 – Executive Suite',  fullPath: 'HQ Tower > 3rd Floor > Room 301' },
  { id: 'loc-6', building: 'Annexe Block',  floor: 'Ground Floor', room: 'Room G01 – Marketing Hub', fullPath: 'Annexe Block > Ground Floor > Room G01' },
  { id: 'loc-7', building: 'Annexe Block',  floor: '1st Floor', room: 'Room A101 – Ops Center',      fullPath: 'Annexe Block > 1st Floor > Room A101' },
  { id: 'loc-8', building: 'Annexe Block',  floor: '2nd Floor', room: 'Room A201 – Engineering Lab', fullPath: 'Annexe Block > 2nd Floor > Room A201' },
];

// ============================================================
// 3. ASSET CATEGORIES (6)
// ============================================================

export const categories: AssetCategory[] = [
  {
    id: 'cat-1', name: 'Laptops', icon: '💻', expectedLifespanYears: 4,
    customFields: [
      { name: 'Processor', type: 'text' },
      { name: 'RAM', type: 'text' },
      { name: 'Storage', type: 'text' },
    ],
  },
  {
    id: 'cat-2', name: 'Monitors', icon: '🖥️', expectedLifespanYears: 6,
    customFields: [
      { name: 'Screen Size', type: 'text' },
      { name: 'Resolution', type: 'text' },
      { name: 'Panel Type', type: 'text' },
    ],
  },
  {
    id: 'cat-3', name: 'Projectors', icon: '📽️', expectedLifespanYears: 5,
    customFields: [
      { name: 'Lumens', type: 'number' },
      { name: 'Resolution', type: 'text' },
      { name: 'Throw Ratio', type: 'text' },
    ],
  },
  {
    id: 'cat-4', name: 'Vehicles', icon: '🚗', expectedLifespanYears: 8,
    customFields: [
      { name: 'Registration No', type: 'text' },
      { name: 'Fuel Type', type: 'text' },
      { name: 'Odometer (km)', type: 'number' },
    ],
  },
  {
    id: 'cat-5', name: 'Furniture', icon: '🪑', expectedLifespanYears: 10,
    customFields: [
      { name: 'Material', type: 'text' },
      { name: 'Color', type: 'text' },
      { name: 'Dimensions', type: 'text' },
    ],
  },
  {
    id: 'cat-6', name: 'Networking', icon: '🌐', expectedLifespanYears: 5,
    customFields: [
      { name: 'Ports', type: 'number' },
      { name: 'Speed', type: 'text' },
      { name: 'PoE Support', type: 'text' },
    ],
  },
];

// ============================================================
// 4. EMPLOYEES (30)
// ============================================================

export const employees: Employee[] = [
  // --- Admins (3) ---
  { id: 'emp-1',  employeeId: 'EMP-001', name: 'Arjun Mehta',        email: 'arjun.mehta@assetflow.in',        avatar: '👨‍💼', departmentId: 'dept-1', department: 'IT',          roleId: 'role-admin',     role: 'Admin',           locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', isActive: true,  phone: '+91 98450 10001', joinDate: '2023-03-15', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-2',  employeeId: 'EMP-002', name: 'Priya Sharma',       email: 'priya.sharma@assetflow.in',       avatar: '👩‍💼', departmentId: 'dept-1', department: 'IT',          roleId: 'role-admin',     role: 'Admin',           locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', isActive: true,  phone: '+91 98450 10002', joinDate: '2023-05-01', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-3',  employeeId: 'EMP-003', name: 'Vikram Reddy',       email: 'vikram.reddy@assetflow.in',       avatar: '👨‍💻', departmentId: 'dept-5', department: 'Operations',  roleId: 'role-admin',     role: 'Admin',           locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', isActive: true,  phone: '+91 98450 10003', joinDate: '2023-01-20', createdAt: '2024-01-10T08:00:00Z' },

  // --- Asset Managers (4) ---
  { id: 'emp-4',  employeeId: 'EMP-004', name: 'Neha Gupta',         email: 'neha.gupta@assetflow.in',         avatar: '👩‍🔧', departmentId: 'dept-1', department: 'IT',          roleId: 'role-am',        role: 'Asset Manager',   locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', isActive: true,  phone: '+91 98450 10004', joinDate: '2023-06-10', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-5',  employeeId: 'EMP-005', name: 'Rohit Desai',        email: 'rohit.desai@assetflow.in',        avatar: '👨‍🔧', departmentId: 'dept-5', department: 'Operations',  roleId: 'role-am',        role: 'Asset Manager',   locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', isActive: true,  phone: '+91 98450 10005', joinDate: '2023-07-22', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-6',  employeeId: 'EMP-006', name: 'Sunita Rao',         email: 'sunita.rao@assetflow.in',         avatar: '👩‍💼', departmentId: 'dept-3', department: 'Finance',     roleId: 'role-am',        role: 'Asset Manager',   locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  isActive: true,  phone: '+91 98450 10006', joinDate: '2023-04-18', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-30', employeeId: 'EMP-030', name: 'Karthik Nair',       email: 'karthik.nair@assetflow.in',       avatar: '👨‍🔧', departmentId: 'dept-6', department: 'Engineering', roleId: 'role-am',        role: 'Asset Manager',   locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', isActive: true,  phone: '+91 98450 10030', joinDate: '2024-02-05', createdAt: '2024-02-05T08:00:00Z' },

  // --- Department Heads (6) ---
  { id: 'emp-7',  employeeId: 'EMP-007', name: 'Rajesh Iyer',        email: 'rajesh.iyer@assetflow.in',        avatar: '👨‍💼', departmentId: 'dept-1', department: 'IT',          roleId: 'role-dh',        role: 'Department Head', locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', isActive: true,  phone: '+91 98450 10007', joinDate: '2022-08-01', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-8',  employeeId: 'EMP-008', name: 'Ananya Pillai',      email: 'ananya.pillai@assetflow.in',      avatar: '👩‍💼', departmentId: 'dept-2', department: 'HR',          roleId: 'role-dh',        role: 'Department Head', locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  isActive: true,  phone: '+91 98450 10008', joinDate: '2022-06-15', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-9',  employeeId: 'EMP-009', name: 'Deepak Joshi',       email: 'deepak.joshi@assetflow.in',       avatar: '👨‍💼', departmentId: 'dept-3', department: 'Finance',     roleId: 'role-dh',        role: 'Department Head', locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  isActive: true,  phone: '+91 98450 10009', joinDate: '2022-09-10', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-10', employeeId: 'EMP-010', name: 'Kavitha Menon',      email: 'kavitha.menon@assetflow.in',      avatar: '👩‍💼', departmentId: 'dept-4', department: 'Marketing',   roleId: 'role-dh',        role: 'Department Head', locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', isActive: true,  phone: '+91 98450 10010', joinDate: '2022-11-01', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-11', employeeId: 'EMP-011', name: 'Suresh Patil',       email: 'suresh.patil@assetflow.in',       avatar: '👨‍💼', departmentId: 'dept-5', department: 'Operations',  roleId: 'role-dh',        role: 'Department Head', locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', isActive: true,  phone: '+91 98450 10011', joinDate: '2022-07-20', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-12', employeeId: 'EMP-012', name: 'Meera Krishnan',     email: 'meera.krishnan@assetflow.in',     avatar: '👩‍💼', departmentId: 'dept-6', department: 'Engineering', roleId: 'role-dh',        role: 'Department Head', locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', isActive: true,  phone: '+91 98450 10012', joinDate: '2022-10-05', createdAt: '2024-01-10T08:00:00Z' },

  // --- Employees (15) ---
  { id: 'emp-13', employeeId: 'EMP-013', name: 'Aditya Banerjee',    email: 'aditya.banerjee@assetflow.in',    avatar: '👨‍💻', departmentId: 'dept-1', department: 'IT',          roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', isActive: true,  phone: '+91 98450 10013', joinDate: '2024-02-01', createdAt: '2024-02-01T08:00:00Z' },
  { id: 'emp-14', employeeId: 'EMP-014', name: 'Shruti Agarwal',     email: 'shruti.agarwal@assetflow.in',     avatar: '👩‍💻', departmentId: 'dept-1', department: 'IT',          roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', isActive: true,  phone: '+91 98450 10014', joinDate: '2024-03-15', createdAt: '2024-03-15T08:00:00Z' },
  { id: 'emp-15', employeeId: 'EMP-015', name: 'Manish Tiwari',      email: 'manish.tiwari@assetflow.in',      avatar: '👨‍💻', departmentId: 'dept-1', department: 'IT',          roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-2', location: 'HQ Tower > 1st Floor > Room 102', isActive: true,  phone: '+91 98450 10015', joinDate: '2024-01-20', createdAt: '2024-01-20T08:00:00Z' },
  { id: 'emp-16', employeeId: 'EMP-016', name: 'Divya Kulkarni',     email: 'divya.kulkarni@assetflow.in',     avatar: '👩‍💻', departmentId: 'dept-2', department: 'HR',          roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  isActive: true,  phone: '+91 98450 10016', joinDate: '2024-04-10', createdAt: '2024-04-10T08:00:00Z' },
  { id: 'emp-17', employeeId: 'EMP-017', name: 'Sanjay Verma',       email: 'sanjay.verma@assetflow.in',       avatar: '👨‍💻', departmentId: 'dept-2', department: 'HR',          roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  isActive: true,  phone: '+91 98450 10017', joinDate: '2024-05-05', createdAt: '2024-05-05T08:00:00Z' },
  { id: 'emp-18', employeeId: 'EMP-018', name: 'Pooja Singh',        email: 'pooja.singh@assetflow.in',        avatar: '👩‍💻', departmentId: 'dept-3', department: 'Finance',     roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  isActive: true,  phone: '+91 98450 10018', joinDate: '2024-02-28', createdAt: '2024-02-28T08:00:00Z' },
  { id: 'emp-19', employeeId: 'EMP-019', name: 'Amit Choudhury',     email: 'amit.choudhury@assetflow.in',     avatar: '👨‍💻', departmentId: 'dept-3', department: 'Finance',     roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  isActive: true,  phone: '+91 98450 10019', joinDate: '2024-06-01', createdAt: '2024-06-01T08:00:00Z' },
  { id: 'emp-20', employeeId: 'EMP-020', name: 'Lakshmi Venkatesh',  email: 'lakshmi.v@assetflow.in',          avatar: '👩‍💻', departmentId: 'dept-4', department: 'Marketing',   roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', isActive: true,  phone: '+91 98450 10020', joinDate: '2024-03-20', createdAt: '2024-03-20T08:00:00Z' },
  { id: 'emp-21', employeeId: 'EMP-021', name: 'Gaurav Saxena',      email: 'gaurav.saxena@assetflow.in',      avatar: '👨‍💻', departmentId: 'dept-4', department: 'Marketing',   roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', isActive: true,  phone: '+91 98450 10021', joinDate: '2024-07-15', createdAt: '2024-07-15T08:00:00Z' },
  { id: 'emp-22', employeeId: 'EMP-022', name: 'Ravi Shankar',       email: 'ravi.shankar@assetflow.in',       avatar: '👨‍💻', departmentId: 'dept-5', department: 'Operations',  roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', isActive: true,  phone: '+91 98450 10022', joinDate: '2024-01-15', createdAt: '2024-01-15T08:00:00Z' },
  { id: 'emp-23', employeeId: 'EMP-023', name: 'Nandini Hegde',      email: 'nandini.hegde@assetflow.in',      avatar: '👩‍💻', departmentId: 'dept-5', department: 'Operations',  roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', isActive: false, phone: '+91 98450 10023', joinDate: '2024-04-25', createdAt: '2024-04-25T08:00:00Z' },
  { id: 'emp-24', employeeId: 'EMP-024', name: 'Tarun Bhatt',        email: 'tarun.bhatt@assetflow.in',        avatar: '👨‍💻', departmentId: 'dept-6', department: 'Engineering', roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', isActive: true,  phone: '+91 98450 10024', joinDate: '2024-05-18', createdAt: '2024-05-18T08:00:00Z' },
  { id: 'emp-25', employeeId: 'EMP-025', name: 'Swathi Raghavan',    email: 'swathi.r@assetflow.in',           avatar: '👩‍💻', departmentId: 'dept-6', department: 'Engineering', roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', isActive: true,  phone: '+91 98450 10025', joinDate: '2024-06-22', createdAt: '2024-06-22T08:00:00Z' },
  { id: 'emp-26', employeeId: 'EMP-026', name: 'Harish Malhotra',    email: 'harish.malhotra@assetflow.in',    avatar: '👨‍💻', departmentId: 'dept-2', department: 'HR',          roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  isActive: true,  phone: '+91 98450 10026', joinDate: '2024-08-01', createdAt: '2024-08-01T08:00:00Z' },
  { id: 'emp-27', employeeId: 'EMP-027', name: 'Isha Deshpande',     email: 'isha.deshpande@assetflow.in',     avatar: '👩‍💻', departmentId: 'dept-3', department: 'Finance',     roleId: 'role-emp',       role: 'Employee',        locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  isActive: true,  phone: '+91 98450 10027', joinDate: '2024-09-10', createdAt: '2024-09-10T08:00:00Z' },

  // --- Auditors (2) ---
  { id: 'emp-28', employeeId: 'EMP-028', name: 'Prakash Srinivasan', email: 'prakash.s@assetflow.in',          avatar: '🔍',   departmentId: 'dept-3', department: 'Finance',     roleId: 'role-auditor',   role: 'Auditor',         locationId: 'loc-5', location: 'HQ Tower > 3rd Floor > Room 301',  isActive: true,  phone: '+91 98450 10028', joinDate: '2023-11-01', createdAt: '2024-01-10T08:00:00Z' },
  { id: 'emp-29', employeeId: 'EMP-029', name: 'Radhika Kapoor',     email: 'radhika.kapoor@assetflow.in',     avatar: '🔍',   departmentId: 'dept-5', department: 'Operations',  roleId: 'role-auditor',   role: 'Auditor',         locationId: 'loc-5', location: 'HQ Tower > 3rd Floor > Room 301',  isActive: true,  phone: '+91 98450 10029', joinDate: '2024-01-05', createdAt: '2024-01-10T08:00:00Z' },
];

// ============================================================
// 5. ASSETS (50)
// ============================================================

export const assets: Asset[] = [
  // ---- Laptops (15) ----
  { id: 'asset-1',  assetId: 'AF-000001', name: 'Dell Latitude 7440',        serialNumber: 'DL7440-A1B2C3',  categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-01-15', purchasePrice: 115000, warrantyExpiry: '2027-01-15', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-1',  currentOwner: 'Arjun Mehta',      healthScore: 94, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000001', notes: 'Primary admin workstation',                   specs: { Processor: 'Intel i7-1365U', RAM: '16 GB DDR5', Storage: '512 GB NVMe SSD' }, createdAt: '2024-01-15T10:00:00Z', updatedAt: '2026-06-20T09:30:00Z' },
  { id: 'asset-2',  assetId: 'AF-000002', name: 'MacBook Pro 16 M3',         serialNumber: 'FVFG2024MBP16',  categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-6', department: 'Engineering', locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', purchaseDate: '2024-03-20', purchasePrice: 249900, warrantyExpiry: '2027-03-20', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-12', currentOwner: 'Meera Krishnan',   healthScore: 97, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000002', notes: 'Engineering dept head machine',               specs: { Processor: 'Apple M3 Pro', RAM: '36 GB Unified', Storage: '1 TB SSD' }, createdAt: '2024-03-20T10:00:00Z', updatedAt: '2026-06-18T14:15:00Z' },
  { id: 'asset-3',  assetId: 'AF-000003', name: 'HP EliteBook 840 G10',      serialNumber: 'HP840G10-X7Y8Z9',categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-2', department: 'HR',          locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  purchaseDate: '2024-02-10', purchasePrice: 98000,  warrantyExpiry: '2027-02-10', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-8',  currentOwner: 'Ananya Pillai',    healthScore: 82, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000003', notes: '',                                            specs: { Processor: 'Intel i5-1345U', RAM: '16 GB DDR5', Storage: '512 GB SSD' }, createdAt: '2024-02-10T10:00:00Z', updatedAt: '2026-05-12T11:00:00Z' },
  { id: 'asset-4',  assetId: 'AF-000004', name: 'Lenovo ThinkPad X1 Carbon',  serialNumber: 'LNV-X1C-G11-001',categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-3', department: 'Finance',     locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  purchaseDate: '2024-04-05', purchasePrice: 142000, warrantyExpiry: '2027-04-05', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-9',  currentOwner: 'Deepak Joshi',     healthScore: 91, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000004', notes: 'Finance head primary device',                 specs: { Processor: 'Intel i7-1365U', RAM: '32 GB DDR5', Storage: '1 TB SSD' }, createdAt: '2024-04-05T10:00:00Z', updatedAt: '2026-06-01T08:45:00Z' },
  { id: 'asset-5',  assetId: 'AF-000005', name: 'Dell Latitude 5540',        serialNumber: 'DL5540-D4E5F6',  categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-4', department: 'Marketing',   locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', purchaseDate: '2024-05-18', purchasePrice: 85000,  warrantyExpiry: '2027-05-18', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-10', currentOwner: 'Kavitha Menon',    healthScore: 78, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000005', notes: '',                                            specs: { Processor: 'Intel i5-1345U', RAM: '16 GB DDR5', Storage: '256 GB SSD' }, createdAt: '2024-05-18T10:00:00Z', updatedAt: '2026-04-22T16:00:00Z' },
  { id: 'asset-6',  assetId: 'AF-000006', name: 'MacBook Air M2',            serialNumber: 'FVFG2024MBA-002',categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-4', department: 'Marketing',   locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', purchaseDate: '2024-06-10', purchasePrice: 114900, warrantyExpiry: '2027-06-10', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-20', currentOwner: 'Lakshmi Venkatesh',healthScore: 96, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000006', notes: 'Design team',                                 specs: { Processor: 'Apple M2', RAM: '16 GB Unified', Storage: '512 GB SSD' }, createdAt: '2024-06-10T10:00:00Z', updatedAt: '2026-06-10T10:00:00Z' },
  { id: 'asset-7',  assetId: 'AF-000007', name: 'HP ProBook 450 G10',        serialNumber: 'HP450G10-J1K2L3',categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-01-20', purchasePrice: 72000,  warrantyExpiry: '2027-01-20', condition: 'Fair',      status: 'Under Maintenance',  currentOwnerId: 'emp-13', currentOwner: 'Aditya Banerjee',  healthScore: 52, healthGrade: 'Fair',      qrCodeUrl: '/qr/AF-000007', notes: 'Battery swelling reported',                   specs: { Processor: 'Intel i5-1335U', RAM: '8 GB DDR4', Storage: '256 GB SSD' }, createdAt: '2024-01-20T10:00:00Z', updatedAt: '2026-07-01T12:30:00Z' },
  { id: 'asset-8',  assetId: 'AF-000008', name: 'Lenovo IdeaPad Slim 5',     serialNumber: 'LNV-IPS5-2024-A',categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-2', department: 'HR',          locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  purchaseDate: '2024-07-01', purchasePrice: 65000,  warrantyExpiry: '2027-07-01', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-16', currentOwner: 'Divya Kulkarni',   healthScore: 84, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000008', notes: '',                                            specs: { Processor: 'AMD Ryzen 5 7530U', RAM: '16 GB DDR5', Storage: '512 GB SSD' }, createdAt: '2024-07-01T10:00:00Z', updatedAt: '2026-06-15T09:00:00Z' },
  { id: 'asset-9',  assetId: 'AF-000009', name: 'Dell Latitude 7440',        serialNumber: 'DL7440-M3N4O5',  categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-5', department: 'Operations',  locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', purchaseDate: '2024-03-01', purchasePrice: 115000, warrantyExpiry: '2027-03-01', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-22', currentOwner: 'Ravi Shankar',     healthScore: 79, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000009', notes: '',                                            specs: { Processor: 'Intel i7-1365U', RAM: '16 GB DDR5', Storage: '512 GB NVMe SSD' }, createdAt: '2024-03-01T10:00:00Z', updatedAt: '2026-05-28T14:00:00Z' },
  { id: 'asset-10', assetId: 'AF-000010', name: 'ASUS ZenBook 14 OLED',      serialNumber: 'ASUS-ZB14-P6Q7', categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-6', department: 'Engineering', locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', purchaseDate: '2024-08-15', purchasePrice: 99990,  warrantyExpiry: '2027-08-15', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-24', currentOwner: 'Tarun Bhatt',      healthScore: 92, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000010', notes: '',                                            specs: { Processor: 'Intel i7-1360P', RAM: '16 GB LPDDR5', Storage: '512 GB SSD' }, createdAt: '2024-08-15T10:00:00Z', updatedAt: '2026-06-22T11:15:00Z' },
  { id: 'asset-11', assetId: 'AF-000011', name: 'Acer Aspire 5 A515',        serialNumber: 'ACER-A515-R8S9', categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-02-25', purchasePrice: 54990,  warrantyExpiry: '2026-02-25', condition: 'Poor',      status: 'Retired',            currentOwnerId: null,      currentOwner: null,               healthScore: 28, healthGrade: 'Poor',      qrCodeUrl: '/qr/AF-000011', notes: 'Keyboard failure, decommissioned',            specs: { Processor: 'Intel i3-1215U', RAM: '8 GB DDR4', Storage: '256 GB SSD' }, createdAt: '2024-02-25T10:00:00Z', updatedAt: '2026-03-10T09:00:00Z' },
  { id: 'asset-12', assetId: 'AF-000012', name: 'Dell Inspiron 15 3520',     serialNumber: 'DL3520-T0U1V2',  categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-09-01', purchasePrice: 48500,  warrantyExpiry: '2026-09-01', condition: 'Good',      status: 'Available',          currentOwnerId: null,      currentOwner: null,               healthScore: 88, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000012', notes: 'Spare laptop pool',                           specs: { Processor: 'Intel i5-1235U', RAM: '8 GB DDR4', Storage: '512 GB SSD' }, createdAt: '2024-09-01T10:00:00Z', updatedAt: '2026-06-30T15:45:00Z' },
  { id: 'asset-13', assetId: 'AF-000013', name: 'MacBook Pro 14 M3',         serialNumber: 'FVFG2024MBP14A', categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-6', department: 'Engineering', locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', purchaseDate: '2024-04-20', purchasePrice: 199900, warrantyExpiry: '2027-04-20', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-25', currentOwner: 'Swathi Raghavan',  healthScore: 95, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000013', notes: '',                                            specs: { Processor: 'Apple M3 Pro', RAM: '18 GB Unified', Storage: '512 GB SSD' }, createdAt: '2024-04-20T10:00:00Z', updatedAt: '2026-06-05T10:00:00Z' },
  { id: 'asset-14', assetId: 'AF-000014', name: 'HP EliteBook 860 G10',      serialNumber: 'HP860G10-W3X4Y5',categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-3', department: 'Finance',     locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  purchaseDate: '2024-05-25', purchasePrice: 108000, warrantyExpiry: '2027-05-25', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-18', currentOwner: 'Pooja Singh',      healthScore: 80, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000014', notes: '',                                            specs: { Processor: 'Intel i7-1365U', RAM: '16 GB DDR5', Storage: '512 GB SSD' }, createdAt: '2024-05-25T10:00:00Z', updatedAt: '2026-05-20T13:30:00Z' },
  { id: 'asset-15', assetId: 'AF-000015', name: 'Dell Latitude 5440',        serialNumber: 'DL5440-Z6A7B8',  categoryId: 'cat-1', category: 'Laptops',  categoryIcon: '💻', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-10-10', purchasePrice: 82000,  warrantyExpiry: '2027-10-10', condition: 'Excellent', status: 'Reserved',           currentOwnerId: null,      currentOwner: null,               healthScore: 99, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000015', notes: 'Reserved for upcoming hire',                  specs: { Processor: 'Intel i5-1345U', RAM: '16 GB DDR5', Storage: '512 GB SSD' }, createdAt: '2024-10-10T10:00:00Z', updatedAt: '2026-07-05T08:00:00Z' },

  // ---- Monitors (10) ----
  { id: 'asset-16', assetId: 'AF-000016', name: 'LG UltraWide 34WN80C',      serialNumber: 'LG34WN-C8D9E0',  categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-6', department: 'Engineering', locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', purchaseDate: '2024-03-10', purchasePrice: 52000,  warrantyExpiry: '2027-03-10', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-12', currentOwner: 'Meera Krishnan',   healthScore: 93, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000016', notes: 'Dual monitor setup – primary',                specs: { 'Screen Size': '34 inch', Resolution: '3440x1440', 'Panel Type': 'IPS' }, createdAt: '2024-03-10T10:00:00Z', updatedAt: '2026-06-18T14:15:00Z' },
  { id: 'asset-17', assetId: 'AF-000017', name: 'Dell UltraSharp U2723QE',   serialNumber: 'DLU2723-F1G2H3', categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-01-15', purchasePrice: 48000,  warrantyExpiry: '2027-01-15', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-1',  currentOwner: 'Arjun Mehta',      healthScore: 95, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000017', notes: '',                                            specs: { 'Screen Size': '27 inch', Resolution: '3840x2160', 'Panel Type': 'IPS Black' }, createdAt: '2024-01-15T10:00:00Z', updatedAt: '2026-06-20T09:30:00Z' },
  { id: 'asset-18', assetId: 'AF-000018', name: 'Samsung Odyssey G5 27"',    serialNumber: 'SAM-OG5-I4J5K6', categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-4', department: 'Marketing',   locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', purchaseDate: '2024-05-20', purchasePrice: 24000,  warrantyExpiry: '2027-05-20', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-21', currentOwner: 'Gaurav Saxena',    healthScore: 85, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000018', notes: '',                                            specs: { 'Screen Size': '27 inch', Resolution: '2560x1440', 'Panel Type': 'VA' }, createdAt: '2024-05-20T10:00:00Z', updatedAt: '2026-05-10T10:00:00Z' },
  { id: 'asset-19', assetId: 'AF-000019', name: 'BenQ GW2480',               serialNumber: 'BNQ-GW2480-L7M8',categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-2', department: 'HR',          locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  purchaseDate: '2024-02-15', purchasePrice: 12500,  warrantyExpiry: '2027-02-15', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-17', currentOwner: 'Sanjay Verma',     healthScore: 82, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000019', notes: '',                                            specs: { 'Screen Size': '24 inch', Resolution: '1920x1080', 'Panel Type': 'IPS' }, createdAt: '2024-02-15T10:00:00Z', updatedAt: '2026-04-18T09:00:00Z' },
  { id: 'asset-20', assetId: 'AF-000020', name: 'Dell P2422H',               serialNumber: 'DLP2422-N9O0P1', categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-3', department: 'Finance',     locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  purchaseDate: '2024-04-10', purchasePrice: 16800,  warrantyExpiry: '2027-04-10', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-19', currentOwner: 'Amit Choudhury',   healthScore: 86, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000020', notes: '',                                            specs: { 'Screen Size': '24 inch', Resolution: '1920x1080', 'Panel Type': 'IPS' }, createdAt: '2024-04-10T10:00:00Z', updatedAt: '2026-06-01T10:00:00Z' },
  { id: 'asset-21', assetId: 'AF-000021', name: 'LG 27UK850-W',              serialNumber: 'LG27UK-Q2R3S4',  categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-06-05', purchasePrice: 38000,  warrantyExpiry: '2027-06-05', condition: 'Fair',      status: 'Under Maintenance',  currentOwnerId: 'emp-14', currentOwner: 'Shruti Agarwal',   healthScore: 55, healthGrade: 'Fair',      qrCodeUrl: '/qr/AF-000021', notes: 'Intermittent display flickering',              specs: { 'Screen Size': '27 inch', Resolution: '3840x2160', 'Panel Type': 'IPS' }, createdAt: '2024-06-05T10:00:00Z', updatedAt: '2026-07-02T10:00:00Z' },
  { id: 'asset-22', assetId: 'AF-000022', name: 'HP E24 G5',                 serialNumber: 'HPE24G5-T5U6V7', categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-5', department: 'Operations',  locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', purchaseDate: '2024-03-25', purchasePrice: 14500,  warrantyExpiry: '2027-03-25', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-5',  currentOwner: 'Rohit Desai',      healthScore: 87, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000022', notes: '',                                            specs: { 'Screen Size': '24 inch', Resolution: '1920x1080', 'Panel Type': 'IPS' }, createdAt: '2024-03-25T10:00:00Z', updatedAt: '2026-05-30T09:15:00Z' },
  { id: 'asset-23', assetId: 'AF-000023', name: 'ASUS ProArt PA278QV',       serialNumber: 'ASUS-PA278-W8X9',categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-6', department: 'Engineering', locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', purchaseDate: '2024-08-20', purchasePrice: 32000,  warrantyExpiry: '2027-08-20', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-25', currentOwner: 'Swathi Raghavan',  healthScore: 96, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000023', notes: 'Colour-calibrated for design',                specs: { 'Screen Size': '27 inch', Resolution: '2560x1440', 'Panel Type': 'IPS' }, createdAt: '2024-08-20T10:00:00Z', updatedAt: '2026-06-22T11:15:00Z' },
  { id: 'asset-24', assetId: 'AF-000024', name: 'AOC 24B2XH',               serialNumber: 'AOC-24B2-Y0Z1A2',categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-11-01', purchasePrice: 9500,   warrantyExpiry: '2027-11-01', condition: 'Excellent', status: 'Available',          currentOwnerId: null,      currentOwner: null,               healthScore: 100,healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000024', notes: 'Spare monitor',                               specs: { 'Screen Size': '24 inch', Resolution: '1920x1080', 'Panel Type': 'IPS' }, createdAt: '2024-11-01T10:00:00Z', updatedAt: '2026-07-01T08:00:00Z' },
  { id: 'asset-25', assetId: 'AF-000025', name: 'ViewSonic VA2732-MHD',      serialNumber: 'VS-VA2732-B3C4', categoryId: 'cat-2', category: 'Monitors', categoryIcon: '🖥️', departmentId: 'dept-2', department: 'HR',          locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  purchaseDate: '2024-07-15', purchasePrice: 11200,  warrantyExpiry: '2027-07-15', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-26', currentOwner: 'Harish Malhotra',  healthScore: 88, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000025', notes: '',                                            specs: { 'Screen Size': '27 inch', Resolution: '1920x1080', 'Panel Type': 'IPS' }, createdAt: '2024-07-15T10:00:00Z', updatedAt: '2026-06-28T09:00:00Z' },

  // ---- Projectors (5) ----
  { id: 'asset-26', assetId: 'AF-000026', name: 'BenQ MH535',                serialNumber: 'BNQ-MH535-D5E6', categoryId: 'cat-3', category: 'Projectors', categoryIcon: '📽️', departmentId: 'dept-4', department: 'Marketing',   locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', purchaseDate: '2024-02-20', purchasePrice: 45000,  warrantyExpiry: '2026-02-20', condition: 'Good',      status: 'Available',          currentOwnerId: null,      currentOwner: null,               healthScore: 74, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000026', notes: 'Lamp hours: 2100/5000',                       specs: { Lumens: '3600', Resolution: '1920x1080', 'Throw Ratio': '1.15–1.5:1' }, createdAt: '2024-02-20T10:00:00Z', updatedAt: '2026-06-15T16:00:00Z' },
  { id: 'asset-27', assetId: 'AF-000027', name: 'Epson EB-X51',              serialNumber: 'EPS-EBX51-F7G8', categoryId: 'cat-3', category: 'Projectors', categoryIcon: '📽️', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-5', location: 'HQ Tower > 3rd Floor > Room 301',  purchaseDate: '2024-01-10', purchasePrice: 38000,  warrantyExpiry: '2026-01-10', condition: 'Fair',      status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 58, healthGrade: 'Fair',      qrCodeUrl: '/qr/AF-000027', notes: 'Boardroom projector – lamp nearing end',      specs: { Lumens: '3800', Resolution: '1024x768',  'Throw Ratio': '1.48–1.77:1' }, createdAt: '2024-01-10T10:00:00Z', updatedAt: '2026-07-05T11:00:00Z' },
  { id: 'asset-28', assetId: 'AF-000028', name: 'ViewSonic PX701-4K',        serialNumber: 'VS-PX701-H9I0',  categoryId: 'cat-3', category: 'Projectors', categoryIcon: '📽️', departmentId: 'dept-5', department: 'Operations',  locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', purchaseDate: '2024-06-15', purchasePrice: 82000,  warrantyExpiry: '2027-06-15', condition: 'Excellent', status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 91, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000028', notes: 'Conference room A – 4K presentations',       specs: { Lumens: '3200', Resolution: '3840x2160', 'Throw Ratio': '1.5–1.65:1' }, createdAt: '2024-06-15T10:00:00Z', updatedAt: '2026-06-10T14:00:00Z' },
  { id: 'asset-29', assetId: 'AF-000029', name: 'BenQ MW560',                serialNumber: 'BNQ-MW560-J1K2', categoryId: 'cat-3', category: 'Projectors', categoryIcon: '📽️', departmentId: 'dept-2', department: 'HR',          locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  purchaseDate: '2024-08-05', purchasePrice: 35000,  warrantyExpiry: '2027-08-05', condition: 'Good',      status: 'Available',          currentOwnerId: null,      currentOwner: null,               healthScore: 89, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000029', notes: 'Training room projector',                     specs: { Lumens: '4000', Resolution: '1280x800',  'Throw Ratio': '1.55–1.7:1' }, createdAt: '2024-08-05T10:00:00Z', updatedAt: '2026-06-25T09:30:00Z' },
  { id: 'asset-30', assetId: 'AF-000030', name: 'Optoma HD146X',             serialNumber: 'OPT-HD146X-L3M4',categoryId: 'cat-3', category: 'Projectors', categoryIcon: '📽️', departmentId: 'dept-3', department: 'Finance',     locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  purchaseDate: '2024-09-12', purchasePrice: 55000,  warrantyExpiry: '2027-09-12', condition: 'Excellent', status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 94, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000030', notes: '',                                            specs: { Lumens: '3600', Resolution: '1920x1080', 'Throw Ratio': '1.47–1.62:1' }, createdAt: '2024-09-12T10:00:00Z', updatedAt: '2026-06-28T14:00:00Z' },

  // ---- Vehicles (5) ----
  { id: 'asset-31', assetId: 'AF-000031', name: 'Toyota Innova Crysta',      serialNumber: 'TN-09-AB-1234',  categoryId: 'cat-4', category: 'Vehicles', categoryIcon: '🚗', departmentId: 'dept-5', department: 'Operations',  locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', purchaseDate: '2024-02-01', purchasePrice: 2250000,warrantyExpiry: '2027-02-01', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-11', currentOwner: 'Suresh Patil',     healthScore: 76, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000031', notes: 'Official transport – CEO',                    specs: { 'Registration No': 'TN-09-AB-1234', 'Fuel Type': 'Diesel', 'Odometer (km)': '45200' }, createdAt: '2024-02-01T10:00:00Z', updatedAt: '2026-07-01T08:00:00Z' },
  { id: 'asset-32', assetId: 'AF-000032', name: 'Maruti Suzuki Ertiga',      serialNumber: 'KA-01-CD-5678',  categoryId: 'cat-4', category: 'Vehicles', categoryIcon: '🚗', departmentId: 'dept-5', department: 'Operations',  locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', purchaseDate: '2024-04-15', purchasePrice: 1120000,warrantyExpiry: '2027-04-15', condition: 'Good',      status: 'Available',          currentOwnerId: null,      currentOwner: null,               healthScore: 81, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000032', notes: 'Pool vehicle',                                specs: { 'Registration No': 'KA-01-CD-5678', 'Fuel Type': 'CNG + Petrol', 'Odometer (km)': '28300' }, createdAt: '2024-04-15T10:00:00Z', updatedAt: '2026-06-20T10:00:00Z' },
  { id: 'asset-33', assetId: 'AF-000033', name: 'Hyundai Creta SX',          serialNumber: 'MH-12-EF-9012',  categoryId: 'cat-4', category: 'Vehicles', categoryIcon: '🚗', departmentId: 'dept-4', department: 'Marketing',   locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', purchaseDate: '2024-07-20', purchasePrice: 1680000,warrantyExpiry: '2027-07-20', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-10', currentOwner: 'Kavitha Menon',    healthScore: 90, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000033', notes: 'Marketing field visits',                      specs: { 'Registration No': 'MH-12-EF-9012', 'Fuel Type': 'Diesel', 'Odometer (km)': '15800' }, createdAt: '2024-07-20T10:00:00Z', updatedAt: '2026-06-28T12:00:00Z' },
  { id: 'asset-34', assetId: 'AF-000034', name: 'Tata Nexon EV Prime',       serialNumber: 'DL-04-GH-3456',  categoryId: 'cat-4', category: 'Vehicles', categoryIcon: '🚗', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-10-01', purchasePrice: 1490000,warrantyExpiry: '2032-10-01', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-7',  currentOwner: 'Rajesh Iyer',      healthScore: 98, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000034', notes: 'EV – green initiative',                       specs: { 'Registration No': 'DL-04-GH-3456', 'Fuel Type': 'Electric', 'Odometer (km)': '8200' }, createdAt: '2024-10-01T10:00:00Z', updatedAt: '2026-07-05T09:00:00Z' },
  { id: 'asset-35', assetId: 'AF-000035', name: 'Mahindra Bolero Neo',       serialNumber: 'TN-22-IJ-7890',  categoryId: 'cat-4', category: 'Vehicles', categoryIcon: '🚗', departmentId: 'dept-5', department: 'Operations',  locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', purchaseDate: '2024-03-10', purchasePrice: 980000, warrantyExpiry: '2027-03-10', condition: 'Fair',      status: 'Under Maintenance',  currentOwnerId: null,      currentOwner: null,               healthScore: 48, healthGrade: 'Fair',      qrCodeUrl: '/qr/AF-000035', notes: 'Transmission issue reported',                 specs: { 'Registration No': 'TN-22-IJ-7890', 'Fuel Type': 'Diesel', 'Odometer (km)': '62500' }, createdAt: '2024-03-10T10:00:00Z', updatedAt: '2026-07-08T14:30:00Z' },

  // ---- Furniture (8) ----
  { id: 'asset-36', assetId: 'AF-000036', name: 'Herman Miller Aeron Chair', serialNumber: 'HM-AERON-001',   categoryId: 'cat-5', category: 'Furniture', categoryIcon: '🪑', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-01-10', purchasePrice: 128000, warrantyExpiry: '2036-01-10', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-1',  currentOwner: 'Arjun Mehta',      healthScore: 97, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000036', notes: '',                                            specs: { Material: 'Mesh + Aluminium', Color: 'Graphite', Dimensions: '67×67×104 cm' }, createdAt: '2024-01-10T10:00:00Z', updatedAt: '2026-06-20T09:30:00Z' },
  { id: 'asset-37', assetId: 'AF-000037', name: 'Steelcase Leap V2 Chair',   serialNumber: 'SC-LEAP-002',    categoryId: 'cat-5', category: 'Furniture', categoryIcon: '🪑', departmentId: 'dept-6', department: 'Engineering', locationId: 'loc-8', location: 'Annexe Block > 2nd Floor > Room A201', purchaseDate: '2024-03-15', purchasePrice: 95000,  warrantyExpiry: '2036-03-15', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-12', currentOwner: 'Meera Krishnan',   healthScore: 95, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000037', notes: '',                                            specs: { Material: 'Fabric + Steel', Color: 'Black', Dimensions: '64×60×109 cm' }, createdAt: '2024-03-15T10:00:00Z', updatedAt: '2026-06-18T14:15:00Z' },
  { id: 'asset-38', assetId: 'AF-000038', name: 'Godrej Interio Matrix Chair',serialNumber: 'GI-MTRX-003',   categoryId: 'cat-5', category: 'Furniture', categoryIcon: '🪑', departmentId: 'dept-2', department: 'HR',          locationId: 'loc-3', location: 'HQ Tower > 2nd Floor > Room 201',  purchaseDate: '2024-02-05', purchasePrice: 18500,  warrantyExpiry: '2034-02-05', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-8',  currentOwner: 'Ananya Pillai',    healthScore: 84, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000038', notes: '',                                            specs: { Material: 'Mesh + Nylon', Color: 'Blue', Dimensions: '60×58×100 cm' }, createdAt: '2024-02-05T10:00:00Z', updatedAt: '2026-05-12T11:00:00Z' },
  { id: 'asset-39', assetId: 'AF-000039', name: 'IKEA BEKANT Standing Desk', serialNumber: 'IKEA-BKT-004',   categoryId: 'cat-5', category: 'Furniture', categoryIcon: '🪑', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-04-01', purchasePrice: 32000,  warrantyExpiry: '2034-04-01', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-2',  currentOwner: 'Priya Sharma',     healthScore: 88, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000039', notes: 'Height-adjustable – electric',                specs: { Material: 'Particleboard + Steel', Color: 'White/Oak', Dimensions: '160×80×125 cm' }, createdAt: '2024-04-01T10:00:00Z', updatedAt: '2026-06-15T08:00:00Z' },
  { id: 'asset-40', assetId: 'AF-000040', name: 'Featherlite Optima Chair',  serialNumber: 'FL-OPT-005',     categoryId: 'cat-5', category: 'Furniture', categoryIcon: '🪑', departmentId: 'dept-3', department: 'Finance',     locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  purchaseDate: '2024-05-10', purchasePrice: 14500,  warrantyExpiry: '2034-05-10', condition: 'Good',      status: 'Allocated',          currentOwnerId: 'emp-9',  currentOwner: 'Deepak Joshi',     healthScore: 82, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000040', notes: '',                                            specs: { Material: 'Mesh + Nylon', Color: 'Grey', Dimensions: '58×56×98 cm' }, createdAt: '2024-05-10T10:00:00Z', updatedAt: '2026-06-01T08:45:00Z' },
  { id: 'asset-41', assetId: 'AF-000041', name: 'Nilkamal Elwood Table',     serialNumber: 'NK-ELW-006',     categoryId: 'cat-5', category: 'Furniture', categoryIcon: '🪑', departmentId: 'dept-5', department: 'Operations',  locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', purchaseDate: '2024-06-20', purchasePrice: 8500,   warrantyExpiry: '2034-06-20', condition: 'Fair',      status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 62, healthGrade: 'Fair',      qrCodeUrl: '/qr/AF-000041', notes: 'Surface scratched',                           specs: { Material: 'Engineered Wood', Color: 'Walnut', Dimensions: '120×60×75 cm' }, createdAt: '2024-06-20T10:00:00Z', updatedAt: '2026-06-30T10:00:00Z' },
  { id: 'asset-42', assetId: 'AF-000042', name: 'HOF Premium Chair',         serialNumber: 'HOF-PREM-007',   categoryId: 'cat-5', category: 'Furniture', categoryIcon: '🪑', departmentId: 'dept-4', department: 'Marketing',   locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', purchaseDate: '2024-08-01', purchasePrice: 22000,  warrantyExpiry: '2034-08-01', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-10', currentOwner: 'Kavitha Menon',    healthScore: 94, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000042', notes: '',                                            specs: { Material: 'Leatherette + Steel', Color: 'Black', Dimensions: '62×60×110 cm' }, createdAt: '2024-08-01T10:00:00Z', updatedAt: '2026-06-22T09:00:00Z' },
  { id: 'asset-43', assetId: 'AF-000043', name: 'Godrej Interio L-Desk',     serialNumber: 'GI-LDESK-008',   categoryId: 'cat-5', category: 'Furniture', categoryIcon: '🪑', departmentId: 'dept-3', department: 'Finance',     locationId: 'loc-4', location: 'HQ Tower > 2nd Floor > Room 202',  purchaseDate: '2024-09-05', purchasePrice: 25000,  warrantyExpiry: '2034-09-05', condition: 'Excellent', status: 'Allocated',          currentOwnerId: 'emp-27', currentOwner: 'Isha Deshpande',   healthScore: 97, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000043', notes: '',                                            specs: { Material: 'Engineered Wood + Steel', Color: 'Wenge', Dimensions: '150×120×75 cm' }, createdAt: '2024-09-05T10:00:00Z', updatedAt: '2026-06-28T09:00:00Z' },

  // ---- Networking (7) ----
  { id: 'asset-44', assetId: 'AF-000044', name: 'Cisco Catalyst 9200L',      serialNumber: 'CSC-9200L-001',  categoryId: 'cat-6', category: 'Networking', categoryIcon: '🌐', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-2', location: 'HQ Tower > 1st Floor > Room 102', purchaseDate: '2024-01-20', purchasePrice: 285000, warrantyExpiry: '2027-01-20', condition: 'Excellent', status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 92, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000044', notes: 'Core switch – HQ Tower',                      specs: { Ports: '24', Speed: '1 Gbps', 'PoE Support': 'Yes – 370W' }, createdAt: '2024-01-20T10:00:00Z', updatedAt: '2026-06-25T10:00:00Z' },
  { id: 'asset-45', assetId: 'AF-000045', name: 'Ubiquiti UniFi USW-Pro-48', serialNumber: 'UBQ-USW48-002',  categoryId: 'cat-6', category: 'Networking', categoryIcon: '🌐', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-2', location: 'HQ Tower > 1st Floor > Room 102', purchaseDate: '2024-02-15', purchasePrice: 98000,  warrantyExpiry: '2027-02-15', condition: 'Good',      status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 86, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000045', notes: 'Annexe link switch',                          specs: { Ports: '48', Speed: '1 Gbps + 4× 10G SFP+', 'PoE Support': 'No' }, createdAt: '2024-02-15T10:00:00Z', updatedAt: '2026-05-30T14:00:00Z' },
  { id: 'asset-46', assetId: 'AF-000046', name: 'Fortinet FortiGate 60F',    serialNumber: 'FG60F-003',      categoryId: 'cat-6', category: 'Networking', categoryIcon: '🌐', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-2', location: 'HQ Tower > 1st Floor > Room 102', purchaseDate: '2024-01-10', purchasePrice: 175000, warrantyExpiry: '2027-01-10', condition: 'Excellent', status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 90, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000046', notes: 'Firewall – perimeter',                        specs: { Ports: '10', Speed: '10 Gbps throughput', 'PoE Support': 'No' }, createdAt: '2024-01-10T10:00:00Z', updatedAt: '2026-06-15T16:30:00Z' },
  { id: 'asset-47', assetId: 'AF-000047', name: 'Ubiquiti UniFi U6 Pro AP',  serialNumber: 'UBQ-U6PRO-004', categoryId: 'cat-6', category: 'Networking', categoryIcon: '🌐', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-1', location: 'HQ Tower > 1st Floor > Room 101', purchaseDate: '2024-03-05', purchasePrice: 14800,  warrantyExpiry: '2027-03-05', condition: 'Good',      status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 88, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000047', notes: 'Wi-Fi 6 access point – 1st floor',            specs: { Ports: '1', Speed: 'Wi-Fi 6 – AX5400', 'PoE Support': 'Powered via PoE' }, createdAt: '2024-03-05T10:00:00Z', updatedAt: '2026-06-10T11:00:00Z' },
  { id: 'asset-48', assetId: 'AF-000048', name: 'TP-Link TL-SG108',          serialNumber: 'TPL-SG108-005',  categoryId: 'cat-6', category: 'Networking', categoryIcon: '🌐', departmentId: 'dept-5', department: 'Operations',  locationId: 'loc-7', location: 'Annexe Block > 1st Floor > Room A101', purchaseDate: '2024-04-20', purchasePrice: 3200,   warrantyExpiry: '2027-04-20', condition: 'Good',      status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 85, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000048', notes: 'Desktop switch – Ops center',                 specs: { Ports: '8', Speed: '1 Gbps', 'PoE Support': 'No' }, createdAt: '2024-04-20T10:00:00Z', updatedAt: '2026-06-01T09:00:00Z' },
  { id: 'asset-49', assetId: 'AF-000049', name: 'Aruba Instant On AP22',     serialNumber: 'ARB-AP22-006',   categoryId: 'cat-6', category: 'Networking', categoryIcon: '🌐', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-6', location: 'Annexe Block > Ground Floor > Room G01', purchaseDate: '2024-05-28', purchasePrice: 11500,  warrantyExpiry: '2027-05-28', condition: 'Good',      status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 83, healthGrade: 'Good',      qrCodeUrl: '/qr/AF-000049', notes: 'Wi-Fi 6 AP – Annexe ground floor',            specs: { Ports: '1', Speed: 'Wi-Fi 6 – AX1800', 'PoE Support': 'Powered via PoE' }, createdAt: '2024-05-28T10:00:00Z', updatedAt: '2026-06-05T10:00:00Z' },
  { id: 'asset-50', assetId: 'AF-000050', name: 'Synology RS1221+ NAS',      serialNumber: 'SYN-RS1221-007', categoryId: 'cat-6', category: 'Networking', categoryIcon: '🌐', departmentId: 'dept-1', department: 'IT',          locationId: 'loc-2', location: 'HQ Tower > 1st Floor > Room 102', purchaseDate: '2024-02-28', purchasePrice: 125000, warrantyExpiry: '2027-02-28', condition: 'Excellent', status: 'Allocated',          currentOwnerId: null,      currentOwner: null,               healthScore: 91, healthGrade: 'Excellent', qrCodeUrl: '/qr/AF-000050', notes: 'Backup NAS – 48 TB raw (8× 6 TB)',            specs: { Ports: '4', Speed: '1 Gbps × 4 (LAG)', 'PoE Support': 'No' }, createdAt: '2024-02-28T10:00:00Z', updatedAt: '2026-07-01T16:00:00Z' },
];

// ============================================================
// 6. ASSET HISTORY (25)
// ============================================================

export const assetHistory: AssetHistory[] = [
  { id: 'hist-1',  assetId: 'asset-1',  action: 'Procured',    description: 'Purchased from Dell India – Invoice #INV-2024-0015',                      performedBy: 'Neha Gupta',     timestamp: '2024-01-15T10:00:00Z' },
  { id: 'hist-2',  assetId: 'asset-1',  action: 'Allocated',   description: 'Assigned to Arjun Mehta (IT)',                                             performedBy: 'Neha Gupta',     timestamp: '2024-01-16T09:30:00Z' },
  { id: 'hist-3',  assetId: 'asset-2',  action: 'Procured',    description: 'Purchased from Apple Authorised Reseller – Invoice #INV-2024-0042',        performedBy: 'Karthik Nair',   timestamp: '2024-03-20T10:00:00Z' },
  { id: 'hist-4',  assetId: 'asset-2',  action: 'Allocated',   description: 'Assigned to Meera Krishnan (Engineering)',                                  performedBy: 'Karthik Nair',   timestamp: '2024-03-21T11:00:00Z' },
  { id: 'hist-5',  assetId: 'asset-7',  action: 'Allocated',   description: 'Assigned to Aditya Banerjee (IT)',                                         performedBy: 'Neha Gupta',     timestamp: '2024-02-02T10:00:00Z' },
  { id: 'hist-6',  assetId: 'asset-7',  action: 'Maintenance', description: 'Battery swelling detected – sent for repair',                              performedBy: 'Neha Gupta',     timestamp: '2026-07-01T12:30:00Z' },
  { id: 'hist-7',  assetId: 'asset-11', action: 'Procured',    description: 'Purchased from Acer India – Invoice #INV-2024-0028',                       performedBy: 'Neha Gupta',     timestamp: '2024-02-25T10:00:00Z' },
  { id: 'hist-8',  assetId: 'asset-11', action: 'Allocated',   description: 'Assigned to Manish Tiwari (IT)',                                           performedBy: 'Neha Gupta',     timestamp: '2024-02-26T09:00:00Z' },
  { id: 'hist-9',  assetId: 'asset-11', action: 'Returned',    description: 'Returned due to keyboard failure',                                         performedBy: 'Manish Tiwari',  timestamp: '2026-02-15T14:00:00Z' },
  { id: 'hist-10', assetId: 'asset-11', action: 'Retired',     description: 'Decommissioned – beyond economical repair',                                performedBy: 'Neha Gupta',     timestamp: '2026-03-10T09:00:00Z' },
  { id: 'hist-11', assetId: 'asset-31', action: 'Procured',    description: 'Purchased from Toyota Dealership Chennai – Invoice #INV-2024-0110',        performedBy: 'Rohit Desai',    timestamp: '2024-02-01T10:00:00Z' },
  { id: 'hist-12', assetId: 'asset-31', action: 'Allocated',   description: 'Assigned to Operations – Suresh Patil',                                    performedBy: 'Rohit Desai',    timestamp: '2024-02-05T09:00:00Z' },
  { id: 'hist-13', assetId: 'asset-35', action: 'Maintenance', description: 'Transmission fault – sent to Mahindra service centre',                     performedBy: 'Rohit Desai',    timestamp: '2026-07-08T14:30:00Z' },
  { id: 'hist-14', assetId: 'asset-21', action: 'Maintenance', description: 'Display flickering – under diagnosis',                                     performedBy: 'Neha Gupta',     timestamp: '2026-07-02T10:00:00Z' },
  { id: 'hist-15', assetId: 'asset-44', action: 'Procured',    description: 'Purchased from Cisco Partner – Invoice #INV-2024-0020',                    performedBy: 'Neha Gupta',     timestamp: '2024-01-20T10:00:00Z' },
  { id: 'hist-16', assetId: 'asset-44', action: 'Configured',  description: 'Initial VLAN and network configuration completed',                         performedBy: 'Manish Tiwari',  timestamp: '2024-01-22T15:00:00Z' },
  { id: 'hist-17', assetId: 'asset-36', action: 'Procured',    description: 'Purchased from Herman Miller India – Invoice #INV-2024-0008',              performedBy: 'Neha Gupta',     timestamp: '2024-01-10T10:00:00Z' },
  { id: 'hist-18', assetId: 'asset-15', action: 'Reserved',    description: 'Reserved for new hire joining in August 2026',                              performedBy: 'Neha Gupta',     timestamp: '2026-07-05T08:00:00Z' },
  { id: 'hist-19', assetId: 'asset-34', action: 'Procured',    description: 'Purchased from Tata Motors – green fleet initiative',                      performedBy: 'Rohit Desai',    timestamp: '2024-10-01T10:00:00Z' },
  { id: 'hist-20', assetId: 'asset-6',  action: 'Allocated',   description: 'Assigned to Lakshmi Venkatesh (Marketing)',                                 performedBy: 'Neha Gupta',     timestamp: '2024-06-12T09:00:00Z' },
  { id: 'hist-21', assetId: 'asset-50', action: 'Procured',    description: 'Purchased from Synology Authorised Distributor – Invoice #INV-2024-0033',  performedBy: 'Neha Gupta',     timestamp: '2024-02-28T10:00:00Z' },
  { id: 'hist-22', assetId: 'asset-50', action: 'Configured',  description: 'RAID 6 configured, backup schedules set',                                  performedBy: 'Manish Tiwari',  timestamp: '2024-03-02T11:00:00Z' },
  { id: 'hist-23', assetId: 'asset-4',  action: 'Allocated',   description: 'Assigned to Deepak Joshi (Finance)',                                        performedBy: 'Sunita Rao',     timestamp: '2024-04-06T10:00:00Z' },
  { id: 'hist-24', assetId: 'asset-33', action: 'Allocated',   description: 'Assigned to Kavitha Menon (Marketing)',                                     performedBy: 'Rohit Desai',    timestamp: '2024-07-22T09:00:00Z' },
  { id: 'hist-25', assetId: 'asset-12', action: 'Returned',    description: 'Previous owner left – returned to spare pool',                             performedBy: 'Neha Gupta',     timestamp: '2026-06-30T15:45:00Z' },
];

// ============================================================
// 7. ASSET REQUESTS (12)
// ============================================================

export const assetRequests: AssetRequest[] = [
  {
    id: 'req-1', requestId: 'REQ-2026-001', requesterId: 'emp-13', requesterName: 'Aditya Banerjee', requesterDepartment: 'IT',
    categoryId: 'cat-1', category: 'Laptops', justification: 'Current laptop (HP ProBook 450) is under maintenance – need a temporary replacement to continue work.', urgency: 'High',
    status: 'Approved',
    approvals: [
      { id: 'appr-1', approverId: 'emp-7', approverName: 'Rajesh Iyer', approverRole: 'Department Head', status: 'Approved', comment: 'Approved – critical for project deadline', timestamp: '2026-07-02T10:00:00Z' },
      { id: 'appr-2', approverId: 'emp-4', approverName: 'Neha Gupta',  approverRole: 'Asset Manager',   status: 'Approved', comment: 'Spare laptop AF-000012 available', timestamp: '2026-07-02T11:30:00Z' },
    ],
    assignedAssetId: 'asset-12', assignedAsset: 'Dell Inspiron 15 3520', expectedReturnDate: '2026-08-15', createdAt: '2026-07-01T14:00:00Z', updatedAt: '2026-07-02T11:30:00Z',
  },
  {
    id: 'req-2', requestId: 'REQ-2026-002', requesterId: 'emp-20', requesterName: 'Lakshmi Venkatesh', requesterDepartment: 'Marketing',
    categoryId: 'cat-2', category: 'Monitors', justification: 'Need a secondary monitor for design work – current single-screen setup reduces productivity.', urgency: 'Medium',
    status: 'Pending',
    approvals: [
      { id: 'appr-3', approverId: 'emp-10', approverName: 'Kavitha Menon', approverRole: 'Department Head', status: 'Pending', comment: '', timestamp: '2026-07-05T09:00:00Z' },
    ],
    assignedAssetId: null, assignedAsset: null, expectedReturnDate: null, createdAt: '2026-07-05T09:00:00Z', updatedAt: '2026-07-05T09:00:00Z',
  },
  {
    id: 'req-3', requestId: 'REQ-2026-003', requesterId: 'emp-19', requesterName: 'Amit Choudhury', requesterDepartment: 'Finance',
    categoryId: 'cat-1', category: 'Laptops', justification: 'Current Dell P2422H monitor is not sufficient; need a laptop for remote audit travel.', urgency: 'Medium',
    status: 'Approved',
    approvals: [
      { id: 'appr-4', approverId: 'emp-9',  approverName: 'Deepak Joshi', approverRole: 'Department Head', status: 'Approved', comment: 'Justified for Q3 audit travel', timestamp: '2026-06-20T10:00:00Z' },
      { id: 'appr-5', approverId: 'emp-6',  approverName: 'Sunita Rao',   approverRole: 'Asset Manager',   status: 'Approved', comment: 'Will procure new device', timestamp: '2026-06-21T11:00:00Z' },
    ],
    assignedAssetId: null, assignedAsset: null, expectedReturnDate: null, createdAt: '2026-06-18T14:00:00Z', updatedAt: '2026-06-21T11:00:00Z',
  },
  {
    id: 'req-4', requestId: 'REQ-2026-004', requesterId: 'emp-24', requesterName: 'Tarun Bhatt', requesterDepartment: 'Engineering',
    categoryId: 'cat-2', category: 'Monitors', justification: 'Need a 4K monitor for UI/UX design review and code review sessions.', urgency: 'Low',
    status: 'Pending',
    approvals: [
      { id: 'appr-6', approverId: 'emp-12', approverName: 'Meera Krishnan', approverRole: 'Department Head', status: 'Pending', comment: '', timestamp: '2026-07-08T10:00:00Z' },
    ],
    assignedAssetId: null, assignedAsset: null, expectedReturnDate: null, createdAt: '2026-07-08T10:00:00Z', updatedAt: '2026-07-08T10:00:00Z',
  },
  {
    id: 'req-5', requestId: 'REQ-2026-005', requesterId: 'emp-16', requesterName: 'Divya Kulkarni', requesterDepartment: 'HR',
    categoryId: 'cat-3', category: 'Projectors', justification: 'HR training sessions require a dedicated projector in Training Hall B.', urgency: 'Medium',
    status: 'Fulfilled',
    approvals: [
      { id: 'appr-7', approverId: 'emp-8',  approverName: 'Ananya Pillai', approverRole: 'Department Head', status: 'Approved', comment: 'Essential for onboarding sessions', timestamp: '2026-05-10T09:00:00Z' },
      { id: 'appr-8', approverId: 'emp-4',  approverName: 'Neha Gupta',    approverRole: 'Asset Manager',   status: 'Approved', comment: 'BenQ MW560 available', timestamp: '2026-05-10T14:00:00Z' },
    ],
    assignedAssetId: 'asset-29', assignedAsset: 'BenQ MW560', expectedReturnDate: null, createdAt: '2026-05-08T10:00:00Z', updatedAt: '2026-05-11T09:00:00Z',
  },
  {
    id: 'req-6', requestId: 'REQ-2026-006', requesterId: 'emp-22', requesterName: 'Ravi Shankar', requesterDepartment: 'Operations',
    categoryId: 'cat-4', category: 'Vehicles', justification: 'Need vehicle for weekly site inspections – current pool vehicle often unavailable.', urgency: 'High',
    status: 'Rejected',
    approvals: [
      { id: 'appr-9', approverId: 'emp-11', approverName: 'Suresh Patil', approverRole: 'Department Head', status: 'Approved', comment: 'Valid requirement', timestamp: '2026-06-05T09:00:00Z' },
      { id: 'appr-10', approverId: 'emp-5', approverName: 'Rohit Desai',  approverRole: 'Asset Manager',   status: 'Rejected', comment: 'Budget exhausted for FY26 – resubmit in Q1 FY27', timestamp: '2026-06-06T11:00:00Z' },
    ],
    assignedAssetId: null, assignedAsset: null, expectedReturnDate: null, createdAt: '2026-06-04T14:00:00Z', updatedAt: '2026-06-06T11:00:00Z',
  },
  {
    id: 'req-7', requestId: 'REQ-2026-007', requesterId: 'emp-25', requesterName: 'Swathi Raghavan', requesterDepartment: 'Engineering',
    categoryId: 'cat-5', category: 'Furniture', justification: 'Requesting a height-adjustable standing desk for ergonomic needs (doctor recommended).', urgency: 'Medium',
    status: 'Approved',
    approvals: [
      { id: 'appr-11', approverId: 'emp-12', approverName: 'Meera Krishnan', approverRole: 'Department Head', status: 'Approved', comment: 'Medical justification provided', timestamp: '2026-06-12T09:00:00Z' },
      { id: 'appr-12', approverId: 'emp-30', approverName: 'Karthik Nair',   approverRole: 'Asset Manager',   status: 'Approved', comment: 'Ordering IKEA BEKANT – delivery in 5 days', timestamp: '2026-06-12T14:00:00Z' },
    ],
    assignedAssetId: null, assignedAsset: null, expectedReturnDate: null, createdAt: '2026-06-10T10:00:00Z', updatedAt: '2026-06-12T14:00:00Z',
  },
  {
    id: 'req-8', requestId: 'REQ-2026-008', requesterId: 'emp-17', requesterName: 'Sanjay Verma', requesterDepartment: 'HR',
    categoryId: 'cat-1', category: 'Laptops', justification: 'Need laptop for fieldwork during campus recruitment drive.', urgency: 'High',
    status: 'Pending',
    approvals: [
      { id: 'appr-13', approverId: 'emp-8', approverName: 'Ananya Pillai', approverRole: 'Department Head', status: 'Approved', comment: 'Recruitment season starting', timestamp: '2026-07-09T09:00:00Z' },
      { id: 'appr-14', approverId: 'emp-4', approverName: 'Neha Gupta',    approverRole: 'Asset Manager',   status: 'Pending', comment: '', timestamp: '2026-07-09T10:00:00Z' },
    ],
    assignedAssetId: null, assignedAsset: null, expectedReturnDate: '2026-08-30', createdAt: '2026-07-09T08:00:00Z', updatedAt: '2026-07-09T10:00:00Z',
  },
  {
    id: 'req-9', requestId: 'REQ-2026-009', requesterId: 'emp-21', requesterName: 'Gaurav Saxena', requesterDepartment: 'Marketing',
    categoryId: 'cat-1', category: 'Laptops', justification: 'Current machine is slow for video editing – need an upgrade with dedicated GPU.', urgency: 'Medium',
    status: 'Pending',
    approvals: [
      { id: 'appr-15', approverId: 'emp-10', approverName: 'Kavitha Menon', approverRole: 'Department Head', status: 'Pending', comment: '', timestamp: '2026-07-10T09:00:00Z' },
    ],
    assignedAssetId: null, assignedAsset: null, expectedReturnDate: null, createdAt: '2026-07-10T09:00:00Z', updatedAt: '2026-07-10T09:00:00Z',
  },
  {
    id: 'req-10', requestId: 'REQ-2026-010', requesterId: 'emp-18', requesterName: 'Pooja Singh', requesterDepartment: 'Finance',
    categoryId: 'cat-2', category: 'Monitors', justification: 'Dual-monitor setup needed for financial modelling and spreadsheet review.', urgency: 'Low',
    status: 'Fulfilled',
    approvals: [
      { id: 'appr-16', approverId: 'emp-9', approverName: 'Deepak Joshi', approverRole: 'Department Head', status: 'Approved', comment: 'Approved', timestamp: '2026-04-15T09:00:00Z' },
      { id: 'appr-17', approverId: 'emp-6', approverName: 'Sunita Rao',   approverRole: 'Asset Manager',   status: 'Approved', comment: 'Dell P2422H available', timestamp: '2026-04-15T14:00:00Z' },
    ],
    assignedAssetId: 'asset-20', assignedAsset: 'Dell P2422H', expectedReturnDate: null, createdAt: '2026-04-12T10:00:00Z', updatedAt: '2026-04-16T09:00:00Z',
  },
  {
    id: 'req-11', requestId: 'REQ-2026-011', requesterId: 'emp-26', requesterName: 'Harish Malhotra', requesterDepartment: 'HR',
    categoryId: 'cat-6', category: 'Networking', justification: 'Need a desktop switch for temporary HR satellite office.', urgency: 'Low',
    status: 'Rejected',
    approvals: [
      { id: 'appr-18', approverId: 'emp-8', approverName: 'Ananya Pillai', approverRole: 'Department Head', status: 'Approved', comment: 'Needed for temp setup', timestamp: '2026-06-25T09:00:00Z' },
      { id: 'appr-19', approverId: 'emp-4', approverName: 'Neha Gupta',    approverRole: 'Asset Manager',   status: 'Rejected', comment: 'IT will extend existing network – no separate switch needed', timestamp: '2026-06-26T10:00:00Z' },
    ],
    assignedAssetId: null, assignedAsset: null, expectedReturnDate: null, createdAt: '2026-06-24T14:00:00Z', updatedAt: '2026-06-26T10:00:00Z',
  },
  {
    id: 'req-12', requestId: 'REQ-2026-012', requesterId: 'emp-27', requesterName: 'Isha Deshpande', requesterDepartment: 'Finance',
    categoryId: 'cat-5', category: 'Furniture', justification: 'L-shaped desk for additional workspace for compliance file management.', urgency: 'Medium',
    status: 'Fulfilled',
    approvals: [
      { id: 'appr-20', approverId: 'emp-9',  approverName: 'Deepak Joshi', approverRole: 'Department Head', status: 'Approved', comment: 'Approved', timestamp: '2026-05-20T09:00:00Z' },
      { id: 'appr-21', approverId: 'emp-6',  approverName: 'Sunita Rao',   approverRole: 'Asset Manager',   status: 'Approved', comment: 'Godrej L-Desk ordered', timestamp: '2026-05-20T14:00:00Z' },
    ],
    assignedAssetId: 'asset-43', assignedAsset: 'Godrej Interio L-Desk', expectedReturnDate: null, createdAt: '2026-05-18T10:00:00Z', updatedAt: '2026-05-25T09:00:00Z',
  },
];

// ============================================================
// 8. MAINTENANCE REQUESTS (15)
// ============================================================

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: 'maint-1',  requestId: 'MR-0000001', assetId: 'asset-7',  assetName: 'HP ProBook 450 G10',      assetAssetId: 'AF-000007', reportedBy: 'emp-13', reportedByName: 'Aditya Banerjee',  assignedTo: 'emp-4',  assignedToName: 'Neha Gupta',     issueType: 'Hardware',  description: 'Battery is swollen and device overheating under load.',                                    priority: 'High',     status: 'In Progress',  resolutionNotes: '',                                                                                              partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-07-01T12:30:00Z', resolvedAt: null,                  slaDeadline: '2026-07-04T12:30:00Z' },
  { id: 'maint-2',  requestId: 'MR-0000002', assetId: 'asset-21', assetName: 'LG 27UK850-W',            assetAssetId: 'AF-000021', reportedBy: 'emp-14', reportedByName: 'Shruti Agarwal',    assignedTo: 'emp-4',  assignedToName: 'Neha Gupta',     issueType: 'Hardware',  description: 'Display flickering intermittently, especially when using USB-C connection.',                priority: 'Medium',   status: 'Diagnosed',    resolutionNotes: 'Likely TCON board issue. Replacement part ordered.',                                             partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-07-02T10:00:00Z', resolvedAt: null,                  slaDeadline: '2026-07-07T10:00:00Z' },
  { id: 'maint-3',  requestId: 'MR-0000003', assetId: 'asset-35', assetName: 'Mahindra Bolero Neo',     assetAssetId: 'AF-000035', reportedBy: 'emp-22', reportedByName: 'Ravi Shankar',      assignedTo: 'emp-5',  assignedToName: 'Rohit Desai',    issueType: 'Hardware',  description: 'Transmission grinding noise in 3rd gear. Vehicle not safe to drive.',                       priority: 'Critical', status: 'In Progress',  resolutionNotes: 'Sent to Mahindra service centre. Gearbox inspection underway.',                                  partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-07-08T14:30:00Z', resolvedAt: null,                  slaDeadline: '2026-07-10T14:30:00Z' },
  { id: 'maint-4',  requestId: 'MR-0000004', assetId: 'asset-27', assetName: 'Epson EB-X51',            assetAssetId: 'AF-000027', reportedBy: 'emp-2',  reportedByName: 'Priya Sharma',     assignedTo: 'emp-4',  assignedToName: 'Neha Gupta',     issueType: 'Hardware',  description: 'Projector lamp dimming significantly. Lamp hour counter shows 4800/5000 hours.',            priority: 'Medium',   status: 'Approved',     resolutionNotes: '',                                                                                              partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: true,  createdAt: '2026-07-05T11:00:00Z', resolvedAt: null,                  slaDeadline: '2026-07-10T11:00:00Z' },
  { id: 'maint-5',  requestId: 'MR-0000005', assetId: 'asset-44', assetName: 'Cisco Catalyst 9200L',    assetAssetId: 'AF-000044', reportedBy: 'emp-15', reportedByName: 'Manish Tiwari',     assignedTo: 'emp-15', assignedToName: 'Manish Tiwari',  issueType: 'Software', description: 'Switch firmware needs update – security vulnerability CVE-2026-3412 patching.',             priority: 'High',     status: 'Completed',    resolutionNotes: 'Firmware updated to IOS-XE 17.12.3. All ports tested, no disruption.',                           partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-06-15T09:00:00Z', resolvedAt: '2026-06-16T18:00:00Z', slaDeadline: '2026-06-17T09:00:00Z' },
  { id: 'maint-6',  requestId: 'MR-0000006', assetId: 'asset-31', assetName: 'Toyota Innova Crysta',    assetAssetId: 'AF-000031', reportedBy: 'emp-5',  reportedByName: 'Rohit Desai',      assignedTo: 'emp-5',  assignedToName: 'Rohit Desai',    issueType: 'Hardware',  description: 'Scheduled 45,000 km service – oil change, brake pads, air filter.',                        priority: 'Medium',   status: 'Completed',    resolutionNotes: 'Service completed at authorised Toyota centre. All items replaced as per checklist.',             partsReplaced: [{ name: 'Brake Pads (Front)', cost: 3200 }, { name: 'Engine Oil 5W-30', cost: 1800 }, { name: 'Air Filter', cost: 650 }], totalCost: 5650, isAiPredicted: false, createdAt: '2026-06-20T08:00:00Z', resolvedAt: '2026-06-21T17:00:00Z', slaDeadline: '2026-06-22T08:00:00Z' },
  { id: 'maint-7',  requestId: 'MR-0000007', assetId: 'asset-3',  assetName: 'HP EliteBook 840 G10',    assetAssetId: 'AF-000003', reportedBy: 'emp-8',  reportedByName: 'Ananya Pillai',    assignedTo: 'emp-4',  assignedToName: 'Neha Gupta',     issueType: 'Software', description: 'Windows 11 blue screen errors (WHEA_UNCORRECTABLE_ERROR) occurring daily.',                 priority: 'High',     status: 'Completed',    resolutionNotes: 'SSD firmware updated, Windows reinstalled. Monitoring for 48 hours – stable.',                    partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-05-10T10:00:00Z', resolvedAt: '2026-05-12T16:00:00Z', slaDeadline: '2026-05-13T10:00:00Z' },
  { id: 'maint-8',  requestId: 'MR-0000008', assetId: 'asset-9',  assetName: 'Dell Latitude 7440',      assetAssetId: 'AF-000009', reportedBy: 'emp-22', reportedByName: 'Ravi Shankar',      assignedTo: 'emp-5',  assignedToName: 'Rohit Desai',    issueType: 'Hardware',  description: 'Trackpad intermittently unresponsive. External mouse works fine.',                          priority: 'Low',      status: 'Pending',      resolutionNotes: '',                                                                                              partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-07-10T09:00:00Z', resolvedAt: null,                  slaDeadline: '2026-07-17T09:00:00Z' },
  { id: 'maint-9',  requestId: 'MR-0000009', assetId: 'asset-46', assetName: 'Fortinet FortiGate 60F',  assetAssetId: 'AF-000046', reportedBy: 'emp-15', reportedByName: 'Manish Tiwari',     assignedTo: 'emp-15', assignedToName: 'Manish Tiwari',  issueType: 'Software', description: 'FortiOS needs update to patch known SSL VPN vulnerability.',                                priority: 'Critical', status: 'Completed',    resolutionNotes: 'FortiOS updated to 7.4.4. SSL VPN config re-validated. Penetration test passed.',                 partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-06-10T08:00:00Z', resolvedAt: '2026-06-10T22:00:00Z', slaDeadline: '2026-06-11T08:00:00Z' },
  { id: 'maint-10', requestId: 'MR-0000010', assetId: 'asset-39', assetName: 'IKEA BEKANT Standing Desk',assetAssetId: 'AF-000039', reportedBy: 'emp-2',  reportedByName: 'Priya Sharma',     assignedTo: 'emp-4',  assignedToName: 'Neha Gupta',     issueType: 'Hardware',  description: 'Electric height adjustment motor making grinding sound. Desk stops mid-way.',               priority: 'Medium',   status: 'Completed',    resolutionNotes: 'Motor replaced under IKEA warranty. Tested – smooth operation confirmed.',                        partsReplaced: [{ name: 'Linear Actuator Motor', cost: 0 }],              totalCost: 0,     isAiPredicted: false, createdAt: '2026-04-20T10:00:00Z', resolvedAt: '2026-04-28T14:00:00Z', slaDeadline: '2026-04-25T10:00:00Z' },
  { id: 'maint-11', requestId: 'MR-0000011', assetId: 'asset-50', assetName: 'Synology RS1221+ NAS',    assetAssetId: 'AF-000050', reportedBy: 'emp-15', reportedByName: 'Manish Tiwari',     assignedTo: 'emp-15', assignedToName: 'Manish Tiwari',  issueType: 'Hardware',  description: 'Drive Bay 3 showing SMART warnings – predicted failure within 30 days.',                    priority: 'High',     status: 'Completed',    resolutionNotes: 'Replaced Drive 3 (Seagate IronWolf 6TB). RAID 6 rebuild completed in 18 hours.',                  partsReplaced: [{ name: 'Seagate IronWolf 6TB', cost: 14500 }],           totalCost: 14500, isAiPredicted: true,  createdAt: '2026-06-28T08:00:00Z', resolvedAt: '2026-06-30T16:00:00Z', slaDeadline: '2026-07-01T08:00:00Z' },
  { id: 'maint-12', requestId: 'MR-0000012', assetId: 'asset-5',  assetName: 'Dell Latitude 5540',      assetAssetId: 'AF-000005', reportedBy: 'emp-10', reportedByName: 'Kavitha Menon',     assignedTo: null,     assignedToName: null,             issueType: 'Cosmetic', description: 'Laptop lid hinge is loose. Cosmetic crack on bottom panel.',                                 priority: 'Low',      status: 'Pending',      resolutionNotes: '',                                                                                              partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-07-11T10:00:00Z', resolvedAt: null,                  slaDeadline: '2026-07-18T10:00:00Z' },
  { id: 'maint-13', requestId: 'MR-0000013', assetId: 'asset-47', assetName: 'Ubiquiti UniFi U6 Pro AP',assetAssetId: 'AF-000047', reportedBy: 'emp-15', reportedByName: 'Manish Tiwari',     assignedTo: 'emp-15', assignedToName: 'Manish Tiwari',  issueType: 'Software', description: 'AP firmware mismatch causing roaming issues. Users dropping connection when moving floors.',  priority: 'Medium',   status: 'Completed',    resolutionNotes: 'Firmware updated to 6.6.65. Fast roaming (802.11r) re-enabled. Tested across all floors.',        partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-05-25T09:00:00Z', resolvedAt: '2026-05-26T11:00:00Z', slaDeadline: '2026-05-28T09:00:00Z' },
  { id: 'maint-14', requestId: 'MR-0000014', assetId: 'asset-41', assetName: 'Nilkamal Elwood Table',   assetAssetId: 'AF-000041', reportedBy: 'emp-23', reportedByName: 'Nandini Hegde',     assignedTo: null,     assignedToName: null,             issueType: 'Cosmetic', description: 'Table surface has deep scratches and laminate is peeling on one edge.',                      priority: 'Low',      status: 'Rejected',     resolutionNotes: 'Cosmetic damage within acceptable use. Replacement not approved – budget constraint.',            partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: false, createdAt: '2026-06-30T10:00:00Z', resolvedAt: null,                  slaDeadline: '2026-07-07T10:00:00Z' },
  { id: 'maint-15', requestId: 'MR-0000015', assetId: 'asset-45', assetName: 'Ubiquiti UniFi USW-Pro-48',assetAssetId: 'AF-000045', reportedBy: 'emp-15', reportedByName: 'Manish Tiwari',    assignedTo: 'emp-15', assignedToName: 'Manish Tiwari',  issueType: 'Hardware',  description: 'Fan 2 on the switch is running at max RPM and making loud noise. Thermal alert triggered.',  priority: 'High',     status: 'Approved',     resolutionNotes: '',                                                                                              partsReplaced: [],                                                        totalCost: 0,     isAiPredicted: true,  createdAt: '2026-07-11T14:00:00Z', resolvedAt: null,                  slaDeadline: '2026-07-14T14:00:00Z' },
];

// ============================================================
// 9. SHARED RESOURCES (8)
// ============================================================

export const sharedResources: SharedResource[] = [
  { id: 'res-1', name: 'Boardroom Alpha',       type: 'Room',      location: 'HQ Tower > 3rd Floor > Room 301',            capacity: 20,   amenities: ['Projector', 'Whiteboard', 'Video Conferencing', 'Air Conditioning'], isActive: true },
  { id: 'res-2', name: 'Meeting Room Beta',      type: 'Room',      location: 'HQ Tower > 2nd Floor > Room 203',            capacity: 8,    amenities: ['TV Display', 'Whiteboard', 'Air Conditioning'],                      isActive: true },
  { id: 'res-3', name: 'Training Hall B',        type: 'Room',      location: 'Annexe Block > Ground Floor > Room G02',     capacity: 40,   amenities: ['Projector', 'PA System', 'Whiteboard', 'Air Conditioning'],          isActive: true },
  { id: 'res-4', name: 'Huddle Space C',         type: 'Room',      location: 'Annexe Block > 1st Floor > Room A102',       capacity: 4,    amenities: ['TV Display', 'Webcam'],                                              isActive: true },
  { id: 'res-5', name: 'Toyota Innova Crysta',   type: 'Vehicle',   location: 'Basement Parking – Slot P1',                 capacity: 7,    amenities: ['GPS', 'First Aid Kit', 'Dashcam'],                                   isActive: true },
  { id: 'res-6', name: 'Maruti Suzuki Ertiga',   type: 'Vehicle',   location: 'Basement Parking – Slot P2',                 capacity: 7,    amenities: ['GPS', 'First Aid Kit'],                                              isActive: true },
  { id: 'res-7', name: '3D Printer – Prusa MK4', type: 'Equipment', location: 'Annexe Block > 2nd Floor > Room A201',       capacity: null,  amenities: ['PLA Filament', 'PETG Filament'],                                     isActive: true },
  { id: 'res-8', name: 'Oscilloscope – Rigol DS1054Z', type: 'Equipment', location: 'Annexe Block > 2nd Floor > Room A201', capacity: null,  amenities: ['4 Channels', 'Logic Analyser Addon'],                                isActive: false },
];

// ============================================================
// 10. BOOKINGS (20)
// ============================================================

export const bookings: Booking[] = [
  { id: 'book-1',  resourceId: 'res-1', resourceName: 'Boardroom Alpha',       resourceType: 'Room',      bookedBy: 'emp-7',  bookedByName: 'Rajesh Iyer',       title: 'IT Quarterly Review',                  date: '2026-07-14', startTime: '10:00', endTime: '12:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-10T08:00:00Z' },
  { id: 'book-2',  resourceId: 'res-1', resourceName: 'Boardroom Alpha',       resourceType: 'Room',      bookedBy: 'emp-9',  bookedByName: 'Deepak Joshi',      title: 'Budget Planning FY27',                 date: '2026-07-14', startTime: '14:00', endTime: '16:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-09T14:00:00Z' },
  { id: 'book-3',  resourceId: 'res-2', resourceName: 'Meeting Room Beta',     resourceType: 'Room',      bookedBy: 'emp-8',  bookedByName: 'Ananya Pillai',     title: 'HR Policy Review',                     date: '2026-07-15', startTime: '11:00', endTime: '12:30', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-11T09:00:00Z' },
  { id: 'book-4',  resourceId: 'res-3', resourceName: 'Training Hall B',       resourceType: 'Room',      bookedBy: 'emp-16', bookedByName: 'Divya Kulkarni',    title: 'New Employee Onboarding – Batch 7',    date: '2026-07-16', startTime: '09:00', endTime: '17:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-08T10:00:00Z' },
  { id: 'book-5',  resourceId: 'res-3', resourceName: 'Training Hall B',       resourceType: 'Room',      bookedBy: 'emp-16', bookedByName: 'Divya Kulkarni',    title: 'New Employee Onboarding – Batch 7',    date: '2026-07-17', startTime: '09:00', endTime: '17:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-08T10:00:00Z' },
  { id: 'book-6',  resourceId: 'res-4', resourceName: 'Huddle Space C',        resourceType: 'Room',      bookedBy: 'emp-13', bookedByName: 'Aditya Banerjee',   title: 'Sprint Planning – IT',                 date: '2026-07-14', startTime: '09:00', endTime: '09:30', status: 'Confirmed',  isRecurring: true,  createdAt: '2026-07-01T08:00:00Z' },
  { id: 'book-7',  resourceId: 'res-5', resourceName: 'Toyota Innova Crysta',  resourceType: 'Vehicle',   bookedBy: 'emp-11', bookedByName: 'Suresh Patil',      title: 'Client Visit – Bangalore Office',      date: '2026-07-15', startTime: '08:00', endTime: '18:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-10T11:00:00Z' },
  { id: 'book-8',  resourceId: 'res-6', resourceName: 'Maruti Suzuki Ertiga',  resourceType: 'Vehicle',   bookedBy: 'emp-22', bookedByName: 'Ravi Shankar',      title: 'Site Inspection – Warehouse',          date: '2026-07-14', startTime: '09:00', endTime: '14:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-11T08:00:00Z' },
  { id: 'book-9',  resourceId: 'res-7', resourceName: '3D Printer – Prusa MK4',resourceType: 'Equipment', bookedBy: 'emp-24', bookedByName: 'Tarun Bhatt',       title: 'Prototype – Enclosure v2.3',           date: '2026-07-14', startTime: '10:00', endTime: '18:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-12T08:00:00Z' },
  { id: 'book-10', resourceId: 'res-1', resourceName: 'Boardroom Alpha',       resourceType: 'Room',      bookedBy: 'emp-10', bookedByName: 'Kavitha Menon',     title: 'Campaign Review – Q3',                 date: '2026-07-18', startTime: '10:00', endTime: '11:30', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-12T09:00:00Z' },
  { id: 'book-11', resourceId: 'res-2', resourceName: 'Meeting Room Beta',     resourceType: 'Room',      bookedBy: 'emp-12', bookedByName: 'Meera Krishnan',    title: 'Engineering Standup',                  date: '2026-07-14', startTime: '09:00', endTime: '09:30', status: 'Confirmed',  isRecurring: true,  createdAt: '2026-07-01T08:00:00Z' },
  { id: 'book-12', resourceId: 'res-5', resourceName: 'Toyota Innova Crysta',  resourceType: 'Vehicle',   bookedBy: 'emp-10', bookedByName: 'Kavitha Menon',     title: 'Media Agency Visit',                   date: '2026-07-18', startTime: '13:00', endTime: '17:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-12T10:00:00Z' },
  { id: 'book-13', resourceId: 'res-4', resourceName: 'Huddle Space C',        resourceType: 'Room',      bookedBy: 'emp-25', bookedByName: 'Swathi Raghavan',   title: 'Code Review Session',                  date: '2026-07-15', startTime: '15:00', endTime: '16:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-12T11:00:00Z' },
  { id: 'book-14', resourceId: 'res-1', resourceName: 'Boardroom Alpha',       resourceType: 'Room',      bookedBy: 'emp-3',  bookedByName: 'Vikram Reddy',      title: 'All-Hands Monthly Meeting',            date: '2026-07-21', startTime: '10:00', endTime: '12:00', status: 'Confirmed',  isRecurring: true,  createdAt: '2026-07-01T08:00:00Z' },
  { id: 'book-15', resourceId: 'res-6', resourceName: 'Maruti Suzuki Ertiga',  resourceType: 'Vehicle',   bookedBy: 'emp-17', bookedByName: 'Sanjay Verma',      title: 'Campus Recruitment Drive',             date: '2026-07-20', startTime: '07:00', endTime: '20:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-11T14:00:00Z' },
  { id: 'book-16', resourceId: 'res-2', resourceName: 'Meeting Room Beta',     resourceType: 'Room',      bookedBy: 'emp-18', bookedByName: 'Pooja Singh',       title: 'Vendor Negotiation Call',               date: '2026-07-16', startTime: '14:00', endTime: '15:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-12T12:00:00Z' },
  { id: 'book-17', resourceId: 'res-3', resourceName: 'Training Hall B',       resourceType: 'Room',      bookedBy: 'emp-7',  bookedByName: 'Rajesh Iyer',       title: 'Security Awareness Training',          date: '2026-07-22', startTime: '10:00', endTime: '13:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-12T13:00:00Z' },
  { id: 'book-18', resourceId: 'res-7', resourceName: '3D Printer – Prusa MK4',resourceType: 'Equipment', bookedBy: 'emp-25', bookedByName: 'Swathi Raghavan',   title: 'Sensor Mount Print',                   date: '2026-07-16', startTime: '08:00', endTime: '20:00', status: 'Confirmed',  isRecurring: false, createdAt: '2026-07-12T08:30:00Z' },
  { id: 'book-19', resourceId: 'res-1', resourceName: 'Boardroom Alpha',       resourceType: 'Room',      bookedBy: 'emp-11', bookedByName: 'Suresh Patil',      title: 'Ops Strategy Review',                  date: '2026-07-10', startTime: '14:00', endTime: '16:00', status: 'Completed',  isRecurring: false, createdAt: '2026-07-05T10:00:00Z' },
  { id: 'book-20', resourceId: 'res-6', resourceName: 'Maruti Suzuki Ertiga',  resourceType: 'Vehicle',   bookedBy: 'emp-21', bookedByName: 'Gaurav Saxena',     title: 'Photography Shoot – Product Launch',   date: '2026-07-08', startTime: '09:00', endTime: '18:00', status: 'Completed',  isRecurring: false, createdAt: '2026-07-05T09:00:00Z' },
];

// ============================================================
// 11. AUDIT CYCLES (3)
// ============================================================

export const auditCycles: AuditCycle[] = [
  {
    id: 'audit-1', name: 'Q1 2026 Full Audit',           scope: 'All Departments', departmentId: null, department: null,
    status: 'Completed', assignedAuditors: ['emp-28', 'emp-29'],
    totalAssets: 45, verifiedCount: 43, discrepancyCount: 2, complianceScore: 95.6,
    startDate: '2026-01-15', endDate: '2026-02-28', createdAt: '2026-01-10T08:00:00Z',
  },
  {
    id: 'audit-2', name: 'Q2 2026 IT Department Audit',   scope: 'IT Department',   departmentId: 'dept-1', department: 'IT',
    status: 'In Progress', assignedAuditors: ['emp-28'],
    totalAssets: 18, verifiedCount: 12, discrepancyCount: 1, complianceScore: 91.7,
    startDate: '2026-06-01', endDate: null, createdAt: '2026-05-28T08:00:00Z',
  },
  {
    id: 'audit-3', name: 'Q3 2026 Operations & Vehicles', scope: 'Operations + Vehicles', departmentId: 'dept-5', department: 'Operations',
    status: 'Planning', assignedAuditors: ['emp-29'],
    totalAssets: 11, verifiedCount: 0, discrepancyCount: 0, complianceScore: 0,
    startDate: '2026-08-01', endDate: null, createdAt: '2026-07-10T08:00:00Z',
  },
];

// ============================================================
// 12. AUDIT ITEMS (30)
// ============================================================

export const auditItems: AuditItem[] = [
  // ---- Audit Cycle 1 (Q1 Full Audit) — 12 items shown ----
  { id: 'ai-1',  auditCycleId: 'audit-1', assetId: 'asset-1',  assetAssetId: 'AF-000001', assetName: 'Dell Latitude 7440',        expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Present and functional',         scannedAt: '2026-01-20T10:15:00Z' },
  { id: 'ai-2',  auditCycleId: 'audit-1', assetId: 'asset-2',  assetAssetId: 'AF-000002', assetName: 'MacBook Pro 16 M3',         expectedLocation: 'Annexe Block > 2nd Floor > Room A201',     status: 'Verified',    auditorId: 'emp-29', auditorName: 'Radhika Kapoor',     comment: 'Confirmed with owner',           scannedAt: '2026-01-22T11:30:00Z' },
  { id: 'ai-3',  auditCycleId: 'audit-1', assetId: 'asset-3',  assetAssetId: 'AF-000003', assetName: 'HP EliteBook 840 G10',      expectedLocation: 'HQ Tower > 2nd Floor > Room 201',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: '',                               scannedAt: '2026-01-20T10:45:00Z' },
  { id: 'ai-4',  auditCycleId: 'audit-1', assetId: 'asset-11', assetAssetId: 'AF-000011', assetName: 'Acer Aspire 5 A515',        expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Damaged',     auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Keyboard non-functional',        scannedAt: '2026-01-20T11:00:00Z' },
  { id: 'ai-5',  auditCycleId: 'audit-1', assetId: 'asset-17', assetAssetId: 'AF-000017', assetName: 'Dell UltraSharp U2723QE',   expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: '',                               scannedAt: '2026-01-20T11:15:00Z' },
  { id: 'ai-6',  auditCycleId: 'audit-1', assetId: 'asset-31', assetAssetId: 'AF-000031', assetName: 'Toyota Innova Crysta',      expectedLocation: 'Basement Parking',                          status: 'Verified',    auditorId: 'emp-29', auditorName: 'Radhika Kapoor',     comment: 'Verified at parking slot P1',    scannedAt: '2026-01-25T09:00:00Z' },
  { id: 'ai-7',  auditCycleId: 'audit-1', assetId: 'asset-44', assetAssetId: 'AF-000044', assetName: 'Cisco Catalyst 9200L',      expectedLocation: 'HQ Tower > 1st Floor > Room 102',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Rack-mounted, S/N confirmed',    scannedAt: '2026-01-20T14:00:00Z' },
  { id: 'ai-8',  auditCycleId: 'audit-1', assetId: 'asset-36', assetAssetId: 'AF-000036', assetName: 'Herman Miller Aeron Chair', expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: '',                               scannedAt: '2026-01-20T14:30:00Z' },
  { id: 'ai-9',  auditCycleId: 'audit-1', assetId: 'asset-26', assetAssetId: 'AF-000026', assetName: 'BenQ MH535',                expectedLocation: 'Annexe Block > Ground Floor > Room G01',   status: 'Mislocated',  auditorId: 'emp-29', auditorName: 'Radhika Kapoor',     comment: 'Found in Training Hall B, not Marketing Hub', scannedAt: '2026-01-24T10:00:00Z' },
  { id: 'ai-10', auditCycleId: 'audit-1', assetId: 'asset-38', assetAssetId: 'AF-000038', assetName: 'Godrej Interio Matrix Chair',expectedLocation: 'HQ Tower > 2nd Floor > Room 201',         status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: '',                               scannedAt: '2026-01-21T09:00:00Z' },
  { id: 'ai-11', auditCycleId: 'audit-1', assetId: 'asset-46', assetAssetId: 'AF-000046', assetName: 'Fortinet FortiGate 60F',    expectedLocation: 'HQ Tower > 1st Floor > Room 102',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Rack-mounted, operational',      scannedAt: '2026-01-20T14:15:00Z' },
  { id: 'ai-12', auditCycleId: 'audit-1', assetId: 'asset-50', assetAssetId: 'AF-000050', assetName: 'Synology RS1221+ NAS',      expectedLocation: 'HQ Tower > 1st Floor > Room 102',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'RAID healthy, all bays populated',scannedAt: '2026-01-20T14:45:00Z' },

  // ---- Audit Cycle 2 (Q2 IT Audit) — 12 items ----
  { id: 'ai-13', auditCycleId: 'audit-2', assetId: 'asset-1',  assetAssetId: 'AF-000001', assetName: 'Dell Latitude 7440',        expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: '',                               scannedAt: '2026-06-05T10:00:00Z' },
  { id: 'ai-14', auditCycleId: 'audit-2', assetId: 'asset-7',  assetAssetId: 'AF-000007', assetName: 'HP ProBook 450 G10',        expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Under maintenance – confirmed in repair queue', scannedAt: '2026-06-05T10:30:00Z' },
  { id: 'ai-15', auditCycleId: 'audit-2', assetId: 'asset-11', assetAssetId: 'AF-000011', assetName: 'Acer Aspire 5 A515',        expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Retired – in decommission shelf',scannedAt: '2026-06-05T10:45:00Z' },
  { id: 'ai-16', auditCycleId: 'audit-2', assetId: 'asset-12', assetAssetId: 'AF-000012', assetName: 'Dell Inspiron 15 3520',     expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Spare pool – available',         scannedAt: '2026-06-05T11:00:00Z' },
  { id: 'ai-17', auditCycleId: 'audit-2', assetId: 'asset-15', assetAssetId: 'AF-000015', assetName: 'Dell Latitude 5440',        expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Reserved – sealed box',          scannedAt: '2026-06-05T11:15:00Z' },
  { id: 'ai-18', auditCycleId: 'audit-2', assetId: 'asset-17', assetAssetId: 'AF-000017', assetName: 'Dell UltraSharp U2723QE',   expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: '',                               scannedAt: '2026-06-05T11:30:00Z' },
  { id: 'ai-19', auditCycleId: 'audit-2', assetId: 'asset-21', assetAssetId: 'AF-000021', assetName: 'LG 27UK850-W',              expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Damaged',     auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Display flickering – maintenance pending', scannedAt: '2026-06-06T09:00:00Z' },
  { id: 'ai-20', auditCycleId: 'audit-2', assetId: 'asset-24', assetAssetId: 'AF-000024', assetName: 'AOC 24B2XH',               expectedLocation: 'HQ Tower > 1st Floor > Room 101',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Spare – boxed',                  scannedAt: '2026-06-06T09:15:00Z' },
  { id: 'ai-21', auditCycleId: 'audit-2', assetId: 'asset-44', assetAssetId: 'AF-000044', assetName: 'Cisco Catalyst 9200L',      expectedLocation: 'HQ Tower > 1st Floor > Room 102',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Firmware updated recently',      scannedAt: '2026-06-06T10:00:00Z' },
  { id: 'ai-22', auditCycleId: 'audit-2', assetId: 'asset-45', assetAssetId: 'AF-000045', assetName: 'Ubiquiti UniFi USW-Pro-48', expectedLocation: 'HQ Tower > 1st Floor > Room 102',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: '',                               scannedAt: '2026-06-06T10:15:00Z' },
  { id: 'ai-23', auditCycleId: 'audit-2', assetId: 'asset-46', assetAssetId: 'AF-000046', assetName: 'Fortinet FortiGate 60F',    expectedLocation: 'HQ Tower > 1st Floor > Room 102',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'FortiOS 7.4.4 confirmed',       scannedAt: '2026-06-06T10:30:00Z' },
  { id: 'ai-24', auditCycleId: 'audit-2', assetId: 'asset-50', assetAssetId: 'AF-000050', assetName: 'Synology RS1221+ NAS',      expectedLocation: 'HQ Tower > 1st Floor > Room 102',          status: 'Verified',    auditorId: 'emp-28', auditorName: 'Prakash Srinivasan', comment: 'Drive 3 recently replaced',     scannedAt: '2026-06-06T10:45:00Z' },

  // ---- Audit Cycle 3 (Q3 Planning) — 6 items (pre-populated, all pending) ----
  { id: 'ai-25', auditCycleId: 'audit-3', assetId: 'asset-9',  assetAssetId: 'AF-000009', assetName: 'Dell Latitude 7440',        expectedLocation: 'Annexe Block > 1st Floor > Room A101',     status: 'Pending',     auditorId: null,     auditorName: null,                  comment: '',                               scannedAt: null },
  { id: 'ai-26', auditCycleId: 'audit-3', assetId: 'asset-22', assetAssetId: 'AF-000022', assetName: 'HP E24 G5',                 expectedLocation: 'Annexe Block > 1st Floor > Room A101',     status: 'Pending',     auditorId: null,     auditorName: null,                  comment: '',                               scannedAt: null },
  { id: 'ai-27', auditCycleId: 'audit-3', assetId: 'asset-31', assetAssetId: 'AF-000031', assetName: 'Toyota Innova Crysta',      expectedLocation: 'Basement Parking – Slot P1',               status: 'Pending',     auditorId: null,     auditorName: null,                  comment: '',                               scannedAt: null },
  { id: 'ai-28', auditCycleId: 'audit-3', assetId: 'asset-32', assetAssetId: 'AF-000032', assetName: 'Maruti Suzuki Ertiga',      expectedLocation: 'Basement Parking – Slot P2',               status: 'Pending',     auditorId: null,     auditorName: null,                  comment: '',                               scannedAt: null },
  { id: 'ai-29', auditCycleId: 'audit-3', assetId: 'asset-35', assetAssetId: 'AF-000035', assetName: 'Mahindra Bolero Neo',       expectedLocation: 'Annexe Block > 1st Floor > Room A101',     status: 'Pending',     auditorId: null,     auditorName: null,                  comment: '',                               scannedAt: null },
  { id: 'ai-30', auditCycleId: 'audit-3', assetId: 'asset-48', assetAssetId: 'AF-000048', assetName: 'TP-Link TL-SG108',          expectedLocation: 'Annexe Block > 1st Floor > Room A101',     status: 'Pending',     auditorId: null,     auditorName: null,                  comment: '',                               scannedAt: null },
];

// ============================================================
// 13. NOTIFICATIONS (20)
// ============================================================

export const notifications: Notification[] = [
  { id: 'notif-1',  type: 'maintenance',    title: 'Maintenance Request Assigned',         message: 'You have been assigned MR-0000001 (HP ProBook 450 G10 – battery issue).',                    recipientId: 'emp-4',  priority: 'High',   isRead: false, link: '/maintenance/maint-1',   createdAt: '2026-07-01T12:35:00Z' },
  { id: 'notif-2',  type: 'maintenance',    title: 'Critical: Vehicle Transmission Fault', message: 'MR-0000003 (Mahindra Bolero Neo) flagged as CRITICAL. Immediate attention required.',          recipientId: 'emp-5',  priority: 'Urgent', isRead: false, link: '/maintenance/maint-3',   createdAt: '2026-07-08T14:35:00Z' },
  { id: 'notif-3',  type: 'request',        title: 'Asset Request Approved',               message: 'Your laptop request REQ-2026-001 has been approved. Dell Inspiron 15 3520 assigned.',          recipientId: 'emp-13', priority: 'Normal', isRead: true,  link: '/requests/req-1',        createdAt: '2026-07-02T11:35:00Z' },
  { id: 'notif-4',  type: 'request',        title: 'New Request Awaiting Approval',        message: 'Lakshmi Venkatesh requested a Monitor. Awaiting your approval.',                               recipientId: 'emp-10', priority: 'Normal', isRead: false, link: '/requests/req-2',        createdAt: '2026-07-05T09:05:00Z' },
  { id: 'notif-5',  type: 'request',        title: 'Request Rejected',                     message: 'Your vehicle request REQ-2026-006 was rejected. Reason: Budget exhausted for FY26.',           recipientId: 'emp-22', priority: 'Normal', isRead: true,  link: '/requests/req-6',        createdAt: '2026-06-06T11:05:00Z' },
  { id: 'notif-6',  type: 'warranty',       title: 'Warranty Expiring Soon',               message: 'BenQ MH535 (AF-000026) warranty expires on 2026-02-20. Consider renewal or replacement.',      recipientId: 'emp-4',  priority: 'High',   isRead: false, link: '/assets/asset-26',       createdAt: '2026-01-20T08:00:00Z' },
  { id: 'notif-7',  type: 'warranty',       title: 'Warranty Expiring Soon',               message: 'Epson EB-X51 (AF-000027) warranty expired on 2026-01-10.',                                     recipientId: 'emp-4',  priority: 'High',   isRead: true,  link: '/assets/asset-27',       createdAt: '2025-12-10T08:00:00Z' },
  { id: 'notif-8',  type: 'ai_prediction',  title: 'AI Alert: NAS Drive Failure Predicted', message: 'Synology NAS (AF-000050) Drive Bay 3 predicted to fail within 30 days. Proactive replacement recommended.', recipientId: 'emp-15', priority: 'High', isRead: true, link: '/ai/predictions', createdAt: '2026-06-25T08:00:00Z' },
  { id: 'notif-9',  type: 'ai_prediction',  title: 'AI Alert: Projector Lamp Near EOL',   message: 'Epson EB-X51 (AF-000027) lamp at 96% usage. Schedule replacement to avoid meeting disruptions.',recipientId: 'emp-4',  priority: 'Normal', isRead: false, link: '/ai/predictions',        createdAt: '2026-07-05T08:00:00Z' },
  { id: 'notif-10', type: 'audit',          title: 'Audit Cycle Started',                  message: 'Q2 2026 IT Department Audit has begun. 18 assets to verify.',                                  recipientId: 'emp-28', priority: 'Normal', isRead: true,  link: '/audits/audit-2',        createdAt: '2026-06-01T08:00:00Z' },
  { id: 'notif-11', type: 'audit',          title: 'Audit Discrepancy Found',              message: 'LG 27UK850-W (AF-000021) marked as Damaged during IT audit.',                                  recipientId: 'emp-4',  priority: 'High',   isRead: false, link: '/audits/audit-2',        createdAt: '2026-06-06T09:05:00Z' },
  { id: 'notif-12', type: 'booking',        title: 'Booking Confirmed',                    message: 'Boardroom Alpha booked for "IT Quarterly Review" on Jul 14, 10:00–12:00.',                     recipientId: 'emp-7',  priority: 'Low',    isRead: true,  link: '/bookings/book-1',       createdAt: '2026-07-10T08:05:00Z' },
  { id: 'notif-13', type: 'booking',        title: 'Booking Reminder',                     message: 'Reminder: You have Boardroom Alpha booked tomorrow (Jul 14) at 14:00.',                        recipientId: 'emp-9',  priority: 'Normal', isRead: false, link: '/bookings/book-2',       createdAt: '2026-07-13T08:00:00Z' },
  { id: 'notif-14', type: 'system',         title: 'System Maintenance Scheduled',         message: 'AssetFlow AI will undergo maintenance on Jul 20, 02:00–04:00 IST. Expect brief downtime.',     recipientId: 'emp-1',  priority: 'Normal', isRead: false, link: '/',                      createdAt: '2026-07-12T08:00:00Z' },
  { id: 'notif-15', type: 'maintenance',    title: 'Maintenance Completed',                message: 'MR-0000005 (Cisco Catalyst 9200L) firmware update completed successfully.',                    recipientId: 'emp-7',  priority: 'Low',    isRead: true,  link: '/maintenance/maint-5',   createdAt: '2026-06-16T18:05:00Z' },
  { id: 'notif-16', type: 'maintenance',    title: 'AI-Predicted Maintenance',             message: 'AI flagged UniFi USW-Pro-48 (AF-000045) – Fan 2 thermal anomaly detected. Maintenance recommended.', recipientId: 'emp-15', priority: 'High', isRead: false, link: '/maintenance/maint-15', createdAt: '2026-07-11T14:05:00Z' },
  { id: 'notif-17', type: 'request',        title: 'New Request Awaiting Approval',        message: 'Sanjay Verma requested a Laptop for campus recruitment. Awaiting your approval.',              recipientId: 'emp-4',  priority: 'Normal', isRead: false, link: '/requests/req-8',        createdAt: '2026-07-09T10:05:00Z' },
  { id: 'notif-18', type: 'asset',          title: 'Asset Retired',                        message: 'Acer Aspire 5 A515 (AF-000011) has been decommissioned and retired from inventory.',           recipientId: 'emp-4',  priority: 'Low',    isRead: true,  link: '/assets/asset-11',       createdAt: '2026-03-10T09:05:00Z' },
  { id: 'notif-19', type: 'audit',          title: 'Q3 Audit Planning Started',            message: 'Q3 2026 Operations & Vehicles audit cycle has been created. Target start: Aug 1.',             recipientId: 'emp-29', priority: 'Normal', isRead: false, link: '/audits/audit-3',        createdAt: '2026-07-10T08:05:00Z' },
  { id: 'notif-20', type: 'ai_prediction',  title: 'AI Risk Assessment Updated',           message: 'Weekly AI risk assessment complete. 3 assets flagged as High/Critical risk. Review dashboard.',recipientId: 'emp-1',  priority: 'Normal', isRead: false, link: '/ai/predictions',        createdAt: '2026-07-12T06:00:00Z' },
];

// ============================================================
// 14. AI PREDICTIONS (8)
// ============================================================

export const aiPredictions: AIPrediction[] = [
  {
    id: 'pred-1', assetId: 'asset-7', assetName: 'HP ProBook 450 G10', assetAssetId: 'AF-000007',
    overallRisk: 82, riskTier: 'High',
    components: [
      { name: 'Battery', risk: 95 },
      { name: 'Motherboard', risk: 40 },
      { name: 'Display', risk: 20 },
      { name: 'Keyboard', risk: 35 },
    ],
    predictedFailureDays: 15, likelyComponent: 'Battery',
    recommendation: 'Replace battery immediately. Current swelling indicates thermal runaway risk. Order HP Battery Part #L78555-005.',
    createdAt: '2026-07-10T06:00:00Z',
  },
  {
    id: 'pred-2', assetId: 'asset-27', assetName: 'Epson EB-X51', assetAssetId: 'AF-000027',
    overallRisk: 78, riskTier: 'High',
    components: [
      { name: 'Lamp', risk: 96 },
      { name: 'Color Wheel', risk: 30 },
      { name: 'Fan', risk: 25 },
      { name: 'Lens', risk: 10 },
    ],
    predictedFailureDays: 20, likelyComponent: 'Lamp',
    recommendation: 'Projector lamp at 4800/5000 hours. Order replacement lamp (ELPLP97) before complete failure during meetings.',
    createdAt: '2026-07-10T06:00:00Z',
  },
  {
    id: 'pred-3', assetId: 'asset-35', assetName: 'Mahindra Bolero Neo', assetAssetId: 'AF-000035',
    overallRisk: 88, riskTier: 'Critical',
    components: [
      { name: 'Transmission', risk: 92 },
      { name: 'Engine', risk: 45 },
      { name: 'Suspension', risk: 55 },
      { name: 'Brakes', risk: 38 },
    ],
    predictedFailureDays: 5, likelyComponent: 'Transmission',
    recommendation: 'Critical: Transmission gearbox showing severe wear. Vehicle should remain out of service until full gearbox replacement. Estimated cost: ₹85,000.',
    createdAt: '2026-07-10T06:00:00Z',
  },
  {
    id: 'pred-4', assetId: 'asset-21', assetName: 'LG 27UK850-W', assetAssetId: 'AF-000021',
    overallRisk: 65, riskTier: 'Medium',
    components: [
      { name: 'TCON Board', risk: 78 },
      { name: 'Backlight', risk: 35 },
      { name: 'Power Supply', risk: 22 },
      { name: 'Panel', risk: 15 },
    ],
    predictedFailureDays: 45, likelyComponent: 'TCON Board',
    recommendation: 'TCON board likely causing display flickering. Replacement cost ~₹4,500. Consider replacing vs buying new monitor (monitor is 2 years old).',
    createdAt: '2026-07-10T06:00:00Z',
  },
  {
    id: 'pred-5', assetId: 'asset-45', assetName: 'Ubiquiti UniFi USW-Pro-48', assetAssetId: 'AF-000045',
    overallRisk: 72, riskTier: 'High',
    components: [
      { name: 'Fan Module', risk: 88 },
      { name: 'Power Supply', risk: 30 },
      { name: 'Port Module', risk: 15 },
      { name: 'Firmware', risk: 20 },
    ],
    predictedFailureDays: 30, likelyComponent: 'Fan Module',
    recommendation: 'Fan 2 showing thermal anomaly. Replace fan module to prevent overheating-induced switch failure. Network downtime risk if unaddressed.',
    createdAt: '2026-07-10T06:00:00Z',
  },
  {
    id: 'pred-6', assetId: 'asset-31', assetName: 'Toyota Innova Crysta', assetAssetId: 'AF-000031',
    overallRisk: 48, riskTier: 'Medium',
    components: [
      { name: 'Brake System', risk: 55 },
      { name: 'Engine', risk: 30 },
      { name: 'Suspension', risk: 45 },
      { name: 'Tyres', risk: 60 },
    ],
    predictedFailureDays: 90, likelyComponent: 'Tyres',
    recommendation: 'Tyres approaching 45,000 km mark. Schedule tyre replacement within next service cycle. Recommend Michelin Primacy 4 for this model.',
    createdAt: '2026-07-10T06:00:00Z',
  },
  {
    id: 'pred-7', assetId: 'asset-50', assetName: 'Synology RS1221+ NAS', assetAssetId: 'AF-000050',
    overallRisk: 35, riskTier: 'Low',
    components: [
      { name: 'Drive Bay 1', risk: 15 },
      { name: 'Drive Bay 2', risk: 18 },
      { name: 'Drive Bay 3', risk: 5 },
      { name: 'Drive Bay 4', risk: 12 },
      { name: 'Drive Bay 5', risk: 22 },
      { name: 'Power Supply', risk: 10 },
    ],
    predictedFailureDays: 180, likelyComponent: 'Drive Bay 5',
    recommendation: 'Post Drive 3 replacement, overall NAS health improved. Drive 5 showing early SMART warnings – monitor monthly. No immediate action needed.',
    createdAt: '2026-07-10T06:00:00Z',
  },
  {
    id: 'pred-8', assetId: 'asset-11', assetName: 'Acer Aspire 5 A515', assetAssetId: 'AF-000011',
    overallRisk: 95, riskTier: 'Critical',
    components: [
      { name: 'Keyboard', risk: 100 },
      { name: 'Battery', risk: 75 },
      { name: 'Display', risk: 60 },
      { name: 'Storage', risk: 45 },
    ],
    predictedFailureDays: 0, likelyComponent: 'Keyboard',
    recommendation: 'Asset already retired. Multiple component failures. Keyboard completely non-functional. Not economically viable to repair – confirmed for e-waste disposal.',
    createdAt: '2026-07-10T06:00:00Z',
  },
];
