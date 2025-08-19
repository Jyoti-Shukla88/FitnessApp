import React, { useCallback, useMemo } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function SemiRingNavBar() {
  const navigation = useNavigation();
  const route = useRoute();

  // Determine active button based on current route name
  const activeButton= useMemo(() => {
    switch (route.name) {
      case 'EatTodayStep1':
        return 'food';
      case 'home':
        return 'home';
      case 'Activities':
        return 'run';
      default:
        return 'food';
    }
  }, [route.name]);

  const handlePress = useCallback(
    (buttonName, screenName) => {
    if (route.name !== screenName) {
      navigation.navigate(screenName);
    }
  },[navigation, route.name]
  );

  return (
    <View style={styles.container}>
      <Svg width={width} height={80} style={styles.absoluteFill}>
        <Path
          d={`M 120 80 C ${width * 0.35} 20, ${width * 0.65} 20, ${width - 120} 80`}
          stroke="#23203F"
          strokeWidth={50}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>

      <View pointerEvents="box-none" style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { left: width * 0.24 }]}
          onPress={() => handlePress('food', 'EatTodayStep1')}
        >
          <MaterialCommunityIcons
            name="food"
            size={28}
            color={activeButton === 'food' ? '#ff3b30' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { left: width * 0.5 - 28, top: 10 }]}
          onPress={() => handlePress('home', 'home')}
        >
          <Feather
            name="home"
            size={28}
            color={activeButton === 'home' ? '#ff3b30' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { left: width * 0.82 - 85 }]}
          onPress={() => handlePress('run', 'Activities')}
        >
          <MaterialCommunityIcons
            name="run"
            size={28}
            color={activeButton === 'run' ? '#ff3b30' : '#fff'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 80,
    zIndex: 12,
  },
  button: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'flex-end',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.17,
    shadowRadius: 4,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});