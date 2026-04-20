import { useContext } from "react";
// CHANGED: Import GoalContext from the file where it is now defined.
import { GoalContext } from "../context/GoalContext";

/**
 * Custom hook to access the GoalContext.
 * This ensures the hook is always used within a GoalProvider.
 */
export const useGoals = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error("useGoals must be used within a GoalProvider");
  }
  return context;
};
