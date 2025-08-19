import React, { useEffect, useState, useCallback } from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Dimensions,
  TouchableOpacity, 
  FlatList, 
  Animated
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Svg, { Path } from 'react-native-svg';
import SemiRingNavBar from './SemiRingNavBar';
import AnimatedSummary from './AnimatedSummary';
import { withMealLogic } from './Hoc/withMealLogic'; 

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = 70;

const snackItems = [
  { id: '1', name: 'CHIPS', calories: 150 },
  { id: '2', name: 'NUTS', calories: 180 },
  { id: '3', name: 'POPCORN', calories: 100 },
  { id: '4', name: 'GRANOLA BAR', calories: 120 },
  { id: '5', name: 'CHOCOLATE', calories: 200 },
  { id: '6', name: 'FRUIT SALAD', calories: 90 },
  { id: '7', name: 'YOGURT', calories: 110 },
  { id: '8', name: 'COOKIES', calories: 160 },
];

function SnackUI({
  navigation,
  servings,
  updateServings,
  getItemTotalCalories,
  animatedWidth,
  getProgressColor,
  animatedDailyTotal,
  animatedCategoryTotal,
  calorieGoal,
}) {
  const AnimatedNumber = ({ value, suffix = ' kcal' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
      const id = value.addListener(({ value }) => setDisplayValue(Math.round(value)));
      return () => value.removeListener(id);
    }, [value]);
    return <Text>{displayValue}{suffix}</Text>;
  };

  const renderItem = useCallback(({ item }) => (
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.listItemText}>{item.name}</Text>
        <Text style={styles.caloriesText}>{item.calories} kcal / serving</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.counterButton} onPress={() => updateServings(item.name, 'increment')}>
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{servings[item.name]}</Text>
        <TouchableOpacity style={styles.counterButton} onPress={() => updateServings(item.name, 'decrement')}>
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemTotalCalories}>{getItemTotalCalories(item)} kcal</Text>
    </View>
  ), [servings, updateServings, getItemTotalCalories]);

  const getItemLayout = useCallback((_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Svg height={250} width={width} style={styles.svgCurve}>
          <Path fill="#23203F" d={`M0,200 Q${width / 2},90 ${width},200 L${width},0 L0,0 Z`} />
        </Svg>
        <View style={styles.headerContent}>
          <Feather name="menu" size={24} color="#fff" />
          <Text style={styles.headerText}>SNACKS</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, { width: animatedWidth, backgroundColor: getProgressColor() }]} />
        </View>
        <Text style={styles.progressText}>
          <AnimatedNumber value={animatedDailyTotal} /> / {calorieGoal} kcal
        </Text>
      </View>

      {/* Snack List */}
      <FlatList
        data={snackItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        getItemLayout={getItemLayout}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews={true}
      />

      {/* Summary */}
      <AnimatedSummary
        animatedBreakfastTotal={animatedCategoryTotal}
        animatedDailyTotal={animatedDailyTotal}
      />

      <SemiRingNavBar navigation={navigation} activeInitial="food" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  headerContainer: { 
    position: 'relative', 
    height: 250 
  },
  svgCurve: { 
    position: 'absolute', 
    top: 0 
  },
  headerContent: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    height: 120, 
    paddingHorizontal: 16, 
    paddingTop: 40,
  },
  headerText: { 
    color: 'white', 
    fontSize: 30, 
    fontWeight: '700' 
  },
  progressBarContainer: { 
    paddingHorizontal: 10, 
    marginTop: 0 
  },
  progressBarBackground: {
    height: 10, 
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)', 
    borderRadius: 10, 
    overflow: 'hidden',
    borderWidth: 1, 
    borderColor: '#ddd',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15, 
    shadowRadius: 3, 
    elevation: 3,
  },
  progressBarFill: { 
    height: '100%', 
    borderRadius: 10 
  },
  progressText: {
    marginTop: 5, 
    fontSize: 14, 
    fontWeight: '600',
    color: '#23203F', 
    textAlign: 'center',
  },
  listContainer: { 
    paddingHorizontal: 20, 
    paddingBottom: 10 
  },
  listItem: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee',
  },
  listItemText: { 
    color: '#5D5D91', 
    fontWeight: '600', 
    fontSize: 16 
  },
  caloriesText: { 
    color: '#999', 
    fontSize: 12 
  },
  counterContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginHorizontal: 8 
  },
  counterButton: {
    width: 30, 
    height: 30, 
    borderRadius: 15,
    backgroundColor: '#efefef', 
    justifyContent: 'center',
    alignItems: 'center', 
    marginHorizontal: 3,
  },
  counterButtonText: { 
    color: '#5D5D91', 
    fontSize: 20, 
    fontWeight: '700' 
  },
  counterValue: {
    fontSize: 16, 
    fontWeight: '700',
    color: '#5D5D91', 
    width: 20, 
    textAlign: 'center',
  },
  itemTotalCalories: { 
    width: 60, 
    textAlign: 'right', 
    fontSize: 12, 
    color: '#333' 
  },
});

// Wrap SnackUI with the HOC for logic and export
export default withMealLogic(SnackUI, 'snacks', snackItems, '@snackServings');
