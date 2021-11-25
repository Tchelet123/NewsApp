import React, {useState, useEffect} from 'react';
import {StyleSheet,Text,View,Image,FlatList,RefreshControl,TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {getPosts} from '../redux/action/postsAction';
import {addPost,removePost} from '../redux/action/userAction';

import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title } from 'react-native-paper';

const defaultPic="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3_uMA1-uIqpFx11PFQsqk2Om0Tl0Tkcx1og&usqp=CAU"
 const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

const PostsList = ({route}) => {
  const title=route.params.title;
  console.log(title);
  const state=useSelector(state=>state);
  const dispatch = useDispatch();
  const {category} = route.params;
  const favorite = (route.params.favorite===true)?(true):(false);
  const userFavoritePosts=state['user']['userFavoritePosts'];
  const userInfo=state['user']['userInfo'];

  const postsList= state['posts']['postsList'];
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // console.log('refreshing');
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const navigation = useNavigation();
 const navigateWithProps=(post)=> {
    // console.log('PostDetails' ,post);
    navigation.navigate("PostDetails", {
      post:post,
      favorite:favorite,
    });
  }
  const getNewPosts=(offset)=>{
    dispatch(getPosts(category,offset));
    
  }
  
  
  useEffect(() => {
    if(favorite!==true)
    {
    getNewPosts(0);
    }
  }, [dispatch]);
  

  // function that shows each post
  function Item({post}) {
    const postHeader = post?.title;
    post.image=(post.image===null?(defaultPic):(post.image));
    const postImage = post.image;
    return (
      <View styles={styles.postBox}>
        <TouchableWithoutFeedback onPress={() => navigateWithProps(post)}>
          <View style={styles.rowPost}>
            <Image source={{uri: postImage}} style={styles.postPic} />
            <View>
              <Text numberOfLines={5} style={styles.postContentText}>{postHeader}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {(userInfo&&favorite!==true)?(
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
        ):null}
        {(favorite===true)?(
          <View>
            <TouchableOpacity
              onPress={() => {
                dispatch(removePost(post));
              }}
              style={styles.button}>
              <MaterialCommunityIcons name="delete-sweep" size={20} color="#efefef" />
              <Text style={styles.buttonText}>  REMOVE POST</Text>
            </TouchableOpacity>
          </View>
        ):null}
        <View style={styles.underLine}></View>
      </View>
    );
  }
  return (
    <View>
      <Title>{title}</Title>
        <FlatList
          data={(favorite!==true)?(postsList):(userFavoritePosts)}
          contentContainerStyle={{
            margin: 10,
            paddingBottom: 70,
          }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          renderItem={({item}) => (item ? <Item post={item} /> : null)}
          onEndReached={(favorite!==true)?(()=>{getNewPosts(postsList.length)}):(null)}
          ListFooterComponent={ <Text>The End</Text> }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={()=>{onRefresh}} />
          }
        />

      
    </View>
  );
};

export default PostsList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 10,
  },
  postBox: {
    marging: 2,
    backgroundColor: 'rgb(255, 255, 255)',
    paddingHorizontal: 10,
  },
  postPic: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },

  rowPost: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    maxWidth: '100%',
  },
  postContentText: {
    textAlign: 'left',
    color: 'black',
    fontSize: 20,
    padding: 5,
  },
  underLine: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    width: '100%',
    marginVertical: 10,
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
