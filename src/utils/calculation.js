const XP_PER_LOG = 10;
const XP_COMPLETION_BONUS = 50;
// Progress
export function calculateProgress(current, target) {
    if (typeof current !== "number" || typeof target !== "number" || target <= 0) return 0;
    const percentage = (current / target) * 100;
    return Math.min(100, Math.max(0, Math.round(percentage)));
}
// Streak
export function calculateStreak(logs) {
    if (!logs || logs.length === 0) return 0;
    const oneDay = 1000 * 60 * 60 * 24;
    const dates = [...new Set(
    logs.map(date => {
      const d = new Date(date).filter(d => !isNaN(d));
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    })
  )].sort((a, b) => b - a); 
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;
    let currentDay = today.getTime();
    for (let i = 0; i < dates.length; i++) {
        const logDay = dates[i];
        if (logDay === currentDay) {
            streak++;
            currentDay -= oneDay;
        }  else if (logDay === currentDay - oneDay && streak === 0) {
            streak++;
            currentDay = logDay - oneDay;
        } else {
            break;
        }
    }
    return streak;
}
// XP
export function calculateXP(goals) {
    if (!goals || goals.length === 0) {
        return { totalXP: 0, level: 0, xpInCurrentLevel: 0 };
    }
    let totalXP = 0;
    goals.forEach(goal => {
        if (!goal) return;
        if (Array.isArray(goal.logs)) {
            totalXP += goal.logs.length * XP_PER_LOG;
        }
        if (goal.status === "completed") {
            totalXP += XP_COMPLETION_BONUS;
        }
    });
    return {
        totalXP,
        level: Math.floor(totalXP / 100),
        xpInCurrentLevel: totalXP % 100,
    };
}
// Completion
export function isGoalCompleted(current, target) {
    return current >= target;
}