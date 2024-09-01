import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function GameScreen({ route, navigation }) {
  const { equations } = route.params; // Retrieve equations from route params
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(equations[0].timeToSolve);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');

  const currentQuestion = equations[currentQuestionIndex];

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isAnswered) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleSubmit(); // Auto-submit when time runs out
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === currentQuestion.correctAnswer;
    setFeedback(isCorrect ? 'Correct!' : `Wrong! The correct answer was ${currentQuestion.correctAnswer}`);
    if (isCorrect) {
      setScore(score + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < equations.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setTimeLeft(equations[currentQuestionIndex + 1].timeToSolve);
      setIsAnswered(false);
      setFeedback('');
    } else {
      navigation.navigate('Home', { score });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {currentQuestion.question}
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
          <Text>Time left: {timeLeft} seconds</Text>
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