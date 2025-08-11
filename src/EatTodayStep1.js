import React, {useState} from 'react';
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

export default function EatTodayStep1({navigation}) {
    const [activeButton, setActiveButton] = useState('food');
  return (
    <SafeAreaView style={styles.container}>
      {/* Curved Header */}
      <View style={styles.headerContainer}>
        <Svg height={250} width={width} style={styles.svgCurve}>
          <Path
            fill="#23203F"
            d={`M0,200 Q${width / 2},100 ${width},200 L${width},0 L0,0 Z`}
          />
        </Svg>

        <View style={styles.headerContent}>
          <Feather name="menu" size={24} color="#fff" />
          <Text style={styles.headerText}>EAT TODAY</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* Quadrants */}
      <View style={styles.quadrantContainer}>
        <Svg height={height * 0.5} width={width * 0.8} style={StyleSheet.absoluteFillObject}>
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

        <TouchableOpacity style={[styles.quadrantButton, { top: 70, left: width / 4 }]}
        onPress={() => navigation.navigate('Breakfast')}
        >
          <MaterialCommunityIcons name="coffee-outline" size={40} color="#5D5D91" />
          <Text style={styles.quadrantLabel}>BREAKFAST</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.quadrantButton, { left: 20, top: 200 }]}
        onPress={() => navigation.navigate('Lunch')}
        >
          <MaterialCommunityIcons name="silverware-fork-knife" size={40} color="#5D5D91" />
          <Text style={styles.quadrantLabel}>LUNCH</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.quadrantButton, { right: 20, top: 200 }]}
         onPress={() => navigation.navigate('Snack')}
        >
          <MaterialCommunityIcons name="food-apple-outline" size={40} color="#5D5D91" />
          <Text style={styles.quadrantLabel}>SNACKS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.quadrantButton, { top: 300, left: width / 4 }]}
         onPress={() => navigation.navigate('Dinner')}
        >
          <MaterialCommunityIcons name="food-turkey" size={40} color="#5D5D91" />
          <Text style={styles.quadrantLabel}>DINNER</Text>
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
    letterSpacing: 0,
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
});