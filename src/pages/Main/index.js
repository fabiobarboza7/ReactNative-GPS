import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, AppState } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
// import { Container } from './styles';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiZmFiaW9iYXJib3phNyIsImEiOiJjandjNm1yZWwwYWprNDlvN3hmNXltdnVyIn0.0oAJ8Ro030AnmxkKcCZPxg'
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'purple',
    transform: [{ scale: 0.8 }],
  },
});

export default function Main() {
  const [error, setError] = useState('');
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      e => {
        if (e.PERMISSION_DENIED === 1) {
          Alert.alert('Habilite o GPS e reinicie o APP');
        }
        setError(e.message);
      }
    );
  };

  function handleUpdateUserLocation(pos) {
    setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
  }

  function renderAnnotations() {
    return (
      <>
        <MapboxGL.UserLocation
          visible={false}
          onUpdate={e => handleUpdateUserLocation(e)}
        />
        <MapboxGL.PointAnnotation
          id="myGeoApp"
          coordinate={[position.longitude, position.latitude]}
        >
          <View style={styles.annotationContainer}>
            <View style={styles.annotationFill} />
          </View>
          <MapboxGL.Callout title="Localização do Canalha" />
        </MapboxGL.PointAnnotation>
      </>
    );
  }

  useEffect(() => {
    getPosition();
  }, []);

  return (
    <MapboxGL.MapView
      styleURL={MapboxGL.StyleURL.Dark}
      style={styles.container}
    >
      <MapboxGL.Camera
        zoomLevel={20}
        centerCoordinate={[position.longitude, position.latitude]}
      />
      {renderAnnotations()}
    </MapboxGL.MapView>
  );
}

Main.navigationOptions = {
  title: 'MyGeoApp',
};
