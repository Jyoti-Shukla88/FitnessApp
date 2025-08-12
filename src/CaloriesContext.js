import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CaloriesContext = createContext();
const STORAGE_KEY = '@mealCalories';

export const CaloriesProvider = ({ children }) => {
  const [mealCalories, setMealCalories] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0
  });

  // Load from storage on app start
  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            setMealCalories(parsed);
          }
        }
      } catch (e) {
        console.error('Error loading calories:', e);
      }
    };
    loadFromStorage();
  }, []);

  // Save whenever mealCalories changes
  useEffect(() => {
    const saveToStorage = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mealCalories));
      } catch (e) {
        console.error('Error saving calories:', e);
      }
    };
    saveToStorage();
  }, [mealCalories]);

  // Only update state if calories actually change
  const updateMealCalories = useCallback((meal, calories) => {
    setMealCalories(prev => {
      if (prev[meal] === calories) return prev; // No change, avoid re-render
      return { ...prev, [meal]: calories };
    });
  }, []);

  return (
    <CaloriesContext.Provider value={{ mealCalories, updateMealCalories }}>
      {children}
    </CaloriesContext.Provider>
  );
};
