/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

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
  const addGoal = (goal) => {
    const newGoal = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      progress: 0,
      status: "active",
      logs: [],
      ...goal,
    };
    setGoals((prevGoals) => [newGoal, ...prevGoals]);
  };

  // Delete Goal
  const deleteGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  // Update Goal
  const updateGoal = (id, updatedFields) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, ...updatedFields } : goal,
      ),
    );
  };

  const toggleGoalStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    updateGoal(id, { status: newStatus });
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        deleteGoal,
        updateGoal,
        toggleGoalStatus,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalContext);

  if (!context) {
    throw new Error("useGoals must be used within a GoalProvider");
  }

  return context;
};
