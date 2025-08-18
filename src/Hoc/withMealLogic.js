import React, { useContext, useEffect } from 'react';
import { CaloriesContext } from '../CaloriesContext';
import useServings from '../hooks/useServings'; 
import useAnimatedProgress from '../hooks/useAnimatedProgress';

export function withMealLogic(WrappedComponent, mealName, items,storageKey) {
  return function MealLogicWrapper(props) {
    const calorieGoal = 2000;
    const { mealCalories, updateMealCalories } = useContext(CaloriesContext);

    // Hook to manage servings state
    const { servings, updateServings, getItemTotalCalories, categoryTotalCalories } = useServings(items, storageKey);

    // Update global calories context whenever category total changes
    useEffect(() => {
      updateMealCalories(mealName, categoryTotalCalories);
    }, [categoryTotalCalories, updateMealCalories]); 

    const dailyTotalCalories =
      (mealCalories.breakfast || 0) +
      (mealCalories.lunch || 0) +
      (mealCalories.snacks || 0) +
      (mealCalories.dinner || 0);

    const progress = Math.min(dailyTotalCalories / calorieGoal, 1);

    // Animated progress bar values
    const {
      animatedWidth,
      getProgressColor,
      animatedDailyTotal,
      animatedCategoryTotal,
    } = useAnimatedProgress(progress, dailyTotalCalories, categoryTotalCalories);

    return (
      <WrappedComponent
        {...props}
        servings={servings}
        updateServings={updateServings}
        getItemTotalCalories={getItemTotalCalories}
        animatedWidth={animatedWidth}
        getProgressColor={getProgressColor}
        animatedDailyTotal={animatedDailyTotal}
        animatedCategoryTotal={animatedCategoryTotal}
        calorieGoal={calorieGoal}
        dailyTotalCalories={dailyTotalCalories}
      />
    );
  };
}
