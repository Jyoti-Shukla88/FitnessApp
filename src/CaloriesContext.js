import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CaloriesContext = createContext();

const STORAGE_KEY = '@mealCalories';
const DATE_KEY = '@mealCaloriesDate';
const WATER_KEY = '@waterGlasses';

export const CaloriesProvider = ({ children }) => {
  const [mealCalories, setMealCalories] = useState({
    breakfast: 0,
    lunch: 0,
    snacks: 0,
    dinner: 0
  });
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const calorieGoal = 2000; 
  const waterGoal = 8;      
  const totalCalories = Object.values(mealCalories).reduce((sum, val) => sum + val, 0);

  // Load saved data & reset daily
  useEffect(() => {
    const loadFromStorage = async () => {
      try {
        const today = new Date().toDateString();
        const storedDate = await AsyncStorage.getItem(DATE_KEY);

        if (storedDate === today) {
          const storedMeals = await AsyncStorage.getItem(STORAGE_KEY);
          if (storedMeals) setMealCalories(JSON.parse(storedMeals));

          const storedWater = await AsyncStorage.getItem(WATER_KEY);
          if (storedWater) setWaterGlasses(parseInt(storedWater, 10) || 0);
        } else {
          await AsyncStorage.setItem(DATE_KEY, today);
          setMealCalories({ breakfast: 0, lunch: 0, snacks: 0, dinner: 0 });
          setWaterGlasses(0);
        }
      } catch (e) {
        console.error('Error loading data:', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadFromStorage();
  }, []);

  // Save whenever values change
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mealCalories)).catch(console.error);
      AsyncStorage.setItem(WATER_KEY, waterGlasses.toString()).catch(console.error);
    }
  }, [mealCalories, waterGlasses, isLoaded]);

  // Update calories
  const updateMealCalories = useCallback((meal, calories) => {
    setMealCalories(prev =>
      prev[meal] === calories ? prev : { ...prev, [meal]: calories }
    );
  }, []);

  // Update water
  const updateWaterGlasses = useCallback(amount => {
    setWaterGlasses(prev => Math.max(prev + amount, 0)); // no negatives
  }, []);

  const contextValue = useMemo(() => ({
     mealCalories,
     totalCalories,
     calorieGoal,
     updateMealCalories,
     waterGlasses,
     waterGoal,
     updateWaterGlasses,
     isLoaded,
  }), [mealCalories, totalCalories, waterGlasses, isLoaded, updateMealCalories, updateWaterGlasses]);

  return (
    <CaloriesContext.Provider
      value={contextValue}>
      {children}
    </CaloriesContext.Provider>
  );
};
