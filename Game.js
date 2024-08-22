import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function GameScreen({ navigation, route }) {
    const { targetNumber, randomNumbersArray } = route.params;
    const operators = ['+', '-', '*', '/']
  
  
    //show the 6 random numbers
    const StyledRandomNumbersArray = (props) => {
      const text = ("" + props.text).split(",");
      return (
        <Text>
          {props.text.map((text, index) => {
            return (
              <View key={index} style={styles.randomNumbersArrayContainer}>
                <Text style={styles.randomNumbersArray}>{text}</Text>
              </View>
            );
          })}
        </Text>
      );
    };
  
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <CountdownCircleTimer
            size={100}
            isPlaying
            duration={60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            onComplete={() =>
              navigation.navigate("End", {
                gameOver: "You Lose!",
              })
            }
          >
            {({ remainingTime }) => <Text>{remainingTime}</Text>}
          </CountdownCircleTimer>
          <Text style={styles.targetNumber}>{targetNumber}</Text>
          <StyledRandomNumbersArray text={randomNumbersArray} />
         
        </View>
      </SafeAreaView>
    );

    return(
        //add placeholders in our code
        <div>
        <View style={styles.liveEquation}>
          <Text style={styles.liveEquationText}>placeholder</Text>
        </View>
        <View style={styles.liveValue}>
          <Text style={styles.currentValue}>Current Value:</Text>
          <Text>placeholder</Text>
        </View>
        </div>
        );

        return(
            //add the 6 random digits to the left side of the keyboard
            <View style={styles.keyboardLeft}>
              <View style={styles.keyboardLeftRows}>
                {randomNumbersArray.slice(0, 2).map((number, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => console.log(number)}
                      style={styles.numberButton}
                      key={index}
                    >
                      <Text style={styles.numberButtonText}>{number}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.keyboardLeftRows}>
                {randomNumbersArray.slice(2, 4).map((number, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => console.log(number)}
                      style={styles.numberButton}
                      key={index}
                    >
                      <Text style={styles.numberButtonText}>{number}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.keyboardLeftRows}>
                {randomNumbersArray.slice(4, 6).map((number, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => console.log(number)}
                      style={styles.numberButton}
                      key={index}
                    >
                      <Text style={styles.numberButtonText}>{number}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            )

            return(
                //adding operators to the right side of the keyboard
                <View style={styles.keyboardLeft}>
                  <View style={styles.keyboardLeftRows}>
                    {operators.slice(0, 2).map((number, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => console.log(number)}
                          style={styles.numberButton}
                          key={index}
                        >
                          <Text style={styles.numberButtonText}>{number}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={styles.keyboardLeftRows}>
                    {operators.slice(2, 4).map((number, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => console.log(number)}
                          style={styles.numberButton}
                          key={index}
                        >
                          <Text style={styles.numberButtonText}>{number}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <View style={styles.keyboardLeftRows}>
                    {operators.slice(4, 6).map((number, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => console.log(number)}
                          style={styles.numberButton}
                          key={index}
                        >
                          <Text style={styles.numberButtonText}>{number}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                )
  }

  
  const styles = StyleSheet.create({
    numberButtonText: {
        fontSize: 20,
      },
      numberButton: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "grey",
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
      },
      keyboardLeftRows: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "33%",
      },
      keyboardContainer: {
        height: "30%",
        width: "90%",
        flexDirection: "row",
      },
      keyboardLeft: {
        height: "100%",
        width: "50%",
        backgroundColor: "lightgrey",
      },
    liveEquation: {
        width: "90%",
        height: "20%",
        borderWidth: 1,
        borderColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        padding: 15,
      },
      liveEquationText: {
        fontWeight: "bold",
        fontSize: 18,
      },
      liveValue: {
        alignItems: "center",
        justifyContent: "center",
        width: 220,
        height: 40,
        borderWidth: 1,
        borderColor: "lightgrey",
        marginVertical: 10,
        flexDirection: "row",
      },
      currentValue: {
        fontWeight: "bold",
        paddingRight: 10,
      },
    randomNumbersArray: {
      fontSize: 20,
    },
    randomNumbersArrayContainer: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: "lightgrey",
      alignItems: "center",
      justifyContent: "center",
    },
    targetNumber: {
      paddingVertical: 20,
      fontSize: 25,
      fontWeight: "bold",
    },
    safeAreaView: {
      backgroundColor: "white",
    },
    container: {
      height: "100%",
      width: "100%",
      backgroundColor: "#fff",
      alignItems: "center",
    },
  });