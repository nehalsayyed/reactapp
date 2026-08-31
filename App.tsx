import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Configure how notifications behave when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    // Request permission (Android 13+ and iOS)
    async function requestPermissions() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }

      // Android requires a notification channel
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }

    requestPermissions();
  }, []);

  async function triggerNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello from System Notification!",
        body: "Triggered entirely from App.tsx without touching native Gradle files.",
        data: { screen: 'Details' },
      },
      trigger: {
        seconds: 2, // delays 2 seconds before showing
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Notifications Demo</Text>
      <Button title="Send Test Notification" onPress={triggerNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
