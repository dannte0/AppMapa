import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function DescricaoLocalizacao({ route }) {
  const { location } = route.params; // Recebe a localização clicada

  return (
    <View style={styles.container}>
    <Text style={styles.title}>{location.title}</Text>
    <Image source={location.image} style={styles.image} resizeMode="contain" />
    <Text style={styles.description}>{location.description}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  coordinates: {
    fontSize: 14,
    color: '#555',
  },
});
