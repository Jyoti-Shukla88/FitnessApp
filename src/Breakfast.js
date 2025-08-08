import React from 'react';
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
import SemiRingNavBar from './SemiRingNavBar'
const { width, height } = Dimensions.get('window');

export default function Breakfast({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.headerText}>BREAKFAST</Text>
          <View style={{ width: 24 }} /> {/* placeholder for right icon */}
        </View>
      </View>

      {/* List of Breakfast Items */}
      <View style={styles.listContainer}>
        {[
          'TOAST',
          'PORK',
          'CHICKEN',
          'OMELETTE',
          'BEEF',
          'FISH',
          'BACON',
          'ORANGE',
        ].map((item, index) => (
          <View style={styles.listItem} key={index}>
            <Text style={styles.listItemText}>{item}</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity style={styles.counterButton}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>0</Text>
              <TouchableOpacity style={styles.counterButton}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
       <SemiRingNavBar navigation={navigation} activeInitial="food" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  headerContainer: { position: 'relative', height: 250 },
  svgCurve: { position: 'absolute', top: 0 },
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
    letterSpacing: 0,
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  listItemText: {
    color: '#5D5D91',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  counterButtonText: {
    color: '#5D5D91',
    fontSize: 20,
    fontWeight: '700',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5D5D91',
    width: 20,
    textAlign: 'center',
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});