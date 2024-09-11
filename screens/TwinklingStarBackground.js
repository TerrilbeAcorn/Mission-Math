// Aidan Ramsay OU ID - Z5704401
import React from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const STAR_COUNT = 100; 

// Create an array of star objects with randomized properties
const stars = Array.from({ length: STAR_COUNT }).map((_, index) => {
  const x = Math.random() * 100; // Random x position percentage
  const y = Math.random() * 100; // Random y position percentage
  const size = Math.random() * 3 + 1; // Random size between 1 and 4
  return {
    id: index,
    x,
    y,
    size,
    animation: new Animated.Value(0), // Animation value for twinkling
  };
});

export default function TwinklingStarBackground({ children }) {
  React.useEffect(() => {
    // Create animations for each star to twinkle
    const animations = stars.map(star => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(star.animation, {
            toValue: 1,
            duration: Math.random() * 2000 + 1000, // Random duration between 1 and 3 seconds
            useNativeDriver: true,
          }),
          Animated.timing(star.animation, {
            toValue: 0,
            duration: Math.random() * 2000 + 1000,
            useNativeDriver: true,
          }),
        ])
      );
    });

    // Aidan Ramsay OU ID - Z5704401
    // Start the animations with a staggered delay
    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View style={styles.container}>
      {stars.map(star => (
        <Animated.View
          key={star.id}
          style={[
            styles.star,
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: [{ scale: star.animation.interpolate({ inputRange: [0, 1], outputRange: [1, 2] }) }],
              width: star.size,
              height: star.size,
            },
          ]}
        >
          <Image source={require('../assets/star.png')} style={styles.image} />
        </Animated.View>
      ))}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  star: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});