/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
// --- Constants for Gamification ---
const XP_PER_LOG = 10;
const XP_COMPLETION_BONUS = 50;

// 1. Create Context
const GoalContext = createContext();

// 2. Provider Component
export const GoalProvider = ({ children }) => {
  // --- State for Goals ---
  const [goals, setGoals] = useState(() => {
    try {
      const savedGoals = localStorage.getItem("goals");
      return savedGoals ? JSON.parse(savedGoals) : [];
    } catch (error) {
      console.error("Error reading goals from localStorage:", error);
      return [];
    }
  });

  // --- State for User Statistics (XP, Completed Count) ---
  const [userStats, setUserStats] = useState(() => {
    try {
      const savedStats = localStorage.getItem("userStats");
      return savedStats ? JSON.parse(savedStats) : { xp: 0, completedCount: 0 };
    } catch (error) {
      console.error("Error reading userStats from localStorage:", error);
      return { xp: 0, completedCount: 0 };
    }
  });

  // --- Effects to Persist Data to LocalStorage ---
  useEffect(() => {
    try {
      localStorage.setItem("goals", JSON.stringify(goals));
    } catch (error) {
      console.error("Error saving goals to localStorage:", error);
    }
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem("userStats", JSON.stringify(userStats));
    } catch (error) {
      console.error("Error saving userStats to localStorage:", error);
    }
  }, [userStats]);

  // --- CRUD and Logic Functions ---

  const addGoal = useCallback((goalData) => {
    const newGoal = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      progress: 0,
      status: "active",
      logs: [],
      ...goalData, // title, category, type, target, etc.
    };
    setGoals((prevGoals) => [newGoal, ...prevGoals]);
  }, []);

  const deleteGoal = useCallback((id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  }, []);

  const updateGoal = useCallback((id, updatedFields) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedFields } : goal,
      ),
    );
  }, []);

  const logProgress = useCallback((goalId, amount = 1) => {
    let goalCompleted = false;

    // Update the specific goal
    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id === goalId && goal.status === "active") {
          const wasAlreadyComplete = goal.progress >= goal.target;
          const newProgress = goal.progress + amount;
          const isNowComplete = newProgress >= goal.target;

          // Check if this action just completed the goal
          if (isNowComplete && !wasAlreadyComplete) {
            goalCompleted = true;
          }

          return {
            ...goal,
            progress: newProgress,
            status: isNowComplete ? "completed" : goal.status,
            logs: [...goal.logs, { date: new Date().toISOString(), amount }],
          };
        }
        return goal;
      }),
    );

    // Update user statistics based on the action
    setUserStats((prevStats) => {
      let xpGained = XP_PER_LOG;
      let completedCountGained = 0;

      if (goalCompleted) {
        xpGained += XP_COMPLETION_BONUS;
        completedCountGained = 1;
      }

      return {
        xp: prevStats.xp + xpGained,
        completedCount: prevStats.completedCount + completedCountGained,
      };
    });
  }, []);

  // --- Memoize the context value ---
  const value = useMemo(
    () => ({
      goals,
      userStats,
      addGoal,
      deleteGoal,
      updateGoal,
      logProgress,
    }),
    [goals, userStats, addGoal, deleteGoal, updateGoal, logProgress],
  );

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalProvider");
  }
  return context;
};
