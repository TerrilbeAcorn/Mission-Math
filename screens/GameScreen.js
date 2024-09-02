import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, TextInput, StyleSheet } from 'react-native';
import TwinklingStarBackground from './TwinklingStarBackground';

export default function GameScreen({ route, navigation }) {
  const { equations, difficulty } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(equations[0].timeToSolve || 0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');

  const currentQuestion = equations[currentQuestionIndex];

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isAnswered) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  const handleSubmit = () => {
    const isCorrect = parseInt(userAnswer) === currentQuestion.correctAnswer;
    setFeedback(isCorrect ? 'Correct!' : `Wrong! The correct answer was ${currentQuestion.correctAnswer}`);

    if (isCorrect) {
      const validTimeLeft = timeLeft >= 0 ? timeLeft : 0;
      const validDifficulty = difficulty && difficulty > 0 ? difficulty : 1;
      const questionScore = Math.floor((validTimeLeft / 2) * validDifficulty);
      setScore((prevScore) => prevScore + questionScore);
    }

    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < equations.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setTimeLeft(equations[currentQuestionIndex + 1].timeToSolve || 0);
      setIsAnswered(false);
      setFeedback('');
    } else {
      navigation.navigate('Leaderboard', { finalScore: score });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TwinklingStarBackground>
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
                placeholderTextColor="gray"
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
  question: {
    fontSize: 24,
    marginBottom: 20,
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
    marginBottom: 10,
    textAlign: 'center',
    color: 'gray',
  },
  feedback: {
    fontSize: 18,
    marginVertical: 10,
    color: 'gray',
  },
});
