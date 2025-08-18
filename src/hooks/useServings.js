import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useServings(items, storageKey) {
  const [servings, setServings] = useState(() =>
    items.reduce((acc, item) => {
      acc[item.name] = 0;
      return acc;
    }, {})
  );

  const isMounted = useRef(true);

  // Load saved servings on mount
  useEffect(() => {
    isMounted.current = true;
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored && isMounted.current) {
          setServings(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load servings:', e);
      }
    };
    loadData();
    return () => {
      isMounted.current = false;
    };
  }, [storageKey]);

  // Save servings whenever it changes
  useEffect(() => {
    AsyncStorage.setItem(storageKey, JSON.stringify(servings)).catch(e =>
      console.error('Failed to save servings:', e)
    );
  }, [servings, storageKey]);

  // Update servings; useCallback optional
  const updateServings = useCallback((itemName, type) => {
    setServings(prev => {
      const newVal = type === 'increment' ? prev[itemName] + 1 : Math.max(prev[itemName] - 1, 0);
      return { ...prev, [itemName]: newVal };
    });
  }, []);

  const getItemTotalCalories = useCallback(
    item => servings[item.name] * item.calories,
    [servings]
  );

  const categoryTotalCalories = items.reduce((total, item) => total + getItemTotalCalories(item), 0);

  return {
    servings,
    updateServings,
    getItemTotalCalories,
    categoryTotalCalories,
  };
}
