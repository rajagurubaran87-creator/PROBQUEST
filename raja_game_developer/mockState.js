/**
 * Persistence & Mock Data Layer for ProbQuest
 * Manages player profile, zone unlock status, XP, badges, and Instructor Analytics.
 */

const STORAGE_KEY = 'probquest_player_state_v1';

export const INITIAL_PLAYER_STATE = {
  name: 'Student Explorer',
  level: 3,
  xp: 850,
  streak: 4,
  unlockedZoneIds: ['z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7'], // Starter unlocked zones
  completedZoneIds: ['z1', 'z2', 'z3'],
  badges: [
    { id: 'b1', name: 'Fortune Seeker', zoneId: 'z1', earnedAt: '2026-07-25' },
    { id: 'b2', name: 'Master Sleuth', zoneId: 'z2', earnedAt: '2026-07-27' },
    { id: 'b3', name: 'Dichotomy Master', zoneId: 'z3', earnedAt: '2026-07-28' },
  ],
  quizScores: {
    z1: { score: 5, total: 5, percentage: 100 },
    z2: { score: 4, total: 5, percentage: 80 },
    z3: { score: 5, total: 5, percentage: 100 },
  }
};

export function loadPlayerState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PLAYER_STATE;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load player state:', e);
    return INITIAL_PLAYER_STATE;
  }
}

export function savePlayerState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save player state:', e);
  }
}

// --- Mock Class Data for Instructor Dashboard ---
export const MOCK_CLASS_DATA = {
  courseName: 'Probability & Statistics for Engineers (CS201)',
  courseOutcome: 'CO1 — Understand the fundamental concepts of probability and examine discrete probability',
  totalStudents: 48,
  averageAttainment: 84.2, // %
  students: [
    { id: 's1', name: 'Alex Rivera', email: 'alex.r@univ.edu', completedZones: 14, avgScore: 92, lastActive: '2 hours ago', status: 'Mastered' },
    { id: 's2', name: 'Bianca Chen', email: 'b.chen@univ.edu', completedZones: 12, avgScore: 88, lastActive: '1 day ago', status: 'Proficient' },
    { id: 's3', name: 'Carlos Gomez', email: 'c.gomez@univ.edu', completedZones: 9, avgScore: 78, lastActive: '3 hours ago', status: 'Proficient' },
    { id: 's4', name: 'David Kim', email: 'd.kim@univ.edu', completedZones: 14, avgScore: 96, lastActive: '30 mins ago', status: 'Mastered' },
    { id: 's5', name: 'Elena Rostova', email: 'elena.r@univ.edu', completedZones: 6, avgScore: 64, lastActive: '4 days ago', status: 'Needs Practice' },
    { id: 's6', name: 'Farhan Ali', email: 'f.ali@univ.edu', completedZones: 11, avgScore: 82, lastActive: '5 hours ago', status: 'Proficient' },
    { id: 's7', name: 'Grace Hopper', email: 'ghopper@univ.edu', completedZones: 14, avgScore: 100, lastActive: '10 mins ago', status: 'Mastered' },
    { id: 's8', name: 'Hassan Mahmoud', email: 'hassan.m@univ.edu', completedZones: 4, avgScore: 58, lastActive: '6 days ago', status: 'Needs Support' },
  ],
  topicMasteryHeatmap: [
    { zoneId: 'z1', topic: 'Basic Probability', unit: 'Unit I', masteryPct: 94, missteps: 'Confusing sample space count' },
    { zoneId: 'z2', topic: 'Conditional Probability', unit: 'Unit I', masteryPct: 86, missteps: 'Shrinking sample space denominator' },
    { zoneId: 'z3', topic: 'Independence', unit: 'Unit I', masteryPct: 82, missteps: 'Conflating independence with mutual exclusivity' },
    { zoneId: 'z4', topic: "Bayes' Theorem", unit: 'Unit I', masteryPct: 74, missteps: 'Neglecting low prior prevalence' },
    { zoneId: 'z5', topic: 'Discrete RV & CDF', unit: 'Unit I', masteryPct: 90, missteps: 'Step function continuity' },
    { zoneId: 'z6', topic: 'Mean & Variance (discrete)', unit: 'Unit I', masteryPct: 85, missteps: 'E[X^2] calculation' },
    { zoneId: 'z7', topic: 'Binomial Distribution', unit: 'Unit I', masteryPct: 88, missteps: 'Selecting nCk formula' },
    { zoneId: 'z8', topic: 'Poisson Distribution', unit: 'Unit I', masteryPct: 79, missteps: 'Time-interval rate scaling' },
    { zoneId: 'z9', topic: 'Geometric Distribution', unit: 'Unit I', masteryPct: 81, missteps: 'Memoryless interpretation' },
    { zoneId: 'z10', topic: 'Continuous RVs & CDF', unit: 'Unit II', masteryPct: 76, missteps: 'Point probability P(X=x) misconception' },
    { zoneId: 'z11', topic: 'Mean & Variance (continuous)', unit: 'Unit II', masteryPct: 72, missteps: 'Integration centroid evaluation' },
    { zoneId: 'z12', topic: 'Uniform Distribution', unit: 'Unit II', masteryPct: 91, missteps: 'Height f(x) calculation' },
    { zoneId: 'z13', topic: 'Exponential Distribution', unit: 'Unit II', masteryPct: 75, missteps: 'Decay parameter vs mean wait time' },
    { zoneId: 'z14', topic: 'Normal Distribution', unit: 'Unit II', masteryPct: 89, missteps: 'Z-score sign direction' },
  ]
};
