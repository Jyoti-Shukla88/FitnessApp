import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CaloriesContext } from './CaloriesContext';

export default function AnimatedSummary() {
  const { mealCalories } = useContext(CaloriesContext);

  const dailyTotal = useMemo(()=>{
    return (
    (mealCalories.breakfast || 0) +
    (mealCalories.lunch || 0) +
    (mealCalories.snacks || 0) +
    (mealCalories.dinner || 0)
    );
    }, [mealCalories]);
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryText}>
        Daily Total: {dailyTotal} kcal
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
     borderWidth: 1, 
    borderColor: '#fff',
    backgroundColor: '#23203F', 
    marginBottom: 75,
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  summaryText: {
    fontSize: 18, 
    fontWeight: '700', 
    color: '#fff', 
    marginLeft: 13 ,
    marginVertical: 4,
  }
});
