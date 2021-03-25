import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions , StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-community/picker';

// import character from "../db/Spanish/characters/ganyu.json";
// import talents from "../db/Spanish/talents/ganyu.json";
// import constellations from "../db/Spanish/constellations/ganyu.json";

//import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';
import {charactersImages, errorImage} from '../api/images';

export default function Details({ route}) {

  const files = require('../api/details');

  var character, talents, constellations, name = '';
  if(route.params !== undefined){
    name = route.params.name.toLowerCase().split(' ').join('');
  }
  if(route.params !== undefined && Object.keys(files).includes(name)){
    character = files[name].character;
    talents = files[name].talents;
    constellations = files[name].constellations;
  }else{
    name = 'error';
  }

  // const name = route.params !== undefined ? route.params.name : 'ganyu';
  

  // const character = require("../data/Spanish/characters/"+name+".json");
  // const talents = require("../data/Spanish/talents/"+name+".json");
  // const constellations = require("../data/Spanish/constellations/"+name+".json");

  const collapsedInitialState = false;

  const [collapsedProfile, setCollapsedProfile] = React.useState(collapsedInitialState);
  const [collapsedConstellations, setCollapsedConstellations] = React.useState(collapsedInitialState);
  const [collapsedTalents, setCollapsedTalents] = React.useState(collapsedInitialState);

  const toggleExpandedProfile = () => {
    setCollapsedProfile(!collapsedProfile);
  };
  const toggleExpandedConstellations = () => {
    setCollapsedConstellations(!collapsedConstellations);
  };
  const toggleExpandedTalents = () => {
    setCollapsedTalents(!collapsedTalents);
  };

  return (
    <View style={styles.container}>
      {
        name === '' ? (
          <Text> Cargando... </Text>
        ) : name === 'error' ? (
          <Text> Personaje no encontrado :c </Text>
        ) : (
          <ScrollView style={styles.scrollView}>

            <View style={styles.view}>
              <View style={styles.viewImage}>
                <Image
                  resizeMethod='auto'
                  source={charactersImages[`${name}-icon`]}
                  style={styles.image}
                >
                </Image>
              </View>
              <View style={styles.viewInfo}>
                <Text> Nombre: {character.name} </Text>
                <Text> Título: {character.title} </Text>
                <Text> Vision: {character.element} </Text>
                <Text> Rareza: {character.rarity} </Text>
                <Text> Arma: {character.weapontype} </Text>
                <Text> Cumpleaños: {character.birthday} </Text>
                <Text> Constelación: {character.constellation} </Text>
                <Text> Afiliación: {character.affiliation} </Text>
              </View>
            </View>

            <TouchableOpacity onPress={toggleExpandedProfile}>
              <View style={styles.collapsed}>
                <View style={styles.collapsedTitle}>
                  <Text style={styles.viewProfile}> Perfil </Text>
                </View>
                <View style={styles.collapsedIcon}>
                  <Text> { collapsedProfile ? 'Mostrar' : 'Ocultar'} </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsedProfile} align="center">
              <View style={styles.viewProfile}>
                <Text> {character.description} </Text>
              </View>
            </Collapsible>

            <TouchableOpacity onPress={toggleExpandedTalents}>
              <View style={styles.collapsed}>
                <View style={styles.collapsedTitle}>
                  <Text style={styles.viewProfile}> Talentos </Text>
                </View>
                <View style={styles.collapsedIcon}>
                  <Text> { collapsedTalents ? 'Mostrar' : 'Ocultar'} </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsedTalents} >
              {
                Object.keys(talents).slice(1).map((item) => {
                  return(
                    <View key={item} style={styles.viewTalent}>
                      <View style={styles.viewTalentTitle}>
                        <Image
                          resizeMethod='auto'
                          // source={{
                          //   uri: talents[item].image,
                          // }}
                          source={charactersImages[`${name}-${item}`]}
                          style={styles.imageTalent}
                        ></Image>
                        <Text style={styles.viewTalentText}> {talents[item].name} </Text>
                      </View>
                      <View style={styles.viewTalentBody}>
                        <Text > {talents[item].info} </Text>
                      </View>
                    </View>
                  )
                })
              }
            </Collapsible>

            <TouchableOpacity onPress={toggleExpandedConstellations}>
              <View style={styles.collapsed}>
                <View style={styles.collapsedTitle}>
                  <Text>Constelaciones</Text>
                </View>
                <View style={styles.collapsedIcon}>
                  <Text> { collapsedConstellations ? 'Mostrar' : 'Ocultar'} </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsedConstellations} align="center">
              {
                Object.keys(constellations).slice(1).map((item) => {
                  return (
                    <View key={item} style={styles.viewTalent}>
                      <View style={styles.viewTalentTitle}>
                        <Image
                          resizeMethod='auto'
                          source={charactersImages[`${name}-${item}`]}
                          style={styles.imageTalent}
                        ></Image>
                        <Text style={styles.viewTalentText}> {constellations[item].name} </Text>
                      </View>
                      <View style={styles.viewTalentBody}>
                        <Text > {constellations[item].effect} </Text>
                      </View>
                    </View>
                  )
                })
              }
            </Collapsible>

          </ScrollView>
        )
      }
      <StatusBar
        hidden={true}
        style="auto"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1966e3',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:  Dimensions.get('window').width*0.02,
    marginVertical:  Dimensions.get('window').height*0.01,
  },
  scrollView: {
    padding: StatusBar.currentHeight,
  },
  view: {
    flexDirection: "row",
    flexWrap: 'wrap',
    alignContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get('window').width*0.4,
    height: Dimensions.get('window').height*0.25,
  },
  viewImage:{
    // width: Dimensions.get('window').width*0.4,
  },
  viewInfo: {
    width: Dimensions.get('window').width*0.55,
  },
  viewProfile: {
    marginHorizontal: Dimensions.get('window').height*0.03,
    // marginVertical: Dimensions.get('window').height*0.01,
  },
  viewTalent: {
    marginHorizontal: Dimensions.get('window').height*0.01,
    // flexDirection: "row",
    // justifyContent: "flex-end",
    // alignItems: "center",
    // flexWrap: 'wrap',
  },
  viewTalentTitle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: 'wrap',
    marginHorizontal: Dimensions.get('window').height*0.03,
    marginVertical: Dimensions.get('window').height*0.01,
  },
  viewTalentText: {
    width: Dimensions.get('window').width*0.4,
  },
  viewTalentBody: {
    justifyContent: "flex-start",
    width: Dimensions.get('window').width*0.9,
  },
  imageTalent: {
    width: Dimensions.get('window').width*0.2,
    height: Dimensions.get('window').height*0.1,
  },
  collapsed:{
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: 'wrap',
    marginHorizontal: Dimensions.get('window').height*0.03,
    marginVertical: Dimensions.get('window').height*0.01,
  },
  collapsedTitle: {
    justifyContent: "center",
    flexWrap: 'wrap',
    alignItems: "center",
    width: Dimensions.get('window').width*0.6,
  },
  collapsedIcon: {
    justifyContent: "center",
    width: Dimensions.get('window').width*0.2,
  }
});