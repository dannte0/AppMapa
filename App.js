import React, { useState, useEffect, useRef} from 'react';

import { View, TouchableOpacity } from 'react-native';

import { 
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';

import MapView, { Marker } from 'react-native-maps';
import { styles } from './src/styles/style';

export default function App() {

  const [ latitude, setLatitude ] = useState(null);
  const [ longitude, setLongitude ] = useState(null);

  const [ location, setLocation ]= useState(null);
  const mapReference = useRef(MapView);

  async function requestLocationPermissions() {
    const permissionsResponse = await requestForegroundPermissionsAsync();
    const { granted } = permissionsResponse;
  
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }
  

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() =>{
    watchPositionAsync({
      accuracy:LocationAccuracy.Highest,
      timeInterval:1000,
      distanceInterval:1
    },
    (response) => {
      if(response?.coords){
        setLocation(response);  
        mapReference.current?.animateCamera({
          pitch:70,
          center: response.coords
        })
      }
    });
  }, 
  []);

  return (
    <View style={styles.container}>
      {
        location &&
            <MapView
            ref={mapReference}
            style={styles.map}         
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005, 
    
            }}
          >
        <TouchableOpacity>
        <Marker
          coordinate={
            {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
            }
        }
          title={"Minha localização atual"}
          description={latitude}
        />
        <Marker
          coordinate={
            {
            latitude: 43.77380379096904,
            longitude: 11.256155635937741
            }
        }
          title={"Florenca"}  
          description={"Cidade em que nasceu pinoquio"}
        />
        <Marker
          coordinate={
            {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
            }
        }
          title={"Minha localização atual"}
          description={latitude}
        />
        </TouchableOpacity>
        </MapView>
} 
    </View>
  );
}

