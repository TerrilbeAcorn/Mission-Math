import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TwinklingStarBackground from './TwinklingStarBackground';

const topScores = [
  { position: 1, nickname: 'Player1', score: 25 },
  { position: 2, nickname: 'Player2', score: 24 },
  { position: 3, nickname: 'Player3', score: 23 },
  { position: 4, nickname: 'Player4', score: 22 },
  { position: 5, nickname: 'Player5', score: 21 },
  { position: 6, nickname: 'Player6', score: 20 },
  { position: 7, nickname: 'Player7', score: 19 },
  { position: 8, nickname: 'Player8', score: 18 },
  { position: 9, nickname: 'Player9', score: 17 },
  { position: 10, nickname: 'Player10', score: 16 },
  { position: 11, nickname: 'Player11', score: 15 },
  { position: 12, nickname: 'Player12', score: 14 },
  { position: 13, nickname: 'Player13', score: 13 },
  { position: 14, nickname: 'Player14', score: 12 },
  { position: 15, nickname: 'Player15', score: 11 },
  { position: 16, nickname: 'Player16', score: 10 },
  { position: 17, nickname: 'Player17', score: 9 },
  { position: 18, nickname: 'Player18', score: 8 },
  { position: 19, nickname: 'Player19', score: 7 },
  { position: 20, nickname: 'Player20', score: 6 },
  { position: 21, nickname: 'Player21', score: 5 },
  { position: 22, nickname: 'Player22', score: 4 },
  { position: 23, nickname: 'Player23', score: 3 },
  { position: 24, nickname: 'Player24', score: 2 },
  { position: 25, nickname: 'Player25', score: 2 },
];

const bannedWords = [
  'fuck', 'cunt', 'shit', 'bastard', 'fart', 'shite', 'bawbag', 'bitch', 'boob', 'fanny', 'arse' // Add your banned words here
];

const saveScores = async (scores) => {
  try {
    const jsonScores = JSON.stringify(scores);
    await AsyncStorage.setItem('topScores', jsonScores);
  } catch (e) {
    console.error("Failed to save the scores.", e);
  }
};

export default function LeaderboardScreen({ route, navigation }) {
  const finalScore = route.params?.finalScore ?? 0;
  const [scores, setScores] = useState([]);
  const [nickname, setNickname] = useState('');
  const [newHighScore, setNewHighScore] = useState(false);

  useEffect(() => {
    loadScores();
  }, []);

  useEffect(() => {
    checkForHighScore();
  }, [finalScore]);

  const loadScores = async () => {
    try {
      const jsonScores = await AsyncStorage.getItem('topScores');
      if (jsonScores !== null) {
        setScores(JSON.parse(jsonScores));
      } else {
        setScores(topScores); // If no saved scores, use default
      }
    } catch (e) {
      console.error("Failed to load the scores.", e);
    }
  };

  const checkForHighScore = () => {
    const lowestScore = scores.length > 0 ? scores[scores.length - 1].score : 0;
    if (finalScore > lowestScore) {
      setNewHighScore(true);
      Alert.alert('New High Score!', 'You made it to the leaderboard! Enter your nickname.');
    } else {
      setNewHighScore(false);
    }
  };

  const containsBannedWord = (nickname) => {
    return bannedWords.some((word) => nickname.toLowerCase().includes(word));
  };

  const submitScore = () => {
    if (!nickname.trim()) {
      Alert.alert('Nickname Required', 'Please enter a nickname.');
      return;
    }

    if (containsBannedWord(nickname)) {
      Alert.alert('Invalid Nickname', 'Your nickname contains inappropriate words. Please choose a different one.');
      return;
    }

    const newEntry = { position: scores.length + 1, nickname, score: finalScore };

    let newScores = [...scores, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 25)
      .map((score, index) => ({ ...score, position: index + 1 }));

    setScores(newScores);
    saveScores(newScores);

    setNewHighScore(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TwinklingStarBackground>
        <View style={styles.container}>
          <Text style={styles.title}>Mission Mathsteroid</Text>
          <Text style={styles.subtitle}>Top Scores</Text>

          {newHighScore ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your nickname"
                value={nickname}
                onChangeText={setNickname}
              />
              <Button title="Submit" onPress={submitScore} />
            </View>
          ) : (
            <FlatList
              data={scores}
              keyExtractor={(item) => item.position.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.cell}>{item.position}</Text>
                  <Text style={styles.cell}>{item.nickname}</Text>
                  <Text style={styles.cell}>{item.score}</Text>
                </View>
              )}
            />
          )}
          <Button
            title="Home"
            onPress={() => navigation.navigate('Home')}
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
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'gray',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray',
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: 'gray',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: 'gray',
  },
});
