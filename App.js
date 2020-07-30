import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen'); 

export default function App() {
  const [active, setActive] = useState("second");

  function returnView() {
    if (active == "first") {
      return(
        <View style={styles.bottomView}>
          <Text> First Screen </Text>
        </View>  
      )
    }
    else if (active == "second") {
      return(
        <View style={styles.bottomView}>
          <Text> Second Screen </Text>
        </View>  
      )
    }
    else if (active == "third") {
      return(
        <View style={styles.bottomView}>
          <Text> Third Screen </Text>
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
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 26, top: 5}}> UniSAFE </Text>
      </View>

      <View style={styles.tabs}>
        <View style={[
          styles.tab,
          (active === 'first' ? styles.activeTab : null)
          ]}>
          <Text onPress={() => setActive("first")}> Buddies </Text>
        </View>
        <View style={[
          styles.tab,
          (active === 'second' ? styles.activeTab : null)
          ]}>
          <Text onPress={() => setActive("second")}> Map </Text>
        </View>
        <View style={[
          styles.tab,
          (active === 'third' ? styles.activeTab : null)
          ]}>
          <Text onPress={() => setActive("third")}> Emergency </Text>
        </View>
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
    backgroundColor: '#001149',
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
  }
});
