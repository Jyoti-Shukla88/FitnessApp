import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Svg, { Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SemiRingNavBar from './SemiRingNavBar';
const { width } = Dimensions.get('window');

const activities = [
  { name: 'WALKING', icon: 'walk', screen: 'Walking' },
  { name: 'RUNNING', icon: 'run', screen: 'DailyStep' },
  { name: 'SWIMMING', icon: 'swim' },
  { name: 'GYMNASTIC', icon: 'dumbbell' },
  { name: 'BASKETBALL', icon: 'basketball' },
  { name: 'BASEBALL', icon: 'baseball' },
  { name: 'BADMINTON', icon: 'badminton' },
  { name: 'TENNIS', icon: 'tennis' },
  { name: 'FOOTBALL', icon: 'soccer' },
  { name: 'CRICKET', icon: 'cricket' },
  { name: 'YOGA', icon: 'yoga' },
  { name: 'MEDITATION', icon: 'meditation' },
];

export default function Activity({navigation}) {
  const groupedActivities = [];
  for (let i = 0; i < activities.length; i += 3) {
    groupedActivities.push(activities.slice(i, i + 3));
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Curved Header */}
      <View style={styles.headerContainer}>
        <Svg height={250} width={width} style={styles.svgCurve}>
          <Path
            fill="#23203F"
            d={`M0,200 Q${width / 2},90 ${width},200 L${width},0 L0,0 Z`}
          />
        </Svg>

        <View style={styles.headerContent}>
          <Feather name="menu" size={24} color="#fff" />
          <Text style={styles.headerText}>ACTIVITIES</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* Activity Grid with Horizontal & Vertical Lines */}
      <View style={styles.grid}>
        {groupedActivities.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={[
              styles.activityRow,
              rowIndex !== groupedActivities.length - 1 && styles.rowBorder,
            ]}
          >
            {row.map((item, colIndex) => (
              <TouchableOpacity
                key={colIndex}
                style={[
                  styles.activityItem,
                  colIndex !== row.length - 1 && styles.colBorder,
                ]}
                onPress={() => {
                  if (item.screen) navigation.navigate(item.screen);
                }}
              >
                <MaterialCommunityIcons name={item.icon} size={32} color="#5D5D91" />
                <Text style={styles.activityLabel}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
       <SemiRingNavBar navigation={navigation} activeInitial="food" />
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
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
    fontWeight: '700',
    letterSpacing: 1,
  },

  grid: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 100,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  activityItem: {
    alignItems: 'center',
    width: width / 3 - 10,
    paddingVertical: 20,
  },
  colBorder: {
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  activityLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#5D5D91',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});