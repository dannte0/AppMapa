import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { styles } from '../styles/stylesHome';
import Ionicons from '@expo/vector-icons/Ionicons';

import sydneyImage from '../../assets/nemo_sidney.jpg';
import londonImage from '../../assets/peterpan.webp';
import parisImage from '../../assets/ratatouille.jpg';
import newyorkImage from '../../assets/spiderman.jpg';
import pridelandsImage from '../../assets/lion_king.webp'; 
const locations = [
  { 
    title: "Sydney, Austrália", 
    latitude: -33.8568, 
    longitude: 151.2153, 
    description: "O Sydney Harbour, incluindo a Sydney Opera House, aparece em Procurando Nemo quando os peixes tentam escapar para o oceano."
  },
  { 
    title: "Londres, Reino Unido", 
    latitude: 51.5074, 
    longitude: -0.1278, 
    description: "A cidade de Londres aparece em várias cenas de Peter Pan, incluindo o voo dos personagens sobre o Big Ben."
  },
  { 
    title: "Paris, França", 
    latitude: 48.8566, 
    longitude: 2.3522, 
    description: "Paris é o cenário de Ratatouille, onde o rato Remy explora a cidade e realiza seu sonho de se tornar chef."
  },
  { 
    title: "Nova York, EUA", 
    latitude: 40.7128, 
    longitude: -74.0060, 
    description: "A cidade de Nova York é o pano de fundo de muitas animações, incluindo Homem-Aranha no Aranhaverso e Madagascar."
  },
  { 
    title: "Pride Lands", 
    latitude: -2.3058, 
    longitude: 39.1270, 
    description: "O reino de 'O Rei Leão', onde Simba enfrenta desafios e descobre seu verdadeiro destino."
  }
];


export default function HomeScreen({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);

  // Obtendo a localização atual
  useEffect(() => {
    const getUserLocation = async () => {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setUserLocation({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
          title: 'Minha localização atual',
          description: 'Você está aqui',
        });
      }
    };
    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Localização em tempo real</Text>
      {userLocation && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Mapa', { location: userLocation })}
        >
          <Ionicons name="location-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Minha Localização Atual</Text>
        </TouchableOpacity>
      )}

<Text style={styles.title}>Locais em que se passam algumas animações</Text>
      {locations.map((loc, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate('Mapa', { location: loc })}
        ><Ionicons name="film-outline" size={24} color="black" />
          <Text style={styles.buttonText}>{loc.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
