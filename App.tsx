import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>🏠 Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>👤 Profile Screen</Text>
    </View>
  );
}

// ✅ TypeScript typing for drawer props
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://placekitten.com/100/100' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>John Doe</Text>
      </View>
      <DrawerItem
        label="Home"
        labelStyle={styles.drawerLabel}
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Profile"
        labelStyle={styles.drawerLabel}
        onPress={() => props.navigation.navigate('Profile')}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: { backgroundColor: '#1e1e2f', width: 240 },
          headerStyle: { backgroundColor: '#1e1e2f' },
          headerTintColor: '#fff',
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  text: { color: 'white', fontSize: 20 },
  drawer: { backgroundColor: '#1e1e2f' },
  drawerLabel: { color: 'white', fontSize: 16 },
  header: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  username: { color: 'white', fontSize: 18 }
});
