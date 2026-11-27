import * as SQLite from 'expo-sqlite';

export async function initializeDatabase() {
  const db = await SQLite.openDatabaseAsync('ironquest.db');

  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS Routine (
      routineId INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS RoutineExercise (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      routineId INTEGER NOT NULL,
      exerciseId TEXT NOT NULL,
      exerciseOrder INTEGER NOT NULL,
      FOREIGN KEY (routineId)
        REFERENCES Routine(routineId)
        ON DELETE CASCADE
    );
  `);

  return db;
}