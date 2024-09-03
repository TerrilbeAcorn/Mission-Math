import generateAdditionProblem from './generateAdditionProblem';
import generateSubtractionProblem from './generateSubtractionProblem';
import generateMultiplicationProblem from './generateMultiplicationProblem';
import generateDivisionProblem from './generateDivisionProblem';
import generateMixedProblem from './generateMixedProblem';

/**
 * @typedef {Object} Equation
 * @property {string} question
 * @property {number} correctAnswer
 * @property {number} timeToSolve
 */

/**
 * Generates a list of math problems.
 * @param {string[]} equationType - Array of equation types ('addition', 'subtraction', 'multiplication', 'division', 'bodmas').
 * @param {number} noOfEquations - Number of equations to generate.
 * @param {number} userAge - User's age to determine difficulty.
 * @param {number} difficulty - Difficulty level (1, 2, 3).
 * @returns {Equation[]} List of generated equations.
 */

export default function equationMachine(equationType, noOfEquations, userAge, difficulty) {
    const equationsList = [];
  
    for (let i = 0; i < noOfEquations; i++) {
      const randomType = equationType[Math.floor(Math.random() * equationType.length)];
  
      let equation;
      switch (randomType) {
        case 'addition':
          equation = generateAdditionProblem(userAge, difficulty);
          break;
        case 'subtraction':
          equation = generateSubtractionProblem(userAge, difficulty);
          break;
        case 'multiplication':
          equation = generateMultiplicationProblem(userAge, difficulty);
          break;
        case 'division':
          equation = generateDivisionProblem(userAge, difficulty);
          break;
        case 'bodmas':
          equation = generateMixedProblem(userAge, difficulty);
          break;
        default:
          throw new Error(`Invalid equation type: ${randomType}`);
      }
  
      equationsList.push(equation);
    }
  
    return equationsList;
}
