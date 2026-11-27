import repdb from "../../assets/repdb/free.en.json";
import type { Exercise } from "../types/exercise";

const exercises: Exercise[] = repdb.exercises;

// Gets all exercises
export function getExercises(): Exercise[] {
    return exercises;
}

// Gets exercises by category
export function getExercisesByCategory(category: string): Exercise[] {
    return exercises.filter(
        (exercise) => exercise.category === category
    );
}

// Search exercises by name
export function searchExercises(query: string): Exercise[] {
    return exercises.filter(
        (exercise) =>
            exercise.name.toLowerCase().includes(query.trim().toLowerCase())
    );
}

// Gets an individual exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
    return exercises.find(
        (exercise) => exercise.id === id
    );
}