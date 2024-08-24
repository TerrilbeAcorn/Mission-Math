import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function GameScreen({ route, navigation }) {
  const { operation, numberOfQuestions } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [question, setQuestion] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    generateQuestion();
  }, [currentQuestion]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = operation === 'addition' ? num1 + num2 : num1 - num2;

    setQuestion({
      num1,
      num2,
      correctAnswer,
    });
  };

  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === question.correctAnswer;
    setFeedback(isCorrect ? 'Correct!' : `Wrong! The correct answer was ${question.correctAnswer}`);
    if (isCorrect) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < numberOfQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
      setIsAnswered(false);
      setFeedback('');
    } else {
      navigation.navigate('Home', { score });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {question.num1} {operation === 'addition' ? '+' : '-'} {question.num2} = ?
      </Text>
      {!isAnswered ? (
        <>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Your Answer"
          />
          <Button title="Submit" onPress={handleSubmit} />
        </>
      ) : (
        <>
          <Text style={styles.feedback}>{feedback}</Text>
          <Button title="Next Question" onPress={handleNextQuestion} />
        </>
      )}
      <Text>Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
    marginBottom: 10,
    textAlign: 'center',
  },
  feedback: {
    fontSize: 18,
    marginVertical: 10,
  },
});