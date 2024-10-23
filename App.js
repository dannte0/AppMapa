import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home';
import MapScreen from './src/screens/Mapa';
import DescricaoLocalizacao from './src/screens/DescLocalizacao';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false}}/>
        <Stack.Screen name="Mapa" component={MapScreen} />
        <Stack.Screen name="Descricao" component={DescricaoLocalizacao} options={{ title: 'Detalhes do Local' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
