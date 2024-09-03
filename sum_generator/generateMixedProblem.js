function generateMixedProblem(ageGroup, difficulty) {
    // Step 1: Set the max number based on age group
    let maxNumber;
    if (ageGroup >= 7 && ageGroup <= 11) {
      maxNumber = 10;
    } else if (ageGroup >= 12 && ageGroup <= 14) {
      maxNumber = 20;
    } else {
      throw new Error('Invalid age group');
    }
  
    // Step 2: Set the time limit based on difficulty (time limit in seconds)
    let timeToSolve;
    switch (difficulty) {
      case 1:
        timeToSolve = 90;
        break;
      case 2:
        timeToSolve = 60;
        break;
      case 3:
        timeToSolve = 30;
        break;
      default:
        timeToSolve = 90; // Default to easiest if not specified
    }
  
    // Step 3: Generate the inner problem (either addition or subtraction)
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;
    const useAddition = Math.random() < 0.5;
  
    let innerProblemQuestion;
    let innerProblemAnswer;
  
    if (useAddition) {
      innerProblemQuestion = `${num1} + ${num2}`;
      innerProblemAnswer = num1 + num2;
    } else {
      innerProblemQuestion = `${num1} - ${num2}`;
      innerProblemAnswer = num1 - num2;
    }
  
    // Step 4: Generate the outer problem (either multiplication or division)
    const useMultiplication = Math.random() < 0.5;
  
    let finalProblemQuestion;
    let finalAnswer;
  
    if (useMultiplication) {
      const num3 = Math.floor(Math.random() * maxNumber) + 1;
  
      // Randomly decide whether the inner problem comes first or second
      if (Math.random() < 0.5) {
        finalProblemQuestion = `(${innerProblemQuestion}) * ${num3}`;
        finalAnswer = innerProblemAnswer * num3;
      } else {
        finalProblemQuestion = `${num3} * (${innerProblemQuestion})`;
        finalAnswer = num3 * innerProblemAnswer;
      }
    } else {
      // Division: Determine whether inner problem is the dividend or the divisor
      let num3;
      if (Math.random() < 0.5) {
        // Inner problem as dividend
        num3 = Math.floor(Math.random() * maxNumber) + 1;
        const dividend = innerProblemAnswer * num3;
        finalProblemQuestion = `(${innerProblemQuestion}) / ${num3}`;
        finalAnswer = innerProblemAnswer;
      } else {
        // Inner problem as divisor
        num3 = Math.floor(Math.random() * (maxNumber * innerProblemAnswer)) + 1;
        if (innerProblemAnswer !== 0) {
          finalProblemQuestion = `${num3} / (${innerProblemQuestion})`;
          finalAnswer = Math.floor(num3 / innerProblemAnswer);
          // Adjust num3 so that it is evenly divisible by innerProblemAnswer
          num3 = finalAnswer * innerProblemAnswer;
          finalProblemQuestion = `${num3} / (${innerProblemQuestion})`;
        } else {
          // Handle the special case where innerProblemAnswer is zero to avoid division by zero
          num3 = 0;
          finalProblemQuestion = `${num3} / (${innerProblemQuestion})`;
          finalAnswer = 0;
        }
      }
    }
  
    // Step 5: Return the final mixed problem
    return {
      question: finalProblemQuestion,
      correctAnswer: finalAnswer,
      timeToSolve: timeToSolve,
    };
  }
  // Export the function so it can be imported in other files
export default generateMixedProblem;