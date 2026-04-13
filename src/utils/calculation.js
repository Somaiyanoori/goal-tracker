export function calculateProgress(current, target) {
  if (
    typeof current !== "number" ||
    typeof target !== "number" ||
    target <= 0
  ) {
    return 0;
  }
  const percentage = (current / target) * 100;
  return Math.min(100, Math.max(0, Math.round(percentage)));
}
export function calculateOverallCompletion(goals = []) {
  const activeGoals = goals.filter((goal) => goal.status === "active");
  if (activeGoals.length === 0) {
    return 0;
  }

  const totalProgressPercentage = activeGoals.reduce((sum, goal) => {
    return sum + calculateProgress(goal.progress, goal.target);
  }, 0);

  return Math.round(totalProgressPercentage / activeGoals.length);
}

export function calculateOverallStreak(goals = []) {
  if (!goals || goals.length === 0) {
    return 0;
  }
  const allLogDates = goals.flatMap((goal) =>
    goal.logs ? goal.logs.map((log) => log.date) : [],
  );

  if (allLogDates.length === 0) {
    return 0;
  }
  const uniqueActivityDays = new Set(
    allLogDates.map((date) => new Date(date).setHours(0, 0, 0, 0)),
  );

  // 3. Calculate streak from today backwards.
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const today = new Date().setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDay = today;

  if (uniqueActivityDays.has(currentDay)) {
    // Activity today, start counting from today
    while (uniqueActivityDays.has(currentDay)) {
      streak++;
      currentDay -= oneDayInMs;
    }
  } else if (uniqueActivityDays.has(currentDay - oneDayInMs)) {
    streak = 1;
    currentDay = currentDay - oneDayInMs * 2;
    while (uniqueActivityDays.has(currentDay)) {
      streak++;
      currentDay -= oneDayInMs;
    }
  }

  return streak;
}
