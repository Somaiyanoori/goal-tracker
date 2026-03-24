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

// 1. Create Context
const GoalContext = createContext();

// 2. Provider Component
export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState(() => {
    try {
      const savedGoals = localStorage.getItem("goals");
      return savedGoals ? JSON.parse(savedGoals) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  // Save to LocalStorage whenever goals change
  useEffect(() => {
    try {
      localStorage.setItem("goals", JSON.stringify(goals));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [goals]);

  // Create Goal
  const addGoal = useCallback((goal) => {
    const newGoal = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      progress: 0,
      status: "active",
      logs: [],
      ...goal,
    };
    setGoals((prevGoals) => [newGoal, ...prevGoals]);
  }, []);

  // Delete Goal
  const deleteGoal = useCallback((id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  }, []);

  // Update Goal
  const updateGoal = useCallback((id, updatedFields) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedFields } : goal,
      ),
    );
  }, []);

  // Toggle Status
  const toggleGoalStatus = useCallback(
    (id, currentStatus) => {
      const newStatus = currentStatus === "active" ? "paused" : "active";
      updateGoal(id, { status: newStatus });
    },
    [updateGoal],
  );

  const value = useMemo(
    () => ({
      goals,
      addGoal,
      deleteGoal,
      updateGoal,
      toggleGoalStatus,
    }),
    [goals, addGoal, deleteGoal, updateGoal, toggleGoalStatus],
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
