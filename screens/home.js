import React , { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions , StyleSheet, Text, View, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-community/picker';
import {elementsImage, charactersImages, errorImage} from '../api/images';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    backgroundColor: '#fff',
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: 'wrap',
  },
  scrollView: {
    padding: StatusBar.currentHeight,
  },  
  imagen: {
    width: Dimensions.get('window').width*0.3,
    height: Dimensions.get('window').height*0.2,
    margin: Dimensions.get('window').width*0.01,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  filterView: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  image: {
    width: Dimensions.get('window').width*0.08,
    height: Dimensions.get('window').height*0.04, 
  },
});

export default function Home({ navigation}) {

  const files = require('../api/details');
  
  const [icons, setIcons] = useState([]);
  const [star, setStar] = useState(0);
  const [element, setElement] = useState("All");

  const setStarFunction = (value) => {
    setStar(value);
  };
  const setElemFunction = (value) => {
    setElement(value);
  };

  // React function used to handle changes in characters depending on the filters used
  React.useEffect(() => {
    const applyFilter = () => {
      if(star === 0 && element === "All"){
        setIcons(getIconsFilter([], true));
      }else{
        let auxStar = filterStar(star);
        let auxElement = filterElement(element);
        let characters = auxStar.filter(x => auxElement.includes(x));
        setIcons(getIconsFilter(characters, false));
      }
    };
    applyFilter();
  }, [star, element]); // If these variables change, the function is executed

  const filterStar = (option) => {
    let aux = [];
    Object.keys(files).map( (data) => {
      if(option === 0){
        aux.push(data);
      }else if(parseInt(files[data].character.rarity) === option){
          aux.push(data);
      }
    });
    return aux;
  }

  const filterElement = (option) => {
    let aux = [];
    Object.keys(files).map( (data) => {
      if(option === "All"){
        aux.push(data);
      }else if(files[data].character.element.toLowerCase() === option){
          aux.push(data);
      }
    });
    return aux;
  }

  // Params -> Characters: list of characters to draw, option: true is to draw all characters, false is to draw only the characters in the list
  const getIconsFilter = (characters, option) => {
    let aux = [];
    Object.keys(files).map((data) => {
      if(characters.includes(data) || option){
        var icon;
        if(data === 'traveleranemo'){
          icon = elementsImage['anemo'];
        }else if(data === 'travelergeo'){
          icon = elementsImage['geo'];
        }else{
          // icon =  elementsImage[files[data].character.element.toLowerCase()];
          icon = ['pyro', 'hydro', 'electro', 'cryo', 'anemo', 'geo', 'dendro'].includes(files[data].character.element.toLowerCase()) ? elementsImage[files[data].character.element.toLowerCase()] : errorImage['elements'];
        }
        
        aux.push(
          <TouchableOpacity key = {data} onPress={() => { goToCharacter(data);}}>
            <ImageBackground
              // source={{
              //   uri: files[data].character.images.icon,
              // }}
              // source={require("../assets/characters/traveleranemo/icon.png")}
              source={charactersImages[`${data}-icon`]}
              style={styles.imagen}
            >
              <Image
                style={styles.image}
                source={icon}
              />
            </ImageBackground>
          </TouchableOpacity>
        );
      }
    });
    return aux;
  }

  const goToCharacter = (name) => {
    navigation.navigate('Details', { name });
  }

  // Widget of the filters characters app
  const filter = () =>{
    return (
      <View style={styles.filterView}>
        <Picker
          selectedValue={star}
          style={{ height: 35, width: 150}}
          onValueChange={(itemValue, itemIndex) => setStarFunction(itemValue)}
        >
          <Picker.Item label="All star" value={0} />
          <Picker.Item label="5 star" value={5} />
          <Picker.Item label="4 star" value={4} />
        </Picker>

        <Picker
          selectedValue={element}
          style={{ height: 35, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setElemFunction(itemValue)}
        >
          <Picker.Item label="All element" value={"All"} />
          <Picker.Item label="Pyro" value={"Pyro"} />
          <Picker.Item label="Hydro" value={"Hydro"} />
          <Picker.Item label="Electro" value={"Electro"} />
          <Picker.Item label="Cryo" value={"Cryo"} />
          <Picker.Item label="Anemo" value={"Anemo"} />
          <Picker.Item label="Geo" value={"Geo"} />
          <Picker.Item label="Dendro" value={"Dendro"} />
        </Picker>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {filter()}
      <ScrollView style={styles.scrollView}>
        <View style={styles.view}>
        {
          icons.length > 0 ? icons :
          <Text>There are no characters!</Text>
        }
        </View>
      </ScrollView>
      <StatusBar 
        hidden={true} 
        style="auto" 
      />
    </View>
  );
}

