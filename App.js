import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { API_KEY } from '@env';


export default function App() {
  const [hakusana, setHakusana] = useState('');
  const [koordinaatit, setKoordinaatit] = useState([]);
  const [lat, setLat] = useState('0');
  const [long, setLong] = useState('0');
  const [title, setTitle] = useState('');

  // .then(responseJson => setLat(responseJson.results.locations.latLng.lat))
  // .then(responseJson => setLong(responseJson.results.locations.latLng.lng))
  // .then(responseJson => setTitle(responseJson.results.providedLocation.location))

const getData = async () => {
  console.log(hakusana);
  const response = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${hakusana}`)
  console.log('Response status', response.status)
  .then(response => response.json())
  .then(responseJson => setKoordinaatit(responseJson.results))
  .catch((error) => {
    console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
  //Alert.alert('Error', error);
  });
  setLong(results.locations.latLng.lat);
  setLat(results.locations.latLng.lng);
  setTitle(results.providedLocation.location);
  setHakusana('');
};

useEffect(() => {getData() }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1,
        width: '100%',
        height: '100%' }}
        region={{
          latitude: parseFloat(lat),
          longitude: parseFloat(long)
        }}
      >
        <Marker coordinate={{
          latitude: parseFloat(lat),
          longitude: parseFloat(long)}}
          title={title}/>
      </MapView>
      <TextInput
      style={styles.kentta}
        placeholder='type'
        value={hakusana}
        onChangeText={text => setHakusana(text)}/>
      <Button title="Show" onPress= {getData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kentta: {
    alignItems: 'flex-start',
  },
});

// initialRegion={{
//   latitude: 60.200692,
//   longitude: 24.934302,
//   latitudeDelta: 0.0322,
//   longitudeDelta: 0.0221,
// }}