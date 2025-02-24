import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
          height: 60,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="recargar"
        options={{
          title: 'Recargar',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'cash-sharp' : 'cash-outline'} color={color} size={26} />
          ),
        }}
      />
    </Tabs>
  );
}
