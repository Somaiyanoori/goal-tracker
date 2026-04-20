export function calculateProgress(current, target) {
  if (
    typeof current !== "number" ||
    typeof target !== "number" ||
    target <= 0
  ) {
    return 0;
  }
  return Math.min(100, Math.max(0, Math.round((current / target) * 100)));
}
export function calculateOverallCompletion(goals = []) {
  const activeGoals = goals.filter((g) => g.status === "active");
  if (!activeGoals.length) {
    return goals.some((g) => g.status === "completed") ? 100 : 0;
  }

  const sumOfProgress = activeGoals.reduce(
    (acc, g) => acc + calculateProgress(g.progress, g.target),
    0,
  );

  return Math.round(sumOfProgress / activeGoals.length);
}
