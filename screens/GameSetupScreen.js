import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import equationMachine from '../sum_generator/equationMachine';

export default function GameSetupScreen({ navigation }) {
  const [selectedOperations, setSelectedOperations] = useState({
    addition: false,
    subtraction: false,
    multiplication: false,
    division: false,
  });
  const [numberOfQuestions, setNumberOfQuestions] = useState('5');
  const [age, setAge] = useState('');
  const [difficulty, setDifficulty] = useState('1');

  const handleButtonPress = (operation) => {
    setSelectedOperations(prevState => ({
      ...prevState,
      [operation]: !prevState[operation],
    }));
  };

  const getSelectedOperations = () => {
    return Object.keys(selectedOperations).filter(op => selectedOperations[op]);
  };

  const startGame = () => {
    const operations = getSelectedOperations();
    const noOfQuestions = parseInt(numberOfQuestions);
    const userAge = parseInt(age);
    const diffLevel = parseInt(difficulty);

    if (operations.length === 0) {
      alert('Please select at least one operation.');
      return;
    }

    try {
      const equations = equationMachine(operations, noOfQuestions, userAge, diffLevel);
      navigation.navigate('Game', { equations });
    } catch (error) {
      console.error('Error generating equations:', error.message);
      alert('There was an error generating the equations. Please try again.');
    }
  };

  return (
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
          />

          <Text style={styles.label}>Select Number of Questions:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={numberOfQuestions}
            onChangeText={setNumberOfQuestions}
            placeholder="Enter number of questions"
          />

          <Text style={styles.label}>Select Difficulty (1, 2, or 3):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={difficulty}
            onChangeText={setDifficulty}
            placeholder="Enter difficulty level"
          />

          <Button title="Start Game" onPress={startGame} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
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
  },
});
