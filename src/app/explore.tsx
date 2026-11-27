import { useEffect } from 'react';
import ExerciseSelection from '../components/exercise-selection';
import { initializeDatabase } from '../database/database';

export default function ExploreScreen() {
  useEffect(() => {
    async function testDatabase() {
      try {
        const db = await initializeDatabase();

        const tables = await db.getAllAsync(
          "SELECT name FROM sqlite_master WHERE type = 'table'"
        );

        console.log('Database initialized successfully');
        console.log('Database tables:', tables);
      } catch (error) {
        console.error('Database error:', error);
      }
    }

    testDatabase();
  }, []);

  return <ExerciseSelection />;
}