// TodayScreen.js
import React, { useContext, useRef, useEffect } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions, StatusBar, Animated
} from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SemiRingNavBar from './SemiRingNavBar';
import { CaloriesContext } from './CaloriesContext';

const { width } = Dimensions.get('window');

export default function TodayScreen({ navigation }) {
  const steps = 936;
  const stepGoal = 2000;
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - steps / stepGoal);

  const {
    totalCalories, calorieGoal, isLoaded,
    waterGlasses, waterGoal, updateWaterGlasses
  } = useContext(CaloriesContext);

  // Food animation
  const foodAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!isLoaded) {
      foodAnim.setValue(0);
      return;
    }
    const percent = calorieGoal > 0 ? (totalCalories / calorieGoal) * 100 : 0;
    Animated.timing(foodAnim, {
      toValue: percent,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, );

  const foodBarWidth = foodAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });
  const getFoodColor = () => {
    const prog = calorieGoal > 0 ? totalCalories / calorieGoal : 0;
    if (prog < 0.8) return '#4CAF50';
    else if (prog < 1) return '#FF9800';
    return '#F44336';
  };

  // Water animation
  const waterAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!isLoaded) {
      waterAnim.setValue(0);
      return;
    }
    const percent = waterGoal > 0 ? (waterGlasses / waterGoal) * 100 : 0;
    Animated.timing(waterAnim, {
      toValue: percent,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, );

  const waterBarWidth = waterAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });
  const getWaterColor = () => {
    const prog = waterGoal > 0 ? waterGlasses / waterGoal : 0;
    if (prog < 0.5) return '#2196F3';
    else if (prog < 1) return '#03A9F4';
    return '#00BCD4';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#23203F" />

      {/* Header with Step Ring */}
      <View style={styles.headerContainer}>
        <Svg height={210} width={width} style={styles.svgCurve}>
          <Path fill="#23203F"
            d={`M0,210 Q${width * 0.15},160 ${width * 0.5 - 70},160
                A70,70 0 0,1 ${width * 0.5 + 70},160
                Q${width * 0.85},160 ${width},210 L${width},0 L0,0 Z`}
          />
        </Svg>
        <View style={styles.headerOverlay}>
          <Feather name="menu" size={24} color="#fff" />
          <Text style={styles.headerTitle}>TODAY</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={[styles.ringContainer, { top: 95 }]}>
          <Svg height={120} width={120}>
            <Circle cx={60} cy={60} r={radius} stroke="#EEE" strokeWidth={10} fill="none" />
            <Circle
              cx={60} cy={60} r={radius}
              stroke="#FF3B30" strokeWidth={10}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round" fill="none"
            />
          </Svg>
          <View style={styles.stepCenterOverlay}>
            <Text style={styles.stepCount}>{steps}</Text>
            <Text style={styles.stepLabel}>steps</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.activeTimeIconRow, { top: 50 }]}>
        <Feather name="clock" size={20} color="#B0B0C3" />
        <Text style={styles.active}>ACTIVE TIME</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statsItem}><Text style={styles.statsValue}>21</Text><Text style={styles.statsLabel}>mins</Text></View>
        <View style={styles.statsItem}><Text style={styles.statsValue}>623</Text><Text style={styles.statsLabel}>kcal</Text></View>
        <View style={styles.statsItem}><Text style={styles.statsValue}>0.44</Text><Text style={styles.statsLabel}>km</Text></View>
      </View>

      {/* Divider */}
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Svg width={width * 0.84} height={16}>
          <Defs>
            <LinearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#000" stopOpacity="0.15" />
              <Stop offset="100%" stopColor="#000" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Path d={`M0 12 Q${(width * 0.84) / 2} 0 ${width * 0.84} 12`} fill="url(#shadowGrad)" />
        </Svg>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Food Section */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { alignItems: 'center' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="food-apple" size={20} color="#B0B0C3" style={{ marginRight: 6 }} />
              <Text style={styles.sectionTitle}>FOOD</Text>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('EatTodayStep1')}>
              <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.foodNumRow}>
            <Text style={styles.foodNum}>{isLoaded ? totalCalories : 0}</Text>
            <Text style={[styles.foodKcal, ]}>kcal</Text>
          </View>
          <View style={styles.barBg}>
            <Animated.View style={[styles.barFill, { width: foodBarWidth, backgroundColor: getFoodColor() }]} />
          </View>
          <Text style={styles.kcalGoal}>{totalCalories} / {calorieGoal} kcal</Text>
        </View>

        {/* Divider */}
        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <Svg width={width * 0.84} height={16}>
            <Defs>
              <LinearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor="#000" stopOpacity="0.15" />
                <Stop offset="100%" stopColor="#000" stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Path d={`M0 12 Q${(width * 0.84) / 2} 0 ${width * 0.84} 12`} fill="url(#shadowGrad)" />
          </Svg>
        </View>

        {/* Water Section */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { alignItems: 'center' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="cup-water" size={20} color="#B0B0C3" style={{ marginRight: 6 }} />
              <Text style={styles.sectionTitle}>WATER</Text>
            </View>
            <View style={{ width: 46 }} />
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.waterNum, { fontSize: 26, fontWeight: 'bold', color: '#23203F'}]}>{waterGlasses}</Text>
            <Text style={[styles.waterGlassLabel, { color: '#37373bff', fontSize: 16, marginTop: 4 }]}>glass</Text>
          </View>
          <View style={styles.barBg}>
            <Animated.View style={[styles.barFill, { backgroundColor: getWaterColor(), width: waterBarWidth }]} />
          </View>
          <Text style={styles.kcalGoal}>{waterGlasses} / {waterGoal} glasses</Text>
          <View style={[styles.waterControls, { width: 46, marginLeft: '80%' }]}>
            <TouchableOpacity style={styles.waterBtn} onPress={() => updateWaterGlasses(-1)}>
              <Text style={styles.waterBtnTxt}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.waterBtn} onPress={() => updateWaterGlasses(1)}>
              <Text style={styles.waterBtnTxt}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <SemiRingNavBar navigation={navigation} activeInitial="food" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAFF' 
  },
  scroll: { 
    paddingBottom: 120 
  },
  headerContainer: { 
    position: 'relative', 
    height: 210 
  },
  svgCurve: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0 
  },
  headerOverlay: {
    position: 'absolute', 
    top: 44, 
    width: '100%', 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 18, 
    zIndex: 2
  },
  headerTitle: { 
    flex: 1, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff', 
    letterSpacing: 1, 
    textTransform: 'uppercase' 
  },
  ringContainer: { 
    position: 'absolute', 
    alignSelf: 'center', 
    top: 115, 
    width: 120, 
    height: 120, 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 3 
  },
  stepCenterOverlay: { 
    position: 'absolute', 
    width: 120, 
    height: 120, 
    alignItems: 'center', 
    justifyContent: 'center', 
    left: 0, 
    top: 0 
  },
  stepCount: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#23203F' 
  },
  stepLabel: { 
    fontSize: 13, 
    color: '#555', 
    marginTop: 2 
  },
  activeTimeIconRow: { 
    alignItems: 'center', 
    marginTop: 4, 
    marginBottom: 2 
  },
  statsRow: { 
    marginTop: 55, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'flex-end', 
    paddingHorizontal: 10 
  },
  statsItem: { 
    alignItems: 'center' 
  },
  statsValue: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#23203F' 
  },
  statsLabel: { 
    fontSize: 13, 
    color: '#8A8AAE', 
    marginTop: 2 
  },
  active: { 
    fontSize: 13, 
    color: '#01011aff', 
    marginTop: 2, 
    fontWeight: 'bold' 
  },
  section: { 
    paddingHorizontal: 26 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginLeft: '45%' 
  },
  sectionTitle: { 
    fontSize: 14, 
    color: '#1f1f21ff', 
    letterSpacing: 1, 
    marginTop: 35, 
    marginLeft: -35 
  },
  addBtn: { 
    borderWidth: 1, 
    borderColor: '#E6E6EF', 
    borderRadius: 16, 
    paddingHorizontal: 18, 
    paddingVertical: 3, 
    backgroundColor: '#fff', 
    marginTop: 0 
  },
  addBtnText: { 
    fontSize: 15, 
    color: '#2C2C4C', 
    fontWeight: '700' 
  },
  foodNumRow: { 
    flexDirection: 'column', 
    alignItems: 'baseline' 
  },
  foodNum: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#23203F', 
    marginRight: 4 
  },
  foodKcal: { 
    fontSize: 16, 
    color: '#201d1dff', 
    marginTop: 4 
  },
  barBg: { 
    height: 8, 
    backgroundColor: '#E6E6EF', 
    borderRadius: 4, 
    width: '50%', 
    marginTop: -10, 
    overflow: 'hidden', 
    marginLeft: '50%' 
  },
  barFill: { 
    height: 8, 
    borderRadius: 4 
  },
  kcalGoal: { 
    marginTop: 3, 
    fontSize: 13, 
    color: '#212124ff', 
    marginLeft: '65%' 
  },
  waterControls: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 0, 
    justifyContent: 'center', 
    //marginBottom: 20 ,
     paddingHorizontal: 18, 
    paddingVertical: 3, 
  },
  waterBtn: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    borderWidth: 1, 
    borderColor: '#9d9da2ff', 
    backgroundColor: '#d4d4dbff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: 12 ,
    marginRight:'100%'
  },
  waterBtnTxt: { 
    fontSize: 22, 
    color: '#141313ff', 
    fontWeight: 'bold' 
  },
  waterNum: { 
    fontSize: 40, 
    fontWeight: '700', 
    color: '#23203F', 
    marginRight: '90%' 
  },
  waterGlassLabel: { 
    fontSize: 15, 
    color: '#8A8AAE', 
    marginRight: '89%' 
  },
});
