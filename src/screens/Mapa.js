import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { styles } from '../styles/stylesMap';

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
    description: "O Sydney Harbour, incluindo a Sydney Opera House, aparece em Procurando Nemo.",
    image: sydneyImage,
  },
  { 
    title: "Londres, Reino Unido", 
    latitude: 51.5074, 
    longitude: -0.1278, 
    description: "A cidade de Londres aparece em várias cenas de Peter Pan.",
    image: londonImage,
  },
  { 
    title: "Paris, França", 
    latitude: 48.8566, 
    longitude: 2.3522, 
    description: "Paris é o cenário principal do filme Ratatouille.",
    image: parisImage,
  },
  { 
    title: "Nova York, EUA", 
    latitude: 40.7128, 
    longitude: -74.0060, 
    description: "A cidade de Nova York é o pano de fundo de muitas animações.",
    image: newyorkImage,
  },
  { 
    title: "Pride Lands", 
    latitude: -2.3058, 
    longitude: 39.1270, 
    description: "O reino de 'O Rei Leão'.",
    image: pridelandsImage,
  }
];

const CustomMarker = ({ image }) => {
  return (
    <View style={styles.markerContainer}>
    <View style={styles.markerBackground}>
      <Image source={image} style={styles.markerImage} resizeMode="contain" />
    </View>
  </View>
  );
};

export default function MapScreen({ route, navigation }) {
  const { location } = route.params; // Recebe a localização
  const [userLocation, setUserLocation] = useState(null);
  const mapReference = useRef(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const currentPosition = await getCurrentPositionAsync();
        setUserLocation(currentPosition);

        // Move a câmera para a localização selecionada
        if (mapReference.current) {
          mapReference.current.animateCamera({
            center: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            pitch: 70,
            zoom: 15,
          });
        }
      }
    };

    getCurrentLocation();
  }, [location]);

  // Função para navegar para a tela de detalhes do local
  const handleMarkerPress = (loc) => {
    navigation.navigate('Descricao', { location: loc });
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          ref={mapReference}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {/* Marcador da localização atual */}
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title={"Minha localização atual"}
            description={"Você está aqui"}
          />

          {/* Marcadores para as localizações */}
          {locations.map((loc, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: loc.latitude,
                longitude: loc.longitude,
              }}
              title={loc.title}
              description={loc.description}
              onPress={() => handleMarkerPress(loc)}
              // Substitua a propriedade image com o componente CustomMarker
              children={<CustomMarker image={loc.image} />} // Aqui você usa o CustomMarker
            />
          ))}
        </MapView>
      )}
    </View>
  );
}
