import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import TwinklingStarBackground from './TwinklingStarBackground';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TwinklingStarBackground>
        <View style={styles.container}>
          <Text style={styles.title}>Mission Mathsteroid</Text>
          <Button
            title="New Game"
            onPress={() => navigation.navigate('GameSetup')}
          />
          <Button
            title="Leaderboard"
            onPress={() => navigation.navigate('Leaderboard')}
          />
          <Button
            title="Mute"
            onPress={() => alert('Mute feature coming soon!')}
          />
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'gray',
  },
});
