import React from 'react';
import {StyleSheet,Text,useColorScheme,View,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import { Title } from 'react-native-paper';

const categoriesArr = [
  {id: 1, type: 'general', icon: 'newspaper'},
  {id: 2, type: 'business', icon: 'business-time'},
  {id: 3, type: 'entertainment', icon: 'theater-masks'},
  {id: 4, type: 'health', icon: 'heartbeat'},
  {id: 5, type: 'science', icon: 'brain'},
  {id: 6, type: 'sports', icon: 'running'},
  {id: 7, type: 'technology', icon: 'gamepad'},
];
const Home = () => {
  const navigation = useNavigation();
  
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
      <Title> CHOOSE CATEGRY OF ARTICLE</Title>
      {categoriesArr.map((item, index) => {
        return (
          <View key={index} style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PostsList',{
                  category:item.type,
                  title:`Article of ${item.type} `});
              }}
              style={styles.button}>
              <Icon name={item.icon} size={100} color="#efefef" />
              <Text style={styles.buttonText}>{item.type}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 5,
  },
  buttonText: {
    color: '#efefef',
    fontSize: 20,
    padding: 3,
    fontWeight: '600',
  },
  button: {
    width: 140,
    height: 140,
    backgroundColor: '#0470dc',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
