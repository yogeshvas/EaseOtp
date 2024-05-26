import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const CustomButton = ({onPress, title}: any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 13,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    borderRadius: 14,
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#1A1720',
    fontSize: 14,
  },
});

export default CustomButton;
