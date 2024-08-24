import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default function GameSetupScreen({ navigation }) {
  const [selectedOperations, setSelectedOperations] = useState({
    addition: false,
    subtraction: false,
  });
  const [numberOfQuestions, setNumberOfQuestions] = useState('5');

  // Toggle selection of operations
  const handleButtonPress = (operation) => {
    setSelectedOperations(prevState => ({
      ...prevState,
      [operation]: !prevState[operation],
    }));
  };

  // Get selected operations
  const getSelectedOperations = () => {
    return Object.keys(selectedOperations).filter(op => selectedOperations[op]);
  };

  return (
    <View style={styles.container}>
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
      </View>

      <Text style={styles.label}>Select Number of Questions:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={numberOfQuestions}
        onChangeText={setNumberOfQuestions}
      />

      <Button
        title="Start Game"
        onPress={() =>
          navigation.navigate('Game', {
            operations: getSelectedOperations(),
            numberOfQuestions: parseInt(numberOfQuestions),
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
