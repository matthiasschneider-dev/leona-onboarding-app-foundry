// String literal types
export type OnboardingFormat = 'On-site' | 'Remote' | 'Hybrid';
export type PackageEntry = 'STARTER' | 'ENABLED' | 'MASTER';
export type OnboardingStep = 'Pre-boarding' | 'Orientation' | 'Training' | 'Integration';
export type AttendanceStatus = 'Present' | 'Optional';
export type Quadrant = 'Quick Wins' | 'Strategic Bets' | 'Fill-in Jobs' | 'Money Pits';
export type ShiftType = 'Morning' | 'Afternoon' | 'Evening';
export type ShiftStatus = 'Scheduled' | 'Completed' | 'In Progress';

// Interfaces
export interface Participant {
  id: string;
  name: string;
  role: string;
  attendance: AttendanceStatus;
}

export interface MaturityLevel {
  level: number;
  label: string;
  description: string;
}

export interface UseCase {
  id: string;
  title: string;
  cluster: string;
  who: string;
  problem: string;
  impact: number;
  effort: number;
  votes: number;
  quadrant: Quadrant;
  processes?: string;
}

export interface Metric {
  id: string;
  kpi: string;
  baseline: string;
  target: string;
}

export interface Milestone {
  id: string;
  month: string;
  description: string;
}

export interface Canvas {
  skill: string;
  mentor: string;
  metrics: Metric[];
  scopeIn: string;
  scopeOut: string;
  solution: string;
  timeline: Milestone[];
  resources: string;
  risks: string;
}

export interface Action {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  done: boolean;
}

export interface OnboardingActivity {
  name: string;
  mentor: string;
  format: OnboardingFormat;
  packageEntry: PackageEntry;
  duration: number;
  outputs: string[];
  constraints: string[];
}

export interface Brand {
  logoText: string;
  customerName: string;
  darkMode: boolean;
}

export interface Phase {
  id: string;
  name: string;
  duration: string;
  description: string;
  color: string;
}

export interface ShiftEntry {
  id: string;
  participantId: string;
  participantName: string;
  date: string;
  shift: ShiftType;
  status: ShiftStatus;
}

// App state interface
export interface AppState {
  onboardingActivity: OnboardingActivity;
  participants: Participant[];
  maturity: {
    currentLevel: number;
    targetLevel: number;
  };
  useCases: UseCase[];
  selectedUseCaseId: string | null;
  canvas: Canvas;
  actions: Action[];
  brand: Brand;
  shifts: ShiftEntry[];
}

// Toast notification types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  message: string;
  type: ToastType;
}
