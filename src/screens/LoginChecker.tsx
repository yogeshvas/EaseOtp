import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import auth from '@react-native-firebase/auth';

const LoginChecker = ({navigation}: any) => {
  const isInitialRender = useRef(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
    });
    isInitialRender.current = false;
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!isInitialRender.current) {
      if (!user) {
        navigation.navigate('onBoard');
      } else {
        navigation.navigate('home');
      }
    }
  }, [user]);

  return null;
};

export default LoginChecker;

const styles = StyleSheet.create({});
