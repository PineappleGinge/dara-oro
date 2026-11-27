const repdb = require("../assets/repdb/free.en.json");

const exercises = repdb.exercises;

// Display the total number of exercises
console.log("Total exercises:", exercises.length);

// Display the first five exercises
console.log("\nFirst five exercises:");

exercises.slice(0, 5).forEach((exercise) => {
    console.log(exercise.name);
});

// Filter strength exercises
const strengthExercises = exercises.filter(
    (exercise) => exercise.category === "strength"
);

console.log("\nTotal strength exercises:", strengthExercises.length);