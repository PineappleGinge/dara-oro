import { FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getExercises } from '../services/exerciseService';

export default function ExerciseSelection() {
  const exercises = getExercises();

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <Text style={{ color: 'black', fontSize: 24 }}>
        Select Exercise
      </Text>

      <Text style={{ color: 'black' }}>
        Total exercises: {exercises.length}
      </Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ color: 'black', padding: 10 }}>
            {item.name}
          </Text>
        )}
      />

      <Text style={{ color: 'black' }}>
        Exercise data by RepDB
      </Text>
    </SafeAreaView>
  );
}