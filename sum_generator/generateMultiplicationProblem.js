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
    let maxNumber1, maxNumber2;
    if (userAge >= 7 && userAge <= 14) {
        switch (userAge) {
            case 7:
                maxNumber1 = 50;
                maxNumber2 = 10;
                break;
            case 8:
                maxNumber1 = 100;
                maxNumber2 = 12;
                break;
            case 9:
                maxNumber1 = 200;
                maxNumber2 = 12;
                break;
            case 10:
                maxNumber1 = 400;
                maxNumber2 = 12;
                break;
            case 11:
                maxNumber1 = 500;
                maxNumber2 = 20;
                break;
            case 12:
                maxNumber1 = 1000;
                maxNumber2 = 50;
                break;
            case 13:
            case 14:
                maxNumber1 = 5000;
                maxNumber2 = 100;
                break;
            default:
                throw new Error("Invalid age. Please provide an age between 7 and 14.");
        }
    } else {
        throw new Error("Invalid age. Please provide an age between 7 and 14.");
    }
    
    // Generate two random numbers for the problem
    const num1 = Math.floor(Math.random() * maxNumber1) + 1;
    const num2 = Math.floor(Math.random() * maxNumber2) + 1;

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