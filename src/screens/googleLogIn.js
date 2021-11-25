import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {signUserIn, signUserOut} from '../redux/action/userAction';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state['user']['userInfo']);
  const [user, setUser] = useState(null);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  const signIn = async () => {
    console.log('press');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      dispatch(signUserIn(userInfo));

      setUser({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(' user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(' operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(' play services not available or outdated');
      } else {
        console.log(' some other error happened');
      }
    }
  };
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setIsSigninInProgress(!isSignedIn);
  };
  const onStart = () => {
    GoogleSignin.configure();
  };

  const revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      setUser(null);
      dispatch(signUserOut());

      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    onStart();
    // isSignedIn();
  }, []);
  return (
    <View style={{flex: 1, margin: 50}}>
      <View style={styles.main}>
        
        {!userInfo ? (
          <GoogleSigninButton
            onPress={() => signIn()}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            style={{width: 192, height: 48}}
            disabled={isSigninInProgress}
          />
        ) : (
          <View>
          <TouchableOpacity
            onPress={() => {
              revokeAccess();
            }}>
            <Text>Signout</Text>
          </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default GoogleSignIn;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
