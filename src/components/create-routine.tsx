import { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExerciseSelection from './exercise-selection';
import type { Exercise } from '../types/exercise';
import {
  createRoutine,
  getRoutines,
  type Routine,
} from '../services/routineService';