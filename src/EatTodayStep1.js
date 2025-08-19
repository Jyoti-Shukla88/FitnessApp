import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Svg, { Path, Line } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SemiRingNavBar from './SemiRingNavBar';
import useMealNavigation  from './hooks/useMealNavigation'; 

const { width, height } = Dimensions.get('window');

const COLORS = {
  background: '#fff',
  header: '#23203F',
  icon: '#5D5D91',
  label: '#5D5D91',
  line: '#DDD'
};

function MealButton({ position, meal, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.quadrantButton,
        position,
        isActive && styles.activeButton,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons name={meal.icon} size={40} color={COLORS.icon} />
      <Text style={styles.quadrantLabel}>{meal.key.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

export default function EatTodayStep1(navigation ) {
  const { activeMeal, meals, handleMealPress } = useMealNavigation();

  // positioning for each meal button visually
  const positions = useMemo(
    () => [
    { top: 70, left: width / 4 },          
    { left: 20, top: 200 },                
    { right: 20, top: 200 },               
    { top: 300, left: width / 4 }, 
    ],
    []        
  );
  
  const renderHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <Svg height={250} width={width} style={styles.svgCurve}>
          <Path
            fill={COLORS.header}
            d={`M0,200 Q${width / 2},100 ${width},200 L${width},0 L0,0 Z`}
          />
        </Svg>
        <View style={styles.headerContent}>
          <Feather name="menu" size={24} color="#fff" />
          <Text style={styles.headerText}>EAT TODAY</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>
    ),
    []
  );

  const handlePress = useCallback(
    meal => handleMealPress(meal),
    [handleMealPress]
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader}

      {/* Quadrants */}
      <View style={styles.quadrantContainer}>
        <Svg 
          height={height * 0.5} 
          width={width * 0.8} 
          style={StyleSheet.absoluteFillObject}
        >
          <Line
            x1="0"
            y1="0"
            x2={width * 0.8}
            y2={height * 0.5}
            stroke="#DDD"
            strokeWidth="2"
            strokeOpacity={0.3}
          />
          <Line
            x1="0"
            y1={height * 0.5}
            x2={width * 0.8}
            y2="0"
            stroke="#DDD"
            strokeWidth="2"
            strokeOpacity={0.3}
          />
        </Svg>
        {meals.map((meal, index) => (
          <MealButton
            key={meal.key}
            position={positions[index]}
            meal={meal}
            isActive={activeMeal === meal.key} 
            onPress={() => handlePress(meal)}
          />   
        ))}
      </View>
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
  quadrantContainer: {
    flex: 1,
    marginHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  quadrantButton: {
    position: 'absolute',
    alignItems: 'center',
    width: 120,
  },
  quadrantLabel: {
    marginTop: 8,
    color: '#5D5D91',
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
  },
  activeButton: {
    transform: [{ scale: 1.05 }],
    borderWidth: 1,
    borderColor: COLORS.icon,
    borderRadius: 8,
    paddingVertical: 4,
  },
});
