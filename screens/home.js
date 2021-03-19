import React , { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions , StyleSheet, Text, View, Image, ScrollView, ImageBackground } from 'react-native';
import {Picker} from '@react-native-community/picker';
import data from "../data/characters-info.json";
import vision from "../data/vision.json";

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
    backgroundColor: '#7d0ee6',
  },
  image: {
    width: Dimensions.get('window').width*0.08,
    height: Dimensions.get('window').height*0.04, 
  },
});

export default function Home() {
  const getIcons = data.map( (data) => {
    return (
      <ImageBackground 
        key = {data.name}
        source={{
          uri: data.img,
        }}
        style={styles.imagen}
      >
        <Image
          style={styles.image}
          source={{
            uri: "https://ih1.redbubble.net/image.1849347856.1942/st,small,507x507-pad,600x600,f8f8f8.jpg",
          }}
        />
      </ImageBackground>
    )
  });

  const [icons, setIcons] = useState(getIcons);


  const [star, setStar] = useState(0);
  const [element, setElement] = useState("All");

  const setStarFunction = (value) => {
    setStar(value);
  };

  const setElemFunction = (value) => {
    setElement(value);
  };


  React.useEffect(() => {
    const applyFilter = () => {
      if(star == 0 && element == 0){
        setIcons(getIcons);
      }else{
        let auxStar = filterStar(star);
        let auxElement = filterElement(element);
        let characters = auxStar.filter(x => auxElement.includes(x));
        setIcons(getIconsFilter(characters));
      }
    };
    const filterStar = (option) => {
      let aux = [];
      data.map( (data) => {
        if(option === 0){
          aux.push(data.name);
        }else if(data.star === option){
            aux.push(data.name);
        }
      });
      return aux;
    }
    const filterElement = (option) => {
      let aux = [];
      data.map( (data) => {
        if(option === "All"){
          aux.push(data.name);
        }else if(data.vision === option){
            aux.push(data.name);
        }
      });
      return aux;
    }
    const getIconsFilter = (characters) => {
      let aux = [];
      data.map( (data) => {
        if(characters.includes(data.name)){
          var icon =  data.vision === "Pyro" ? require("../data/vision/Pyro.png") :
                      data.vision === "Hydro" ? require("../data/vision/Hydro.png") :
                      data.vision === "Electro" ? require("../data/vision/Electro.png") :
                      data.vision === "Cryo" ? require("../data/vision/Cryo.png") :
                      data.vision === "Anemo" ? require("../data/vision/Anemo.png") :
                      data.vision === "Geo" ? require("../data/vision/Geo.png") :
                      data.vision === "Dendro" ? require("../data/vision/Dendro.png") :
                      require("../data/vision/Error.png");
          aux.push(
            <ImageBackground 
              key = {data.name}
              source={{
                uri: data.img,
              }}
              style={styles.imagen}
            >
              <Image
                style={styles.image}
                source={icon}
              />
            </ImageBackground>
          );
        }
      });
      return aux;
    }
    applyFilter();
  }, [star, element]);

  const filter = () =>{
    return (
      <View style={styles.filterView}>
        <Picker
          selectedValue={star}
          style={{ height: 35, width: 150}}
          onValueChange={(itemValue, itemIndex) => setStarFunction(itemValue)}
        >
          <Picker.Item label="All start" value={0} />
          <Picker.Item label="5 start" value={5} />
          <Picker.Item label="4 start" value={4} />
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
          <Text>No hay elementos!</Text>
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

