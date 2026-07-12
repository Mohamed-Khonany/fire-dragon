import React, { useState, useEffect } from 'react';
import { Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [textAnimation] = useState(new Animated.Value(0));
  const [iconAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start the text animation when the component mounts
      Animated.timing(textAnimation, {
        toValue: 1,
        duration: 1000,
        // easing: Easing.linear,
        useNativeDriver: true,
      }).start();
  }, []);

  useEffect(() => {
    // Start the icon animation when the component mounts
    Animated.loop(
      Animated.timing(iconAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  useEffect(() => {
    // Simulate a delay to show the loading animation
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const textTranslateX = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [280, 0],
  });
  const textTranslateX1 = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-283, 0],
  });

  const iconRotate = iconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const logoTranslateY = textAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-600, 0],
  });

  if (isLoading) {
    return (
      <LinearGradient colors={['#CE048C', '#4D0A8E']} style={styles.container}>
        <Animated.Image
          source={require('../assets/i.png')}
          style={[styles.logo, { transform: [{ translateY: logoTranslateY }] }]}
        />
        <Animated.Text style={[styles.text1, { transform: [{ translateX: textTranslateX }] }]}>FLASH</Animated.Text>
        <Animated.Text style={[styles.text2, { transform: [{ translateX: textTranslateX1 }] }]}>STORE</Animated.Text>
        <Animated.View style={[styles.iconContainer, { transform: [{ rotate: iconRotate }] }]}>
          <MaterialCommunityIcons name="refresh" size={50} color="#F4BD46" style={styles.icon} />
        </Animated.View>
        <Text style={styles.text}>Loading...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#CE048C', '#4D0A8E']} style={styles.container}>
      <Image source={require('../assets/i.png')} style={styles.logo} />
      <Text style={styles.text1}>FLASH</Text>
      <Text style={styles.text2}>STORE</Text>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text1: {
    color: '#F4BD46',
    fontWeight: 'bold',
    fontSize: 50,
    marginTop: 15,
  },
  text2: {
    color: '#F4BD46',
    fontWeight: 'bold',
    fontSize: 50,
    marginTop: -15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: '#F4BD46',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    top:120,
  },
  icon: {},
  text: {
    color: '#F4BD46',
    left:4,
    top:120,
    // fontWeight: 'bold',
    // fontSize: 18,
  },
});

export default SplashScreen;

// Pe2pia
// colors: { primary: "#fea928", secondary: "#ed8900", third: "#00347D" },