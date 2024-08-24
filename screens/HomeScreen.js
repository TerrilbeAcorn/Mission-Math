import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Math Game</Text>
      <Button
        title="New Game"
        onPress={() => navigation.navigate('GameSetup')}
      />
      <Button
        title="Leaderboard"
        onPress={() => alert('Leaderboard feature coming soon!')}
      />
      <Button
        title="Mute"
        onPress={() => alert('Mute feature coming soon!')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
