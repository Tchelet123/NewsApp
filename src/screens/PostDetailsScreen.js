import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {addPost, removePost} from '../redux/action/userAction';
import {useDispatch} from 'react-redux';
import Moment from 'react-moment';

const PostDetails = ({route}) => {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const post = route.params.post;
  const favorite = route.params.favorite === true ? true : false;
  const userInfo = useSelector(state => state['user']['userInfo']);
  Moment.globalFormat = 'D MMM YYYY';

  return (
    <ScrollView>
      <Card>
        <Card.Title style={{fontSize: 30}}>{post.title}</Card.Title>
        <Card.Divider />
        <Card.Image style={{padding: 0}} source={{uri: `${post.image}`}}></Card.Image>
        <Text style={styles.text} >
          By {post.author} from {post.source}
        </Text>
        <Text style={styles.text} >
          #{post.category}
        </Text>
        <Text style={styles.text}  >
          <Moment element={Text}>{post['published_at']}</Moment>
        </Text>
        <Text style={styles.textDscription} >
          {post.description}
        </Text>

        {userInfo && favorite !== true ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                dispatch(addPost(post));
              }}
              style={styles.button}>
              <Entypo name="add-to-list" size={20} color="#efefef" />
              <Text style={styles.buttonText}> ADD TO MY LIST</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {favorite === true ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                dispatch(removePost(post));
              }}
              style={styles.button}>
              <MaterialCommunityIcons
                name="delete-sweep"
                size={20}
                color="#efefef"
              />
              <Text style={styles.buttonText}> REMOVE POST</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'black',
    fontSize: 12,
    padding: 3,
    fontWeight: '600',
    marginBottom: 10,
    
  },
  textDscription:{
    color: 'black',
    fontSize: 20,
    padding: 3,
    fontWeight: '600',
    marginBottom: 10,
    marginTop:10,
    
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },

  buttonContainer: {
    alignItems: 'center',
    padding: 5,
  },
  buttonText: {
    color: '#efefef',
    fontSize: 10,
    padding: 3,
    fontWeight: '600',
  },
  button: {
    width: 150,
    // height: 150,
    backgroundColor: '#0470dc',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostDetails;
