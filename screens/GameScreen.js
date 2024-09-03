import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import TwinklingStarBackground from './TwinklingStarBackground';

export default function GameScreen({ route, navigation }) {
  const { equations, difficulty } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(equations[0].timeToSolve || 0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [asteroidImage, setAsteroidImage] = useState(require('../assets/pixel-asteroid.png'));

  const asteroidPosition = useRef(new Animated.ValueXY({ x: 300, y: 0 })).current;
  const asteroidRotation = useRef(new Animated.Value(0)).current;

  const currentQuestion = equations[currentQuestionIndex];

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !isAnswered) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      handleSubmit();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  useEffect(() => {
    if (!isAnswered) {
      animateAsteroid();
    }
  }, [currentQuestionIndex]);

  const animateAsteroid = () => {
    // Reset animation values
    asteroidPosition.setValue({ x: 300, y: 0 });
    asteroidRotation.setValue(0);

    Animated.parallel([
      Animated.timing(asteroidPosition, {
        toValue: { x: 20, y: 350 }, // Adjust target position to match bottom left corner of gameBox
        duration: timeLeft * 1000, // Time matches the countdown timer
        easing: Easing.linear,
        useNativeDriver: false, // Use false to avoid native driver issues
      }),
      Animated.timing(asteroidRotation, {
        toValue: 1,
        duration: timeLeft * 1000, // Time matches the countdown timer
        easing: Easing.linear,
        useNativeDriver: false, // Use false to avoid native driver issues
      }),
    ]).start(({ finished }) => {
      if (finished && !isCorrect) {
        setAsteroidImage(require('../assets/pixel-boom.png'));
      }
    });
  };

  const handleSubmit = () => {
    const isCorrectAnswer = parseInt(userAnswer) === currentQuestion.correctAnswer;
    setIsCorrect(isCorrectAnswer);
  
    if (isCorrectAnswer) {
      const validTimeLeft = timeLeft > 0 ? timeLeft : 0;
      const validDifficulty = difficulty && difficulty > 0 ? difficulty : 1;
      const questionScore = Math.floor((validTimeLeft / 2) * validDifficulty);
  
      setScore((prevScore) => prevScore + questionScore);
      setFeedback('Correct!');
      asteroidPosition.stopAnimation();
      asteroidRotation.stopAnimation();
      setAsteroidImage(require('../assets/pixel-boom.png'));
    } else {
      setFeedback(`Wrong answer! The correct answer was ${currentQuestion.correctAnswer}`);
      accelerateAsteroid();
    }
  
    setIsAnswered(true);
  };

  const accelerateAsteroid = () => {
    Animated.parallel([
      Animated.timing(asteroidPosition, {
        toValue: { x: 20, y: 350 }, // Target position
        duration: 2000, // Accelerated speed
        easing: Easing.linear,
        useNativeDriver: false, // Use false to avoid native driver issues
      }),
      Animated.timing(asteroidRotation, {
        toValue: 1,
        duration: 2000, // Accelerated speed
        easing: Easing.linear,
        useNativeDriver: false, // Use false to avoid native driver issues
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setAsteroidImage(require('../assets/pixel-boom.png'));
      }
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < equations.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setTimeLeft(equations[currentQuestionIndex + 1].timeToSolve || 0);
      setIsAnswered(false);
      setFeedback('');
      setIsCorrect(false);
      setAsteroidImage(require('../assets/pixel-asteroid.png')); // Reset the image for the next question
      asteroidPosition.setValue({ x: 300, y: 0 });
      asteroidRotation.setValue(0);
    } else {
      navigation.navigate('Leaderboard', { finalScore: score });
    }
  };

  const handleKeyPress = (key) => {
    if (key === 'DEL') {
      setUserAnswer(userAnswer.slice(0, -1));
    } else if (key === 'SUBMIT') {
      handleSubmit();
    } else {
      setUserAnswer(userAnswer + key);
    }
  };

  const asteroidRotationInterpolate = asteroidRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <TwinklingStarBackground>
        <View style={styles.container}>
          <View style={styles.gameBox}>
            <Animated.Image
              source={asteroidImage}
              style={[
                styles.asteroidImage,
                {
                  transform: [
                    { translateX: asteroidPosition.x },
                    { translateY: asteroidPosition.y },
                    { rotate: asteroidRotationInterpolate },
                  ],
                },
              ]}
            />
            <Image source={require('../assets/pixel-earth.png')} style={styles.earthImage} />
          </View>
          <View style={styles.questionBox}>
            <View style={styles.leftHalf}>
              <Text style={styles.question}>{currentQuestion.question}</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={userAnswer}
                editable={false}
                placeholder="Your Answer"
                placeholderTextColor="gray"
              />
              {isAnswered && (
                <>
                  <Text style={styles.feedback}>{feedback}</Text>
                  {currentQuestionIndex < equations.length - 1 ? (
                    <Button title="Next Question" onPress={handleNextQuestion} />
                  ) : (
                    <Button title="Check Score" onPress={() => navigation.navigate('Leaderboard', { finalScore: score })} />
                  )}
                </>
              )}
              <Text style={styles.textColour}>Score: {score}</Text>
              <Text style={styles.textColour}>Time left: {timeLeft} seconds</Text>
            </View>
            <View style={styles.rightHalf}>
              <View style={styles.keypadContainer}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'DEL', '0', 'SUBMIT'].map((key) => (
                  <TouchableOpacity
                    key={key}
                    style={styles.keypadButton}
                    onPress={() => handleKeyPress(key)}
                  >
                    <Text style={styles.keypadText}>{key === 'DEL' ? 'DEL' : key === 'SUBMIT' ? 'SUBMIT' : key}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gameBox: {
    width: '100%',
    height: '65%', // Adjust height to fit above the grey UI box
    position: 'relative',
    overflow: 'hidden',
  },
  earthImage: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    width: 180,
    height: 180,
    resizeMode: 'contain',
    zIndex: 1, // Ensure Earth is behind the asteroid
  },
  asteroidImage: {
    position: 'absolute',
    width: 80,
    height: 80,
    resizeMode: 'contain',
    zIndex: 2, // Ensure asteroid is in front of Earth
  },
  questionBox: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  leftHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    textAlign: 'center',
    color: 'black',
  },
  feedback: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
  textColour: {
    color: 'black',
  },
  keypadContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButton: {
    width: '27%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  keypadText: {
    color: 'gray',
    fontSize: 18,
    textAlign: 'center',
  },
});
