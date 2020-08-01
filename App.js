import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, Button, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';



const { width, height } = Dimensions.get('screen'); 

export default function App() {
  const [active, setActive] = useState("second");
  const [crimeSpots, setCrimeSpots] = useState([]);

 

  const postLoc = () => {
    fetch('https://unisafe-44526.firebaseio.com/places.json', {
      method: 'POST',
      body: JSON.stringify({
        latitude: 33.6405,
        longitude: -117.8443
      })
    })
  }


  const getUserPlacesHandler = () => {
    fetch('https://unisafe-44526.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray = [];
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          });
        }
        setCrimeSpots(placesArray);
        //console.log("Places array: ", placesArray)
      })
      .catch(err => console.log(err));
  };


  const crimeSpotLists = crimeSpots.map(userPlace => <MapView.Marker coordinate={userPlace} key={userPlace.id}/>)

  function returnView() {
    if (active == "first") {
      return(
        <View style={[styles.bottomView, {alignItems: 'center'}]}>
          <Text> First Screen </Text>

          <View style={{backgroundColor: 'white', borderRadius: 10, width: width * 0.7, margin: 10}}>
            <Text> Someone 1     X Trips</Text>
          </View>
          <View style={{backgroundColor: 'white', borderRadius: 10, width: width * 0.7, margin: 10}}>
            <Text> Someone 2     X Trips</Text>
          </View>
          <View style={{backgroundColor: 'white', borderRadius: 10, width: width * 0.7, margin: 10}}>
            <Text> Someone 3     X Trips</Text>
          </View>

        </View>  
      )
    }
    else if (active == "second") {
      return(
        <View style={styles.bottomView}>
          
          <MapView
                style={styles.map}
                enableZoomControl={true}
                // showsUserLocation = {true}
                showsMyLocationButton = {true}
                zoomEnabled = {true}
                initalRegion={{
                    // UC Irvine
                    latitude: 33.6405,
                    longitude: -117.8443,
                    latitudeDelta: 0.00422,
                    longitudeDelta: 0.00121,
                }}
                region={{
                  latitude: 33.6405,
                    longitude: -117.8443,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0.0121,
                }}>
                    {/* {searchLocMarker}
                    {usersMarkers} */}
                    {crimeSpotLists}
            </MapView>
        </View>  
      )
    }
    else if (active == "third") {
      return(
        <View style={styles.bottomView}>
          <Text> Third Screen </Text>
          <Button title="post loc" onPress={postLoc}/>
          <Button title="Show crime spots" onPress={getUserPlacesHandler}/>

          <Ionicons name="md-checkmark-circle" size={32} color="green" />
        </View>  
      )
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.StatusBar}>
        <Text></Text>
      </View>

      <View style={styles.header}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 28, fontWeight: 'bold', top: 15}}> UniSAFE </Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActive("first")} style={[
          styles.tab,
          (active === 'first' ? styles.activeTab : null)
          ]}>
          <FontAwesome5 name="user-friends" size={32} color={active === "first" ? "orange" : "#001149"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActive("second")} style={[
          styles.tab,
          (active === 'second' ? styles.activeTab : null)
          ]}>
          <FontAwesome5 name="map-marked-alt" size={32} color={active === "second" ? "orange" : "#001149"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActive("third")} style={[
          styles.tab,
          (active === 'third' ? styles.activeTab : null)
          ]}>
          <Ionicons name="ios-notifications" size={32} color={active === "third" ? "orange" : "#001149"} />
        </TouchableOpacity>
      </View>

      {returnView()}


      <StatusBar style="auto" />
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
  StatusBar: {
    height: (Platform.OS === 'ios') ? 18 : 24,
    backgroundColor: 'white',
  },
  header: {
    //flex: 1,
    position: 'absolute',
    top: (Platform.OS === 'ios') ? 18 : 24,
    backgroundColor: '#001149', // The blue for the app
    width: width,
    height: height * 0.08,
  },
  tabs: {
    //flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: (Platform.OS === 'ios') ? height * 0.08 + 18 : height * 0.08 + 24,
    height: height * 0.06,
    width: width,
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderColor: 'black',
    borderWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: height * 0.05
  },
  activeTab: {
    borderBottomColor: 'orange',
    borderBottomWidth: 3,
  },
  bottomView: {
    position: 'absolute',
    top: (Platform.OS === 'ios') ? height * 0.14 + 18 : height * 0.14 + 24,
    width: width,
    height: (Platform.OS === 'ios') ? height - (height * 0.14 + 18) : height - (height * 0.14 + 24),
    backgroundColor: 'lavender',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
