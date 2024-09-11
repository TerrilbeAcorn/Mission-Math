// Aidan Ramsay OU ID - Z5704401
function generateAdditionProblem(userAge, difficulty) {
    // Set the time to solve based on difficulty level
    let timeToSolve;
    switch (difficulty) {
        case 1:
            timeToSolve = 90; // 90 seconds for level 1
            break;
        case 2:
            timeToSolve = 60; // 60 seconds for level 2
            break;
        case 3:
            timeToSolve = 30; // 30 seconds for level 3
            break;
        default:
            throw new Error("Invalid difficulty level. Please choose 1, 2, or 3.");
    }

    // Define the range for numbers based on age
    let maxNumber;
    if (userAge >= 7 && userAge <= 14) {
        switch (userAge) {
            case 7:
                maxNumber = 50;
                break;
            case 8:
                maxNumber = 100;
                break;
            case 9:
                maxNumber = 200;
                break;
            case 10:
                maxNumber = 400;
                break;
            case 11:
                maxNumber = 500;
                break;
            case 12:
                maxNumber = 1000;
                break;
            case 13:
            case 14:
                maxNumber = 5000;
                break;
            default:
                throw new Error("Invalid age. Please provide an age between 7 and 14.");
        }
} else {
    throw new Error("Invalid age. Please provide an age between 7 and 14.");
}

    // Aidan Ramsay OU ID - Z5704401
    // Generate two random numbers for the addition problem
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;

    // Calculate the correct answer
    const correctAnswer = num1 + num2;

    // Create the question string
    const question = `${num1} + ${num2} = ?`;

    // Return the addition problem object
    return {
        question: question,
        correctAnswer: correctAnswer,
        timeToSolve: timeToSolve
    };
}

// Export the function so it can be imported in other files
export default generateAdditionProblem;