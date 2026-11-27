# IronQuest

## Project Overview

IronQuest is a mobile fitness progress tracking application being developed as a final-year Software Development project at Atlantic Technological University.

The application is designed for individuals who perform resistance training, regardless of their experience level. Its purpose is to allow users to create workout routines, record their workouts and track their progress over time.

## Planned Features

- Create, edit and delete workout routines.
- Select exercises from an existing exercise dataset.
- View exercise illustrations and instructions.
- Record sets, repetitions and weight lifted.
- Track individual exercise progression through graphs.
- Calculate percentage changes between workout sessions.
- Calculate and compare total workout volume.
- Create and track personal fitness goals.
- Export workout data.
- Import and restore workout data when changing devices.

## Technologies and Versions

| Technology | Version |
|---|---|
| Node.js | 24.12.0 |
| npm | 11.10.0 |
| Expo CLI | 58.1.21 |
| Expo SDK | ~58.0.26 |
| Expo Router | ~58.0.32 |
| React | 19.3.0 |
| React Native | 0.88.1 |
| TypeScript | ~6.0.3 |
| Application | 1.0.0 |

## Exercise Dataset

IronQuest will use the RepDB exercise dataset to provide exercise names, illustrations, instructions, muscle groups and equipment information.

RepDB was selected because it provides exercise information without requiring an API key or continuous internet access. Exercise illustrations will also assist users who are unfamiliar with particular exercises.

Source: https://github.com/RepDB/exercise-dataset

Exercise data by RepDB.

## Database

SQLite is the selected database technology for IronQuest.

User data will be stored locally on the user's device, allowing the application to function without an internet connection or user accounts.

## Running the Application

Install the required dependencies:

`npm install`

Start the Expo development server:

`npx expo start`

Scan the generated QR code using Expo Go to run the application on a mobile device.


