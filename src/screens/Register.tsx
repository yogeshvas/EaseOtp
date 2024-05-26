import {
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const Register = ({navigation}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  console.log(email);
  console.log(password);
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken, user} = await GoogleSignin.signIn();
    console.log(idToken);
    console.log(user);
    Alert.alert('Successfull sign in');
    navigation.navigate('home');
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  const loginWithEmailAndPassword = () => {
    if (!email || !password) {
      Alert.alert('Please fill in both email and password fields');
      return; // Stop execution if either field is empty
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        AsyncStorage.setItem('email', email);
        Alert.alert('Logged In Successfully');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!', 'Please Login');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.scrollView}>
        <View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('onBoard')}>
              <Image
                style={{
                  height: 30,
                  width: 30,

                  margin: 20,
                  marginTop: 40,
                }}
                source={require('../assets/images/back.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{padding: 20, marginTop: 30}}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 20,
              }}>
              Welcome Buddy!
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
              }}>
              Hope you are doing fine.
            </Text>
          </View>
          <View style={styles.fieldsContainer}>
            <View style={{marginTop: 10}}>
              <TextInput
                style={styles.entry}
                placeholder="Name"
                placeholderTextColor="gray"
              />
            </View>
            <View style={{marginTop: 20}}>
              <TextInput
                value={email}
                onChangeText={t => setEmail(t)}
                style={styles.entry}
                placeholder="Email"
                placeholderTextColor="gray"
              />
            </View>
            <View style={{marginTop: 20}}>
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={t => setpassword(t)}
                  style={styles.passwordInput}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="gray"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.showPasswordButton}>
                  {showPassword ? (
                    //   <Text style={styles.showPasswordText}>Hide</Text>
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../assets/images/visible.png')}
                    />
                  ) : (
                    <Image
                      style={{height: 20, width: 20}}
                      source={require('../assets/images/hide.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{width: '100%', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'gray',
                    fontFamily: 'nRegular',
                    fontSize: 15,
                    marginTop: 50,
                  }}>
                  Or OneTap register with
                </Text>
                <TouchableOpacity onPress={onGoogleButtonPress}>
                  <View
                    style={{
                      marginTop: 20,
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 210,
                    }}>
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        borderRadius: 210,
                      }}
                      source={require('../assets/images/google-icon.png')}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', gap: 3}}>
            <Text style={{fontFamily: 'Poppins-Regular', color: 'gray'}}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={{fontFamily: 'Poppins-SemiBold', color: 'white'}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            title={'Register'}
            onPress={loginWithEmailAndPassword}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
  },
  scrollView: {
    flex: 1,
    justifyContent: 'space-between',
  },

  fieldsContainer: {
    paddingHorizontal: 30,
  },
  field: {},
  title: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 5,
  },
  entry: {
    fontFamily: 'Poppins-Regular',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'white', // Added color property here
    paddingHorizontal: 14,
    backgroundColor: '#1E1C24',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 14,
    backgroundColor: '#1E1C24',
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
  showPasswordButton: {
    paddingHorizontal: 10,
  },
  showPasswordText: {
    fontSize: 10,
  },
});
