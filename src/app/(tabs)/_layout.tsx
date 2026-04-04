import { useEffect } from 'react';
import { requestPermissionsAsync } from 'expo-contacts';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { NativeTabs } from 'expo-router/build/native-tabs';
import { useRouter, useGlobalSearchParams } from 'expo-router';


export default function RootLayout() {
  useEffect(() => {
    (async () => {
      await requestPermissionsAsync();
    })();
  }, []);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'unspecified' ? 'light' : colorScheme];

  const router = useRouter();
  const { scheduled, wasManualTriggered } = useGlobalSearchParams<{ scheduled?: string; wasManualTriggered?: string }>();


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NativeTabs
        backgroundColor={colors.base200}
        indicatorColor={colors.primary}
        iconColor={{ default: undefined, selected: '#ffffff' }}
        rippleColor="#87c563"
        labelStyle={{ selected: { color: colors.baseContent } }}
        screenListeners={{
          tabPress: (e) => {
            const page = e.target?.split('-')[0]

            if (page === 'recharge') {
              if (wasManualTriggered === 'true') {
                router.setParams({ scheduled: scheduled, wasManualTriggered: undefined })
              } else {
                router.navigate('/recharge')
              }
            }
          },
        }}
      >
        <NativeTabs.Trigger name="recharge">
          <NativeTabs.Trigger.Label>Recargar</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon md="paid" sf={{ default: 'dollarsign.circle', selected: 'dollarsign.circle.fill' }} />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="reporting">
          <NativeTabs.Trigger.Label>Reportes</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon md="docs" sf={{ default: 'doc.text', selected: 'doc.text.fill' }} />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="extra">
          <NativeTabs.Trigger.Label>Más</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon md="add_box" sf={{ default: 'doc.text', selected: 'doc.text.fill' }} />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
