import React, { useState, useRef, useEffect,useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Svg, { Path } from 'react-native-svg';
import SemiRingNavBar from './SemiRingNavBar';
import AnimatedSummary from './AnimatedSummary';
import { CaloriesContext } from './CaloriesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const STORAGE_KEY_SERVINGS = '@dinnerServings';

export default function Dinner({ navigation, route }) {
  const calorieGoal = 2000;
  const { mealCalories,updateMealCalories } = useContext(CaloriesContext);

  const dinnerItems = [
    { id: '1', name: 'ROAST CHICKEN', calories: 320 },
    { id: '2', name: 'MASHED POTATOES', calories: 210 },
    { id: '3', name: 'STEAMED VEGGIES', calories: 90 },
    { id: '4', name: 'PASTA', calories: 350 },
    { id: '5', name: 'GRILLED SALMON', calories: 310 },
    { id: '6', name: 'BEEF STEW', calories: 400 },
    { id: '7', name: 'GARLIC BREAD', calories: 150 },
    { id: '8', name: 'MIXED SALAD', calories: 120 },
  ];

  const [servings, setServings] = useState(
    dinnerItems.reduce((acc, item) => {
      acc[item.name] = 0;
      return acc;
    }, {})
  );
  
    // AsyncStorage: load servings on mount
  useEffect(() => {
    const loadServings = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY_SERVINGS);
        if (stored) {
          setServings(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load servings:', e);
      }
    };
    loadServings();
  }, []);

  // AsyncStorage: save servings whenever updated
  useEffect(() => {
    const saveServings = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY_SERVINGS, JSON.stringify(servings));
      } catch (e) {
        console.error('Failed to save servings:', e);
      }
    };
    saveServings();
  }, [servings]);

  // Animated values
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const animatedCalories = useRef(new Animated.Value(0)).current; // top progress
  const animatedDinnerTotal = useRef(new Animated.Value(0)).current; // dinner summary
  const animatedDailyTotal = useRef(new Animated.Value(0)).current; // daily summary

  const updateServings = (itemName, type) => {
    setServings(prev => {
      const newVal =
        type === 'increment' ? prev[itemName] + 1 : Math.max(prev[itemName] - 1, 0);
      return { ...prev, [itemName]: newVal };
    });
  };

  const getItemTotalCalories = (item) => servings[item.name] * item.calories;

  const categoryTotalCalories = dinnerItems.reduce(
    (total, item) => total + getItemTotalCalories(item),
    0
  );
  useEffect(() => {
  updateMealCalories('dinner', categoryTotalCalories);
}, [categoryTotalCalories, updateMealCalories]);

   const dailyTotalCalories =
    (mealCalories.breakfast || 0) +
    (mealCalories.lunch || 0) +
    (mealCalories.snacks || 0) +
    (mealCalories.dinner || 0);
  const progress = Math.min(dailyTotalCalories / calorieGoal, 1);
  
  //  Animate when values change
  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedCalories, {
      toValue: dailyTotalCalories,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedDinnerTotal, {
      toValue: categoryTotalCalories,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedDailyTotal, {
      toValue: dailyTotalCalories,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    
  }, );

  const animatedWidth = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const getProgressColor = () => {
    if (progress < 0.8) return '#4CAF50';
    else if (progress < 1) return '#FF9800';
    else return '#F44336';
  };

  //  Animated Number Component
  const AnimatedNumber = ({ value, suffix = ' kcal' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
      const id = value.addListener(({ value }) => {
        setDisplayValue(Math.round(value));
      });
      return () => value.removeListener(id);
    }, [value]);
    return <Text>{displayValue}{suffix}</Text>;
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.listItemText}>{item.name}</Text>
        <Text style={styles.caloriesText}>{item.calories} kcal / serving</Text>
      </View>
      <View style={styles.counterContainer}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => updateServings(item.name, 'increment')}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{servings[item.name]}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => updateServings(item.name, 'decrement')}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemTotalCalories}>{getItemTotalCalories(item)} kcal</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Svg height={250} width={width} style={styles.svgCurve}>
          <Path fill="#23203F" d={`M0,200 Q${width / 2},90 ${width},200 L${width},0 L0,0 Z`} />
        </Svg>
        <View style={styles.headerContent}>
          <Feather name="menu" size={24} color="#fff" />
          <Text style={styles.headerText}>DINNER</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* Animated Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              { width: animatedWidth, backgroundColor: getProgressColor() },
            ]}
          />
        </View>
        {/* Animated number at top */}
        <Text style={styles.progressText}>
          <AnimatedNumber value={animatedCalories} /> / {calorieGoal} kcal
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={dinnerItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator
      />

      {/*  Animated Summary */}
      
       <AnimatedSummary
        animatedBreakfastTotal={animatedDinnerTotal}
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
    marginTop:0, 
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
    textAlign: 'center' 
},
  itemTotalCalories: { 
    width: 60, 
    textAlign: 'right', 
    fontSize: 12, 
    color: '#333' 
},

});
