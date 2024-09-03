import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TwinklingStarBackground from './TwinklingStarBackground';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TwinklingStarBackground>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              <Text style={[styles.titleText, styles.mission]}>Mission{'\n'}</Text>
              <Text style={[styles.titleText, styles.mathsteroid]}>Mathsteroid</Text>
            </Text>
            <Text style={styles.subtitle}>Saving the world one equation at a time!</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('GameSetup')}
            >
              <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Leaderboard', { finalScore: 0 })}
            >
              <Text style={styles.buttonText}>Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert('Mute feature coming soon!')}
            >
              <Text style={styles.buttonText}>Mute</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TwinklingStarBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: '10%', // Adjust this value to position it in the top third of the screen
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 50, // Adjusted for a more prominent 3D effect
    color: 'white', // Adjusted for visibility against the background
    fontWeight: 'bold',
    fontFamily: 'YourCustomFont', // Replace with your custom font family if available
  },
  mission: {
    textShadowColor: '#947b1f', // Shadow color
    textShadowOffset: { width: 4, height: -4 }, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
    position: 'relative',
    top: -10, // Adjust this value to offset the "Mission" text
  },
  mathsteroid: {
    textShadowColor: '#947b1f', // Shadow color
    textShadowOffset: { width: 4, height: -4 }, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
    position: 'relative',
    top: 10, // Adjust this value to offset the "Mathsteroid" text
  },
  subtitle: {
    fontSize: 22,
    color: 'white',
    marginTop: 50, // Increased margin to add more space between title and subtitle
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '15%', 
    alignItems: 'center',
    width: '80%', 
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 20, 
    paddingHorizontal: 30, 
    borderRadius: 5,
    marginBottom: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: "#007bff",
    fontWeight: 'bold',
  },
});
