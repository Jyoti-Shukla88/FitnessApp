import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export default function useAnimatedProgress(progress, dailyTotal, categoryTotal) {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const animatedDailyTotal = useRef(new Animated.Value(0)).current;
  const animatedCategoryTotal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false
    }),

    Animated.timing(animatedDailyTotal, {
      toValue: dailyTotal,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false
    }),

    Animated.timing(animatedCategoryTotal, {
      toValue: categoryTotal,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false
    }),
  ]).start();
  }, [progress, dailyTotal, categoryTotal, animatedProgress, animatedDailyTotal, animatedCategoryTotal]);

  const animatedWidth = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  const getProgressColor = () => {
    if (progress < 0.8) return '#4CAF50';
    else if (progress < 1) return '#FF9800';
    else return '#F44336';
  };

  return {
    animatedWidth,
    getProgressColor,
    animatedDailyTotal,
    animatedCategoryTotal
  };
}
