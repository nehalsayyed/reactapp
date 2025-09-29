/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Provider as PaperProvider, Avatar, Title, Caption, Drawer as PaperDrawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

// Screens
function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>🏠 Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>👤 Profile Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>⚙️ Settings Screen</Text>
    </View>
  );
}

// Custom Drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=3' }} size={50} />
        <Title style={styles.title}>John Doe</Title>
        <Caption style={styles.caption}>@johndoe</Caption>
      </View>

      <PaperDrawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
          label="Home"
          onPress={() => props.navigation.navigate('Home')}
        />
        <DrawerItem
          icon={({ color, size }) => <Icon name="account-outline" color={color} size={size} />}
          label="Profile"
          onPress={() => props.navigation.navigate('Profile')}
        />
        <DrawerItem
          icon={({ color, size }) => <Icon name="cog-outline" color={color} size={size} />}
          label="Settings"
          onPress={() => props.navigation.navigate('Settings')}
        />
      </PaperDrawer.Section>
    </DrawerContentScrollView>
  );
}

// Main App
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{ headerShown: true }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenText: {
    fontSize: 22,
    fontWeight: '600',
  },
  userInfoSection: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  title: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: '#777',
  },
  drawerSection: {
    marginTop: 15,
  },
});

          
