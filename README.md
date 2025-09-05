<p style="display: flex; gap: 16px;">
  <img src="./assets/screenshots/MainScreen.png" width="200" style="border: 2px solid #ccc; border-radius: 8px;" />
  <img src="./assets/screenshots/PlayScreen.png" width="200" style="border: 2px solid #ccc; border-radius: 8px;" />
  <img src="./assets/screenshots/AddWordScreen.png" width="200" style="border: 2px solid #ccc; border-radius: 8px;" />
  <img src="./assets/screenshots/WarningScreen.png" width="200" style="border: 2px solid #ccc; border-radius: 8px;" />
</p>

# Learn-Word-React-Native

## 🚀 Overview
Learn-Word-React-Native is an interactive app designed to help users learn words in different languages. This app leverages the power of React Native to provide a seamless and engaging learning experience. Whether you're a language learner or a teacher, this app offers a fun and effective way to expand your vocabulary.

### Key Features:
- **Interactive Word Learning**: Swipe through words to learn and test your knowledge.
- **Add Words**: Easily add new words to your vocabulary.
- **Word List**: View and manage your list of learned words.
- **User-Friendly Interface**: Intuitive design for a smooth user experience.

### Who This Project Is For:
- Language learners
- Teachers and educators
- Anyone looking to expand their vocabulary

## ✨ Features
- 📚 **Word Learning**: Swipe through words to learn and test your knowledge.
- 📝 **Add Words**: Easily add new words to your vocabulary.
- 📋 **Word List**: View and manage your list of learned words.
- 🎨 **User-Friendly Interface**: Intuitive design for a smooth user experience.

## 🛠️ Tech Stack
- **Programming Language**: JavaScript
- **Frameworks and Libraries**:
  - React Native
  - React Navigation
  - Expo
  - SQLite
  - Lodash
  - React Native Deck Swiper
  - React Native Linear Gradient
  - React Native Safe Area Context
  - React Native Screens
  - React Native Toast Message
- **Tools**:
  - Babel
  - EAS (Expo Application Services)

## 📦 Installation

### Prerequisites
- Node.js (v14 or later)
- Expo CLI
- React Native CLI (optional)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/Learn-Word-React-Native.git

# Navigate to the project directory
cd Learn-Word-React-Native

# Install dependencies
npm install

# Start the app
npm start
```

### Alternative Installation Methods
- **Using Expo CLI**:
  ```bash
  expo start
  ```

- **Using React Native CLI**:
  ```bash
  npx react-native run-android
  npx react-native run-ios
  ```

## 🎯 Usage

### Basic Usage
```javascript
// Import necessary components
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/learnScreen';
import AddWordScreen from './screens/AddWordScreen';
import WordListScreen from './screens/WordListScreen';
import { SQLiteProvider } from 'expo-sqlite';

// Main App Component
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SQLiteProvider databaseName="words.db" onInit={async (db) => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS words (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          en TEXT NOT NULL,
          tr TEXT NOT NULL
        );
        PRAGMA journal_mode=WAL;
      `)
    }} options={{ useNewConnections: false }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LearnScreen" component={LearnScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddWordScreen" component={AddWordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WordListScreen" component={WordListScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SQLiteProvider>
  );
}
```

### Advanced Usage
- **Adding Words**:
  ```javascript
  // Example of adding a new word
  const addWord = async (en, tr) => {
    await db.runAsync('INSERT INTO words (en, tr) VALUES (?, ?)', [en, tr]);
  };
  ```

## 📁 Project Structure
```
Learn-Word-React-Native/
├── assets/
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   ├── favicon.png
│   └── words.json
├── screens/
│   ├── AddWordScreen.js
│   ├── components/
│   │   ├── AddForm.js
│   │   ├── HomeButton.js
│   │   └── WordBlock.js
│   ├── HomeScreen.js
│   ├── learnScreen.js
│   └── WordListScreen.js
├── App.js
├── app.json
├── babel.config.js
├── eas.json
├── package.json
├── package-lock.json
└── README.md
```

## 🔧 Configuration
- **Environment Variables**: None required.
- **Configuration Files**: `app.json` and `eas.json` are used for configuration.

## 🤝 Contributing
We welcome contributions! Here's how you can get started:

### Development Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Learn-Word-React-Native.git
   cd Learn-Word-React-Native
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the App**:
   ```bash
   npm start
   ```

### Code Style Guidelines
- Follow the standard JavaScript and React Native coding conventions.
- Use consistent indentation and formatting.

### Pull Request Process
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your branch to your fork.
5. Open a pull request.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors & Contributors
- **Maintainers**: [Your Name]
- **Contributors**: [List of contributors]

## 🐛 Issues & Support
- **Report Issues**: Open an issue on the [GitHub Issues page](https://github.com/yourusername/Learn-Word-React-Native/issues).
- **Get Help**: Join the [Discussion Forum](https://github.com/yourusername/Learn-Word-React-Native/discussions).

## 🗺️ Roadmap
- **Planned Features**:
  - Add support for multiple languages.
  - Implement a scoring system.
  - Add user authentication.
- **Known Issues**:
  - [Issue 1](https://github.com/yourusername/Learn-Word-React-Native/issues/1)
  - [Issue 2](https://github.com/yourusername/Learn-Word-React-Native/issues/2)
- **Future Improvements**:
  - Improve UI/UX.
  - Add more interactive features.

---

**Badges**:
[![Build Status](https://travis-ci.com/yourusername/Learn-Word-React-Native.svg?branch=main)](https://travis-ci.com/yourusername/Learn-Word-React-Native)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/Learn-Word-React-Native?style=social)](https://github.com/yourusername/Learn-Word-React-Native/stargazers)
