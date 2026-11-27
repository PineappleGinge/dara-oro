import { useState } from 'react';
import { FlatList, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchExercises } from '../services/exerciseService';

export default function ExerciseSelection() {
  const [search, setSearch] = useState('');

const exercises = searchExercises(search);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <Text style={{ color: 'black', fontSize: 24 }}>
        Select Exercise
      </Text>

    <TextInput
        placeholder="Search exercises..."
        placeholderTextColor="gray"
        value={search}
        onChangeText={setSearch}
    style={{
        height: 45,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        color: 'black',
        fontSize: 16,
        }}
    />
    
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