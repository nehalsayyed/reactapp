/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';

const DATA = [
  { id: '1', text: 'Buy groceries' },
  { id: '2', text: 'Walk the dog' },
  { id: '3', text: 'Read a book' },
  { id: '4', text: 'Workout' },
];

const AnimatedCheckItem = ({ item, checked, onToggle }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: checked ? 1 : 1.1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: checked ? 1 : 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onToggle(item.id);
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View
        style={[
          styles.item,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
            backgroundColor: checked ? '#d1e7dd' : '#fff',
          },
        ]}
      >
        <Text style={styles.text}>
          {checked ? '✅ ' : '⬜️ '}
          {item.text}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function App() {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AnimatedCheckItem
            item={item}
            checked={!!checkedItems[item.id]}
            onToggle={toggleItem}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  text: {
    fontSize: 18,
  },
});
