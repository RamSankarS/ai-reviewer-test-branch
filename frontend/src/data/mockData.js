export const overviewStats = {
  totalScanned: "1,234",
  vulnerabilitiesBlocked: 45,
  criticalBugs: 12,
  performanceIssues: 23,
  healthScore: 78
};

export const vulnerabilityData = [
  { name: 'Security', value: 35, color: '#10B981' }, // Emerald
  { name: 'Logic Bugs', value: 40, color: '#0EA5E9' }, // Sky
  { name: 'Code Smells', value: 15, color: '#6366F1' }, // Indigo
  { name: 'Performance', value: 10, color: '#3B82F6' }, // Blue
];

export const recentActivity = [
  {
    id: 1,
    pr: "#126",
    user: "DevUser1",
    message: "reviewed 3 smells detected",
    time: "5 mins ago",
    status: "warning"
  },
  {
    id: 2,
    pr: "#125",
    user: "DevUser2",
    message: "PASSED security scan. No vulnerabilities",
    time: "12 mins ago",
    status: "success"
  },
  {
    id: 3,
    pr: "#124",
    user: "DevUser3",
    message: "FAILED security scan: Hardcoded Key! Blocked.",
    time: "1 hour ago",
    status: "danger"
  }
];

export const topRepos = [
  { id: 1, name: "lethe-logistics-core", health: 88, status: "good" },
  { id: 2, name: "pharmachain-backend", health: 75, status: "warning" },
  { id: 3, name: "birdle-flutter-app", health: 91, status: "good" }
];