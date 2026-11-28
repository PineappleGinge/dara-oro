import { initializeDatabase } from "../database/database";

export interface Routine {
  routineId: number;
  name: string;
  createdAt: string;
}

export interface RoutineExercise {
  id: number;
  routineId: number;
  exerciseId: string;
  exerciseOrder: number;
}

// Create a new routine
export async function createRoutine(name: string, exerciseIds: string[]) {
  if (!name.trim()) {
    throw new Error("Routine name is required");
  }

  if (exerciseIds.length === 0) {
    throw new Error("At least one exercise is required");
  }

  const db = await initializeDatabase();

  await db.withTransactionAsync(async () => {
    const existingRoutine = await db.getFirstAsync<Routine>(
      "SELECT * FROM Routine WHERE name = ? COLLATE NOCASE",
      name.trim(),
    );

    if (existingRoutine) {
      throw new Error("A routine with this name already exists");
    }

    const result = await db.runAsync(
      "INSERT INTO Routine (name) VALUES (?)",
      name.trim(),
    );

    const routineId = result.lastInsertRowId;

    for (let i = 0; i < exerciseIds.length; i++) {
      await db.runAsync(
        `INSERT INTO RoutineExercise
         (routineId, exerciseId, exerciseOrder)
         VALUES (?, ?, ?)`,
        routineId,
        exerciseIds[i],
        i + 1,
      );
    }
  });
}

// Retrieve all saved routines
export async function getRoutines(): Promise<Routine[]> {
  const db = await initializeDatabase();

  return db.getAllAsync<Routine>(
    "SELECT * FROM Routine ORDER BY routineId DESC",
  );
}

// Retrieve exercises belonging to a routine
export async function getRoutineExercises(
  routineId: number,
): Promise<RoutineExercise[]> {
  const db = await initializeDatabase();

  return db.getAllAsync<RoutineExercise>(
    `SELECT * FROM RoutineExercise
     WHERE routineId = ?
     ORDER BY exerciseOrder`,
    routineId,
  );
}
