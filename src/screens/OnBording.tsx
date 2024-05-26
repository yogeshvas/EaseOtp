import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';

const carouselData = [
  {
    id: '1',
    title: '',
    description:
      'Effortlessly retrieve OTPs without manually checking your phone.',
  },
  {
    id: '2',
    description:
      'Compatible across multiple platforms, including Windows and macOS.',
  },
  {
    id: '3',
    title: 'Slide 3',
    description: 'Instantly autofill OTPs with no delays.',
  },
];

const CarouselItem = ({item}: any) => {
  return (
    <View style={styles.carouselItem}>
      {/* <Text style={styles.carouselTitle}>{item.title}</Text> */}
      <Text style={styles.carouselDescription}>{item.description}</Text>
    </View>
  );
};

const OnBording = ({navigation}: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function checkIfEmailExists() {
      try {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          // Change 'Home' to your home screen route
        }
      } catch (error) {
        console.error('Error checking email:', error);
      }
    }

    checkIfEmailExists();
  }, [navigation]);

  const onViewRef = React.useRef(viewableItems => {
    if (viewableItems.viewableItems.length > 0) {
      setCurrentIndex(viewableItems.viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.banner}
          source={require('../assets/images/banner.png')}
        />
        <View style={styles.introContainer}>
          <Text style={styles.introText}>Introducing</Text>
          <Text style={styles.mainTitle}>Ease OTP</Text>
        </View>
        <View style={styles.carouselContainer}>
          <FlatList
            data={carouselData}
            renderItem={({item}) => <CarouselItem item={item} />}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
          <View style={styles.dotsContainer}>
            {carouselData.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === currentIndex ? '#fff' : '#808080',
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 30,
          marginBottom: 60,
        }}>
        {/* <Text style={styles.footerText}>OK</Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#333',
            width: '100%',
            // borderBottomLeftRadius: 20,
            // borderTopRightRadius: 20,
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('register')}
            style={{
              padding: 10,
              width: '50%',
              marginHorizontal: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontFamily: 'Poppins-Bold'}}>
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            style={{
              backgroundColor: '#fff',
              padding: 10,
              width: '50%',
              // borderTopRightRadius: 20,
              borderRadius: 10,
              marginHorizontal: 5,
              borderWidth: 1,
              borderColor: '#333',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#333',
                fontFamily: 'Poppins-Bold',
              }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnBording;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1720',
    justifyContent: 'space-between',
  },
  banner: {
    height: 300,
    width: '100%',
  },
  introContainer: {
    alignItems: 'center',
  },
  introText: {
    fontFamily: 'Poppins-Medium',
    color: '#808080',
    fontSize: 15,
    marginTop: 60,
  },
  mainTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 40,
  },
  carouselContainer: {
    marginTop: 10,
  },
  carouselItem: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  carouselDescription: {
    fontFamily: 'Poppins-Regular',
    color: '#808080',
    fontSize: 15,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 2,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});
