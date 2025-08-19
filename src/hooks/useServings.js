import { useState, useEffect, useCallback, useRef,useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useServings(items, storageKey) {
  const [servings, setServings] = useState(() =>
    items.reduce((acc, item) => {
      acc[item.name] = 0;
      return acc;
    }, {})
  );

  const isMounted = useRef(true);
  const saveTimeout = useRef(null);
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
    if (!isMounted.current) return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      AsyncStorage.setItem(storageKey, JSON.stringify(servings)).catch(e =>
        console.error('Failed to save servings:', e)
      );
    }, 500); // 500ms debounce
  }, [servings, storageKey]);
  // Update servings; useCallback optional
  const updateServings = useCallback((itemName, type) => {
    setServings(prev => {
      const newVal = type === 'increment' ? prev[itemName] + 1 : Math.max(prev[itemName] - 1, 0);
      return prev[itemName] === newVal ? prev : { ...prev, [itemName]: newVal };
    });
  }, []);

  const getItemTotalCalories = useCallback(
    item => servings[item.name] * item.calories,
    [servings]
  );

  const categoryTotalCalories = useMemo(() => 
    items.reduce((total, item) => total + getItemTotalCalories(item), 0)
  , [items, getItemTotalCalories]);

  return {
    servings,
    updateServings,
    getItemTotalCalories,
    categoryTotalCalories,
  };
}
