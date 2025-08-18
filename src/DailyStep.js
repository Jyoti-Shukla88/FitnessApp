import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SemiRingNavBar from './SemiRingNavBar'
const { width } = Dimensions.get('window');

export default function FitnessDashboard({navigation}) {
  const steps = 936;
  const walkMinutes = 21;
  const runMinutes = 0;
  const goalMinutes = 60;
  const calories = 623;
  const distance = 0.44;
  const barData = [5, 15, 28, 20, 12, 8];

  const radius = 35;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (walkMinutes / goalMinutes) * circumference;

  const darkBlue = '#232546';
  const pink = '#FF466A';
  const greyText = '#64708D';

  return (
    <SafeAreaView style={styles.container}>
      {/* Curved Header */}
      <View style={styles.headerContainer}>
        <Svg height={400} width={width} style={styles.svgCurve}>
          <Path
            fill={darkBlue}
            d={`M0,400 Q${width / 2},250 ${width},400 L${width},0 L0,0 Z`}
          />
        </Svg>
        <View style={styles.headerContent}>
          <Text style={styles.menuIcon}>☰</Text>
          <Text style={styles.title}>TODAY</Text>
          <Text style={styles.stepCount}>{steps}</Text>
          <Text style={styles.subTitle}>DAILY STEPS</Text>
      

      {/* Activity Row */}
      <View style={styles.activityRow}>
        {/* Walking */}
        <View style={styles.activityBox}>
          <MaterialCommunityIcons name="walk" size={28} color={greyText} />
          <Text style={styles.activityText}>{walkMinutes} mins</Text>
          <Text style={styles.activitySubText}>walking</Text>
        </View>

        {/* Circular Progress */}
        <View style={styles.circularContainer}>
          <Svg height="100" width="100">
            <Circle
              stroke={`${pink}33`}
              fill="none"
              cx="50"
              cy="50"
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              stroke={pink}
              fill="none"
              cx="50"
              cy="50"
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={`${progress}, ${circumference}`}
              strokeLinecap="round"
              rotation="-90"
              origin="50,50"
            />
          </Svg>
          <View style={styles.circularTextContainer}>
            <Text style={styles.circularNumber}>{walkMinutes}</Text>
            <Text style={styles.circularSubText}>mins{'\n'}/ 60</Text>
          </View>
        </View>

        {/* Running */}
        <View style={styles.activityBox}>
          <MaterialCommunityIcons name="run-fast" size={28} color={greyText} />
          <Text style={styles.activityText}>{runMinutes} mins</Text>
          <Text style={styles.activitySubText}>running</Text>
        </View>
      </View>
        </View>
      </View>

      {/* Bar Chart */}
      <View style={styles.chartContainer}>
        <Svg height="100" width={200}>
          {/* Bars */}
          {barData.map((value, index) => {
            const barWidth = 5;
            const spacing = 10;
            const x = index * spacing + 10;
            const barHeight = value * 2;
            const barY = 70 - barHeight;

            return (
              <Rect
                key={`bar-${index}`}
                x={x}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={pink}
                rx={4}
                ry={4}
              />
            );
          })}

          {/* Dotted baseline */}
          <Path
            d="M0,70 H200"
            stroke={greyText}
            strokeWidth={1}
            strokeDasharray="2,2"
          />

          {/* Time Labels */}
          {[0, 6, 12, 18, 24].map((hour, i) => {
            const labelX = (i / 4) * 200 - 6;
            return (
              <Text
                key={`label-${hour}`}
                style={{
                  position: 'absolute',
                  top: 77,
                  left: labelX,
                  fontSize: 10,
                  color: greyText,
                  fontWeight: '600',
                }}
              >
                {hour}
              </Text>
            );
          })}
        </Svg>
      </View>
      <Text style={styles.chartLabel}>STEPS PER 30 MINS</Text>

      
      {/* Summary */}
      <View style={styles.summaryRow}>
        {/* Left column: labels */}
        <View style={styles.summaryColumn}>
          <Text style={styles.summaryLabel}>CALORIES BURNT</Text>
          <Text style={styles.summaryLabel}>DISTANCE</Text>
        </View>

        {/* Right column: values */}
        <View style={styles.summaryColumn}>
          <Text style={styles.summaryValue}>{calories} kcal</Text>
          <Text style={styles.summaryValue}>{distance} km</Text>
        </View>
      </View>
      
      <SemiRingNavBar navigation={navigation} activeInitial="food" />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  headerContainer: { 
    position: 'relative', 
    height: 400 
  },
  svgCurve: { 
    position: 'absolute', 
    top: 0 
  },
  headerContent: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    position: 'absolute',
    left: 0,
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    top: 8,
  },
  title: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1.2,
  },
  stepCount: {
    color: 'white',
    fontWeight: '900',
    fontSize: 64,
    marginTop: 4,
  },
  subTitle: {
    color: '#64708D',
    fontSize: 12,
    letterSpacing: 1.2,
  },

  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 36,
  },
  activityBox: {
    alignItems: 'center',
    width: 200,
  },
  activityIcon: {
    fontSize: 28,
    color: '#64708D',
  },
  activityText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 4,
  },
  activitySubText: {
    color: '#64708D',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 2,
  },

  circularContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 100,
    height: 100,
  },
  circularTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    top: 25,
    left: 0,
    right: 0,
  },
  circularNumber: {
    color: 'white',
    fontWeight: '900',
    fontSize: 22,
    textAlign: 'center',
  },
  circularSubText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: -4,
  },

  chartContainer: {
    marginBottom: 8,
    alignItems: 'center',
    marginTop: 40
  },
  chartLabel: {
    color: '#64708D',
    letterSpacing: 1.2,
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 32,
    textAlign: 'center',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 100,
    paddingHorizontal: 20,
    columnGap: 40,
  },
  summaryColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 60,                    
  },
  summaryBox: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#323336ff',
    fontWeight: '600',
    fontSize: 12,
  },
  summaryValue: {
    color: '#5a5b5dff',
    fontSize: 20,
    marginTop: 6,
    marginLeft: '50%'
    
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});