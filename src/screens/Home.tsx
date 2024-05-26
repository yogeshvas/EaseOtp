import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SmsRetriever from 'react-native-sms-retriever';

const Home = () => {
  useEffect(() => {
    const startSmsListener = async () => {
      try {
        const registered = await SmsRetriever.startSmsRetriever();
        if (registered) {
          SmsRetriever.addSmsListener(event => {
            const otp = event.message;
            if (isOTP(otp)) {
              addSMSToFirestore(otp);
            }
          });
        }
      } catch (error) {
        console.error('Error starting SMS listener: ', error);
      }
    };

    startSmsListener();

    return () => {
      SmsRetriever.removeSmsListener();
    };
  }, []);

  const isOTP = message => {
    const otpRegex = /\b\d{6}\b/;
    return otpRegex.test(message);
  };

  const addSMSToFirestore = async sms => {
    try {
      await firestore().collection('otpMessages').add({
        message: sms,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      console.log('SMS added to Firestore:', sms);
    } catch (error) {
      console.error('Error adding SMS to Firestore:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('email');
      console.log('User signed out!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View>
      <Text>Home</Text>
      <CustomButton title="Logout" onPress={signOut} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
