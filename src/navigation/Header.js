import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = () => {
  const {userInfo} = useSelector(state => state['user']);

  const navigation = useNavigation();
  
 
  return (
    <View style={styles.rowHeader}>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        {userInfo ? (
          <TouchableOpacity
          style={styles.button}
            onPress={() => {
              navigation.navigate('PostsList',{favorite:true,title:"MY ARTICLE LIST"});
            }}>
            <Text style={styles.buttonText}>MYARTICLE</Text>
          </TouchableOpacity>
          
        ) : (
          <TouchableOpacity
          style={styles.button}
            onPress={() => {
              navigation.navigate('SIGNIN');
            }}>
            <Text style={styles.buttonText}>SINGNIN</Text>
          </TouchableOpacity>
        )}
        
      </View>
      <View>
      {userInfo ?  (
          <TouchableOpacity
          style={styles.button}
            onPress={() => {
              navigation.navigate('SIGNIN');
            }}>
            <Text style={styles.buttonText}>SINGNOUT</Text>
          </TouchableOpacity>
        ):null}
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    maxWidth: '100%',
  },
  
    buttonContainer: {
      alignItems: 'center',
      padding: 5,
    },
    buttonText: {
      color: '#efefef',
      fontSize: 15,
      padding: 3,
      fontWeight: '600',
    },
    button: {
      // width: 20,
      height: 25,
      backgroundColor: 'blue',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
  

});
