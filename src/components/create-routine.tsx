import { useEffect, useState } from "react";
import { Alert, Button, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    createRoutine,
    getRoutines,
    type Routine,
} from "../services/routineService";
import type { Exercise } from "../types/exercise";
import ExerciseSelection from "./exercise-selection";

export default function CreateRoutineScreen() {
  const [name, setName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [showExercises, setShowExercises] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [saving, setSaving] = useState(false);

  // Fetch existing routines on component mount
  async function loadRoutines() {
    try {
      const data = await getRoutines();
      setRoutines(data);
    } catch (error) {
      console.error("Error fetching routines:", error);
      Alert.alert("Error", "Failed to load routines. Please try again.");
    }
  }

  useEffect(() => {
    loadRoutines();
  }, []);

  // Add an exercise to the routine
  function addExercise(exercise: Exercise) {
    setSelectedExercises((previous) =>
      previous.some((item) => item.id === exercise.id)
        ? previous
        : [...previous, exercise],
    );

    setShowExercises(false);
  }

  // Remove an exercise from the routine
  function removeExercise(id: string) {
    setSelectedExercises((previous) =>
      previous.filter((exercise) => exercise.id !== id),
    );
  }

  // Save the routine to the database
  async function saveRoutine() {
    if (saving) return;

    if (!name.trim() || selectedExercises.length === 0) {
      Alert.alert(
        "Error",
        "Please provide a name and select at least one exercise.",
      );
      return;
    }

    setSaving(true);

    try {
      await createRoutine(
        name,
        selectedExercises.map((exercise) => exercise.id),
      );

      setName("");
      setSelectedExercises([]);
      Alert.alert("Success", "Routine saved successfully!");

      await loadRoutines();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save routine. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  // Open exercise selection
  if (showExercises) {
    return (
      <ExerciseSelection
        onSelectExercise={addExercise}
        onCancel={() => setShowExercises(false)}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={{ color: "black", fontSize: 24 }}>Routines</Text>

        <TextInput
          placeholder="Routine name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderColor: "black",
            color: "black",
            padding: 10,
            marginVertical: 10,
          }}
        />

        <Button
          title="Add Exercise"
          onPress={() => setShowExercises(true)}
          disabled={saving}
        />

        <Text style={{ color: "black", marginVertical: 10 }}>
          Selected Exercises: {selectedExercises.length}
        </Text>

        {selectedExercises.map((exercise) => (
          <View key={exercise.id}>
            <Text style={{ color: "black" }}>{exercise.name}</Text>

            <Button
              title="Remove"
              onPress={() => removeExercise(exercise.id)}
              disabled={saving}
            />
          </View>
        ))}

        <Button
          title={saving ? "Saving..." : "Save Routine"}
          onPress={saveRoutine}
          disabled={saving}
        />

        <Text style={{ color: "black", fontSize: 20, marginTop: 20 }}>
          Saved Routines
        </Text>

        {routines.map((routine) => (
          <Text key={routine.routineId} style={{ color: "black", padding: 10 }}>
            {routine.name}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
