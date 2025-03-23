import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colorSchema } from '@/assets/colorSchema';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorSchema.light.primary,
        headerStyle: {
          backgroundColor: colorSchema.light.base100,
          height: 110,
        },
        headerShadowVisible: false,
        headerTintColor: colorSchema.light.baseContent,
        tabBarStyle: {
          backgroundColor: colorSchema.light.base100,
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
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reportes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'document-text-sharp' : 'document-text-outline'} color={color} size={26} />
          ),
        }}
      />
    </Tabs>
  );
}
