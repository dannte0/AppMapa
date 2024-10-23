import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    markerContainer: {
        width: 100,  
        height: 100, 
        justifyContent: 'center',
        alignItems: 'center',
      },
      markerBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      markerImage: {
        width: '90%', 
        height: '90%',
      },
  });