import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// --- Types ---
interface NotificationConfig {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const { width } = Dimensions.get('window');

export default function App() {
  // --- State ---
  const [notification, setNotification] = useState<NotificationConfig | null>(null);
  
  // --- Animation Refs ---
  const slideAnim = useRef(new Animated.Value(-150)).current; // Start hidden above screen
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // --- Trigger Notification Function ---
  const triggerNotification = (title: string, message: string, type: NotificationConfig['type']) => {
    // Clear any existing active timeouts to reset the timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Update notification content
    setNotification({ id: Date.now().toString(), title, message, type });
  };

  // --- Handle Animation Lifecycle ---
  useEffect(() => {
    if (notification) {
      // Animate In
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 20, // Final position from top (adjust based on safe area if needed)
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-dismiss after 4 seconds
      timeoutRef.current = setTimeout(() => {
        dismissNotification();
      }, 4000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [notification]);

  // --- Dismiss Function ---
  const dismissNotification = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setNotification(null);
    });
  };

  // --- Dynamic Styling Helper ---
  const getNotificationStyle = () => {
    switch (notification?.type) {
      case 'success': return styles.successBg;
      case 'error': return styles.errorBg;
      default: return styles.infoBg;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- Custom Notification Banner --- */}
      {notification && (
        <Animated.View
          style={[
            styles.notificationContainer,
            getNotificationStyle(),
            {
              transform: [{ translateY: slideAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <TouchableOpacity 
            style={styles.notificationContent} 
            onPress={dismissNotification}
            activeOpacity={0.9}
          >
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* --- Main Application Content --- */}
      <View style={styles.content}>
        <Text style={styles.appTitle}>Notification Center</Text>
        <Text style={styles.appSubtitle}>Tap a button below to test custom in-app notifications.</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.btnSuccess]}
            onPress={() => triggerNotification('Success!', 'Your data has been successfully synced.', 'success')}
          >
            <Text style={styles.buttonText}>Trigger Success</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.btnError]}
            onPress={() => triggerNotification('Connection Lost', 'Please check your internet settings.', 'error')}
          >
            <Text style={styles.buttonText}>Trigger Error</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.btnInfo]}
            onPress={() => triggerNotification('Update Available', 'Version 2.0 is now available for download.', 'info')}
          >
            <Text style={styles.buttonText}>Trigger Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1D20',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 15,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  btnSuccess: { backgroundColor: '#2EC4B6' },
  btnError: { backgroundColor: '#E71D36' },
  btnInfo: { backgroundColor: '#118AB2' },

  // --- Notification Specific Styles ---
  notificationContainer: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    zIndex: 9999,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  notificationTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  notificationMessage: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.9,
  },
  closeButton: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.7,
    paddingLeft: 10,
  },
  successBg: { backgroundColor: '#2EC4B6' },
  errorBg: { backgroundColor: '#E71D36' },
  infoBg: { backgroundColor: '#118AB2' },
});
          
