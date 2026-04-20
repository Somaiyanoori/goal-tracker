import { createContext, useMemo, useCallback } from "react"; // ADDED createContext here
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

// REMOVED: import { GoalContext } from "./GoalContextValue";
// ADDED: Define and export the context directly in this file.
export const GoalContext = createContext(null);

const XP_PER_LOG = 10;
const XP_COMPLETION_BONUS = 50;

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useLocalStorage("goals", []);
  const [userStats, setUserStats] = useLocalStorage("userStats", {
    xp: 0,
    completedCount: 0,
    streak: 0,
    lastActiveDate: null,
  });

  const updateUserStatsOnActivity = useCallback(
    (xpGained = 0, completedChange = 0) => {
      setUserStats((prev) => {
        const todayStr = new Date().toISOString().split("T")[0];
        const lastActiveStr = prev.lastActiveDate
          ? new Date(prev.lastActiveDate).toISOString().split("T")[0]
          : null;

        let newStreak = prev.streak || 0;

        if (todayStr !== lastActiveStr) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0];

          if (lastActiveStr === yesterdayStr) {
            newStreak = prev.streak + 1;
          } else {
            newStreak = 1;
          }
        }

        return {
          ...prev,
          xp: (prev.xp || 0) + xpGained,
          completedCount: Math.max(
            0,
            (prev.completedCount || 0) + completedChange,
          ),
          streak: newStreak,
          lastActiveDate: new Date().toISOString(),
        };
      });
    },
    [setUserStats],
  );

  const addGoal = useCallback(
    (goalData) => {
      const newGoal = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
        status: "active",
        logs: [],
        notes: "",
        ...goalData,
      };
      setGoals((prev) => [newGoal, ...prev]);
    },
    [setGoals],
  );

  const deleteGoal = useCallback(
    (id) => {
      setGoals((prev) => prev.filter((g) => g.id !== id));
    },
    [setGoals],
  );

  const updateGoal = useCallback(
    (id, updatedFields) => {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === id
            ? { ...g, ...updatedFields, updatedAt: new Date().toISOString() }
            : g,
        ),
      );
    },
    [setGoals],
  );

  const logProgress = useCallback(
    (goalId, amount = 1) => {
      let goalJustCompleted = false;

      setGoals((prevGoals) =>
        prevGoals.map((g) => {
          if (g.id !== goalId || g.status !== "active") return g;
          const newProgress = Math.min(g.target, g.progress + amount);
          const isNowComplete = newProgress >= g.target;
          if (isNowComplete && g.progress < g.target) goalJustCompleted = true;
          return {
            ...g,
            progress: newProgress,
            status: isNowComplete ? "completed" : g.status,
            updatedAt: new Date().toISOString(),
            logs: [
              ...g.logs,
              { id: uuidv4(), date: new Date().toISOString(), amount },
            ],
          };
        }),
      );
      const xpGained =
        XP_PER_LOG + (goalJustCompleted ? XP_COMPLETION_BONUS : 0);
      updateUserStatsOnActivity(xpGained, goalJustCompleted ? 1 : 0);
    },
    [setGoals, updateUserStatsOnActivity],
  );

  const markComplete = useCallback(
    (id) => {
      let wasAlreadyComplete = false;
      setGoals((prev) =>
        prev.map((g) => {
          if (g.id === id) {
            wasAlreadyComplete = g.status === "completed";
            return {
              ...g,
              progress: g.target,
              status: "completed",
              updatedAt: new Date().toISOString(),
            };
          }
          return g;
        }),
      );
      if (!wasAlreadyComplete) {
        updateUserStatsOnActivity(XP_COMPLETION_BONUS, 1);
      }
    },
    [setGoals, updateUserStatsOnActivity],
  );

  const togglePause = useCallback(
    (id) => {
      setGoals((prev) =>
        prev.map((g) => {
          if (g.id !== id || g.status === "completed") return g;
          return {
            ...g,
            status: g.status === "paused" ? "active" : "paused",
            updatedAt: new Date().toISOString(),
          };
        }),
      );
    },
    [setGoals],
  );

  const restoreGoal = useCallback(
    (id) => {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === id && g.status === "completed"
            ? { ...g, status: "active", updatedAt: new Date().toISOString() }
            : g,
        ),
      );
      setUserStats((prev) => ({
        ...prev,
        completedCount: Math.max(0, (prev.completedCount || 0) - 1),
      }));
    },
    [setGoals, setUserStats],
  );

  const clearAllGoals = useCallback(() => {
    setGoals([]);
    setUserStats({ xp: 0, completedCount: 0, streak: 0, lastActiveDate: null });
  }, [setGoals, setUserStats]);

  const activeGoals = useMemo(
    () => goals.filter((g) => g.status === "active"),
    [goals],
  );
  const completedGoals = useMemo(
    () => goals.filter((g) => g.status === "completed"),
    [goals],
  );
  const pausedGoals = useMemo(
    () => goals.filter((g) => g.status === "paused"),
    [goals],
  );

  const value = useMemo(
    () => ({
      goals,
      userStats,
      activeGoals,
      completedGoals,
      pausedGoals,
      addGoal,
      deleteGoal,
      updateGoal,
      logProgress,
      markComplete,
      togglePause,
      restoreGoal,
      clearAllGoals,
    }),
    [
      goals,
      userStats,
      activeGoals,
      completedGoals,
      pausedGoals,
      addGoal,
      deleteGoal,
      updateGoal,
      logProgress,
      markComplete,
      togglePause,
      restoreGoal,
      clearAllGoals,
    ],
  );

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};
