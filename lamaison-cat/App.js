import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

import Produtos from './pages/produtos';
import Prod from './pages/prod';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    'kaneda_gothic': require('./pages/font/kaneda/kaneda-gothic-regular-webfont.otf'),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
      <Stack.Screen name="Produtos" component={Produtos} options={{ headerShown: true, headerTitle: "Catálogo de Produtos", headerStyle: {backgroundColor: 'black'}, headerTitleStyle: {color: 'white', fontFamily: 'kaneda_gothic', fontSize: 40} }}/>
      <Stack.Screen name="Produto" component={Prod} options={{ headerShown: true, headerTitle: "Produto", headerStyle: {backgroundColor: 'black'}, headerTitleStyle: {color: 'white', fontFamily: 'kaneda_gothic', fontSize: 40}, headerTintColor: 'white' }}/>       
      </Stack.Navigator>
    </NavigationContainer>
  );
}