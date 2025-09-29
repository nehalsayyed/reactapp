/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// App.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Home':
        return <Text style={styles.screenText}>🏠 Home Screen</Text>;
      case 'Profile':
        return <Text style={styles.screenText}>👤 Profile Screen</Text>;
      case 'Settings':
        return <Text style={styles.screenText}>⚙️ Settings Screen</Text>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
          <Text style={styles.menuButton}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{activeScreen}</Text>
      </View>

      {menuOpen && (
        <View style={styles.sideMenu}>
          <TouchableOpacity onPress={() => { setActiveScreen('Home'); setMenuOpen(false); }}>
            <Text style={styles.menuItem}>🏠 Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setActiveScreen('Profile'); setMenuOpen(false); }}>
            <Text style={styles.menuItem}>👤 Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setActiveScreen('Settings'); setMenuOpen(false); }}>
            <Text style={styles.menuItem}>⚙️ Settings</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.screen}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  menuButton: {
    fontSize: 24,
    color: '#fff',
    marginRight: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  sideMenu: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 22,
    fontWeight: '600',
  },
});
