import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchExercises } from "../services/exerciseService";

// Define the body parts for filtering exercises
const bodyParts = [
  { label: "All", value: "all" },
  { label: "Chest", value: "chest" },
  { label: "Back", value: "back" },
  { label: "Shoulders", value: "shoulders" },
  { label: "Upper Arms", value: "upper_arms" },
  { label: "Lower Arms", value: "lower_arms" },
  { label: "Upper Legs", value: "upper_legs" },
  { label: "Lower Legs", value: "lower_legs" },
  { label: "Core", value: "core" },
  { label: "Full Body", value: "full_body" },
];

export default function ExerciseSelection() {
  const [search, setSearch] = useState("");
  const [bodyPart, setBodyPart] = useState("all");

  const exercises = searchExercises(search).filter(
    (exercise) => bodyPart === "all" || exercise.body_part === bodyPart,
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: "white" }}>
      <Text style={{ color: "black", fontSize: 24 }}>Select Exercise</Text>

      <TextInput
        placeholder="Search exercises..."
        placeholderTextColor="gray"
        value={search}
        onChangeText={setSearch}
        style={{
          height: 45,
          borderWidth: 1,
          borderColor: "black",
          backgroundColor: "white",
          padding: 10,
          marginVertical: 10,
          color: "black",
          fontSize: 16,
        }}
      />

      <ScrollView
        horizontal
        style={{ flexGrow: 0, flexShrink: 0, marginBottom: 10 }}
      >
        {bodyParts.map((part) => (
          <Pressable
            key={part.value}
            onPress={() => setBodyPart(part.value)}
            style={{
              padding: 10,
              marginRight: 5,
              borderWidth: 1,
              borderColor: "black",
              backgroundColor: bodyPart === part.value ? "black" : "white",
            }}
          >
            <Text
              style={{
                color: bodyPart === part.value ? "white" : "black",
              }}
            >
              {part.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={{ color: "black" }}>
        Total exercises: {exercises.length}
      </Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ color: "black", padding: 10 }}>{item.name}</Text>
        )}
      />

      <Text style={{ color: "black" }}>Exercise data by RepDB</Text>
    </SafeAreaView>
  );
}
