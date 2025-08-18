import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useServings(items, storageKey) {
  const [servings, setServings] = useState(
    items.reduce((acc, item) => {
      acc[item.name] = 0;
      return acc;
    }, {})
  );

  // Load saved servings
  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) setServings(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, [storageKey]);

  // Save servings whenever it changes
  useEffect(() => {
    AsyncStorage.setItem(storageKey, JSON.stringify(servings)).catch(console.error);
  }, [servings, storageKey]);

  const updateServings = (itemName, type) => {
    setServings(prev => {
      const newVal = type === 'increment'
        ? prev[itemName] + 1
        : Math.max(prev[itemName] - 1, 0);
      return { ...prev, [itemName]: newVal };
    });
  };

  const getItemTotalCalories = (item) => servings[item.name] * item.calories;

  const categoryTotalCalories = items.reduce(
    (total, item) => total + getItemTotalCalories(item),
    0
  );

  return {
    servings,
    updateServings,
    getItemTotalCalories,
    categoryTotalCalories
  };
}
