import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function GameSetupScreen({ navigation }) {
  const [operation, setOperation] = useState('addition');
  const [numberOfQuestions, setNumberOfQuestions] = useState('5');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Setup</Text>
      <Text>Select Operation:</Text>
      <Picker
        selectedValue={operation}
        style={styles.picker}
        onValueChange={(itemValue) => setOperation(itemValue)}
      >
        <Picker.Item label="Addition" value="addition" />
        <Picker.Item label="Subtraction" value="subtraction" />
      </Picker>

      <Text>Select Number of Questions:</Text>
      <Picker
        selectedValue={numberOfQuestions}
        style={styles.picker}
        onValueChange={(itemValue) => setNumberOfQuestions(itemValue)}
      >
        <Picker.Item label="5" value="5" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="15" value="15" />
      </Picker>

      <Button
        title="Start Game"
        onPress={() =>
          navigation.navigate('Game', {
            operation,
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 200,
    marginVertical: 10,
  },
});