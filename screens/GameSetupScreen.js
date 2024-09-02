import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import equationMachine from '../sum_generator/equationMachine';
import TwinklingStarBackground from './TwinklingStarBackground';

export default function GameSetupScreen({ navigation }) {
  const [selectedOperations, setSelectedOperations] = useState({
    addition: false,
    subtraction: false,
    multiplication: false,
    division: false,
  });
  const [numberOfQuestions, setNumberOfQuestions] = useState('5');
  const [age, setAge] = useState('');
  const [difficulty, setDifficulty] = useState(1); // Default difficulty set to 1

  const handleButtonPress = (operation) => {
    setSelectedOperations(prevState => ({
      ...prevState,
      [operation]: !prevState[operation],
    }));
  };

  const getSelectedOperations = () => {
    return Object.keys(selectedOperations).filter(op => selectedOperations[op]);
  };

  const validateAge = (userAge) => {
    return userAge >= 7 && userAge <= 14;
  };

  const startGame = () => {
    const operations = getSelectedOperations();
    const noOfQuestions = parseInt(numberOfQuestions);
    const userAge = parseInt(age);

    if (!validateAge(userAge)) {
      Alert.alert('Invalid Age', 'Please provide an age between 7 and 14.');
      return;
    }

    if (operations.length === 0) {
      alert('Please select at least one operation.');
      return;
    }

    try {
      const equations = equationMachine(operations, noOfQuestions, userAge, difficulty);
      navigation.navigate('Game', { equations, difficulty });
    } catch (error) {
      console.error('Error generating equations:', error.message);
      alert('There was an error generating the equations. Please try again.');
    }
  };

  const handleDifficultyPress = (level) => {
    setDifficulty(level);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TwinklingStarBackground>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.title}>Game Setup</Text>

              <Text style={styles.label}>Select Operations:</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Addition"
                  color={selectedOperations.addition ? 'green' : 'gray'}
                  onPress={() => handleButtonPress('addition')}
                />
                <Button
                  title="Subtraction"
                  color={selectedOperations.subtraction ? 'green' : 'gray'}
                  onPress={() => handleButtonPress('subtraction')}
                />
                <Button
                  title="Multiplication"
                  color={selectedOperations.multiplication ? 'green' : 'gray'}
                  onPress={() => handleButtonPress('multiplication')}
                />
                <Button
                  title="Division"
                  color={selectedOperations.division ? 'green' : 'gray'}
                  onPress={() => handleButtonPress('division')}
                />
              </View>

              <Text style={styles.label}>Enter Your Age:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
                placeholder="Enter your age"
                placeholderTextColor="gray"
              />

              <Text style={styles.label}>Select Number of Questions:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={numberOfQuestions}
                onChangeText={setNumberOfQuestions}
                placeholder="Enter number of questions"
                placeholderTextColor="gray"
              />

              <Text style={styles.label}>Select Difficulty:</Text>
              <View style={styles.buttonContainer}>
                <Button
                  title="Normal"
                  color={difficulty === 1 ? 'green' : 'gray'}
                  onPress={() => handleDifficultyPress(1)}
                />
                <Button
                  title="Hard"
                  color={difficulty === 2 ? 'green' : 'gray'}
                  onPress={() => handleDifficultyPress(2)}
                />
                <Button
                  title="Professor"
                  color={difficulty === 3 ? 'green' : 'gray'}
                  onPress={() => handleDifficultyPress(3)}
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button title="Start Game" onPress={startGame} />
                <Button
                title="Home"
                onPress={() => navigation.navigate('Home')}
                />
              </View>
              
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'gray',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 10,
    color: 'gray',
  },
});
