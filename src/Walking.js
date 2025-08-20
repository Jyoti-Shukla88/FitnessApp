import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SemiRingNavBar from './SemiRingNavBar';
import useTimer from './hooks/useTimer';

const { width } = Dimensions.get('window');

export default function WalkingScreen({navigation}) {
  const { seconds, start, pause, reset, formatTime } = useTimer();

  const formattedTime = useMemo(() => formatTime(seconds), [seconds, formatTime]);
  const handleStart = useCallback(() => start(), [start]);
  const handlePause = useCallback(() => pause(), [pause]);
  const handleReset = useCallback(() => reset(), [reset]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Curved Header */}
      <View style={styles.headerContainer}>
        <Svg height={400} width={width} style={styles.svgCurve}>
          <Path
            fill="#23203F"
            d={`M0,350 Q${width / 2},200 ${width},350 L${width},0 L0,0 Z`}
          />
        </Svg>

        <View style={styles.headerContent}>
          <MaterialCommunityIcons name="walk" size={64} color="#fff" />
          <Text style={styles.headerText}>WALKING</Text>
         
        </View>
      </View>

      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={start}
          style={[styles.controlButton, { backgroundColor: '#ff3b30' }]}
        >
          <MaterialCommunityIcons name="play" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={pause} style={styles.controlButton}>
          <MaterialCommunityIcons name="pause" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={styles.controlButton}>
          <MaterialCommunityIcons name="refresh" size={28} color="#fff" />
        </TouchableOpacity>
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
    height: 400 
},
  svgCurve: { 
    position: 'absolute', 
    top: 0 
},
  headerContent: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 8,
  },
  timerContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#23203F',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.7,
    marginTop: 40,
    alignSelf: 'center',
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#23203F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});