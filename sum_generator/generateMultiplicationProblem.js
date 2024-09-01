function generateMultiplicationProblem(userAge, difficulty) {
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
        maxNumber = 10 * userAge; // Increase number size with age
    } else {
        throw new Error("Invalid age. Please provide an age between 7 and 14.");
    }

    // Generate two random numbers for the multiplication problem
    const num1 = Math.floor(Math.random() * maxNumber) + 1;
    const num2 = Math.floor(Math.random() * maxNumber) + 1;

    // Calculate the correct answer
    const correctAnswer = num1 * num2;

    // Create the question string
    const question = `${num1} × ${num2} = ?`;

    // Return the multiplication problem object
    return {
        question: question,
        correctAnswer: correctAnswer,
        timeToSolve: timeToSolve
    };
}

// Export the function so it can be imported in other files
export default generateMultiplicationProblem;