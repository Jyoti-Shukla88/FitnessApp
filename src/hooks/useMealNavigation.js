import { useState, useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function useMealNavigation(initialMeal = 'food') {
  const navigation = useNavigation();
  const [activeMeal, setActiveMeal] = useState(initialMeal);

  const meals = useMemo(() => [
    { key: 'Breakfast', icon: 'coffee-outline', route: 'Breakfast' },
    { key: 'Lunch', icon: 'silverware-fork-knife', route: 'Lunch' },
    { key: 'Snack', icon: 'food-apple-outline', route: 'Snack' },
    { key: 'Dinner', icon: 'food-turkey', route: 'Dinner' },
  ], []);

  const handleMealPress = useCallback((meal) => {
    if (activeMeal === meal.key) return;
    setActiveMeal(meal.key);
    navigation.navigate(meal.route);
  }, [navigation, activeMeal]);

  return { activeMeal, meals, handleMealPress };
}
