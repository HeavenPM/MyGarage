import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import axios from 'axios';

import HomeScreen from './screens/HomeScreen';
import AddEventScreen from './screens/AddEventScreen';
import CarInfoScreen from './screens/CarInfoScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';

const Tab = createBottomTabNavigator();


export default function App() {

  const [isAuth, setAuth] = useState(false);

  const [isOldUser, setIsOldUser] = useState(true);
  const [welcomeText, setWelcomeText] = useState('First time here?');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [userID, setUserID] = useState(0);

  async function registerUser() {
    try {
      const response = await axios.post('https://mygarage-test.onrender.com/auth/register', {
        email: regEmail,
        password: regPassword,
        is_active: true,
        is_superuser: false,
        is_verified: false,
        user_name: name,
        user_surname: surname,
        car_model: carModel,
        car_brand: carBrand,
        phone_number: phone
      });
      setUserID(response.data.id)
      setCarBrand(response.data.car_brand)
      setCarModel(response.data.car_model)
      setEmail(response.data.email)
      setPhone(response.data.phone_number)
      setName(response.data.user_name)
      setSurname(response.data.user_surname)
      setAuth(true);
      return response.data;
    } catch (error) {
      showAlert('Error', 'A registration error occurred');
    }
  }

  async function loginUser() {
    try {
      const response = await axios.post('https://mygarage-test.onrender.com/auth/jwt/login', {
        username: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      setUserID(response.data.id)
      setCarBrand(response.data.car_brand)
      setCarModel(response.data.car_model)
      setEmail(response.data.email)
      setPhone(response.data.phone_number)
      setName(response.data.user_name)
      setSurname(response.data.user_surname)
      setAuth(true);
      return response.data;
    } catch (error) {
      showAlert('Error', 'A login error occurred');
    }
  }

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Close', style: 'cancel' }]);
  };

  const changeAuthForm = () => {
    if (isOldUser == true) {
      setIsOldUser(false)
      setWelcomeText('Already have an account?')
    } else {
      setIsOldUser(true)
      setWelcomeText('First time here?')
    }
  }

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail)
  }

  const handlePasswordChange = (newPass) => {
    setPassword(newPass)
  }

  return (
    (!isAuth ?
      
      <View style={styles.container}>
        <Image 
        source={require('./assets/icon.png')}
        style={{ width: 300, height: 200 }}
        resizeMode='contain'
        />

        <View style={{flexDirection:'row'}}>
          <Text>Welcome! </Text>
          <TouchableOpacity onPress={changeAuthForm}>
            <Text style={{color: '#666'}}>{welcomeText}</Text>
          </TouchableOpacity>
        </View>

        <View>
          {isOldUser ? 
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email..."
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
              />
              <TextInput
                style={styles.input}
                placeholder="Password..."
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={handlePasswordChange}
                value={password}
              />
              <TouchableOpacity onPress={loginUser}>
                <Text style={{color: '#666', textAlign: 'center', margin: 30}}>Submit</Text>
              </TouchableOpacity>

            </View>
            : 
            
              <View>
                <TextInput
                style={styles.input}
                placeholder="Your name..."
                onChangeText={setName}
                value={name}
              />
              <TextInput
                style={styles.input}
                placeholder="Your surname..."
                onChangeText={setSurname}
                secureTextEntry={false}
                value={surname}
              />
              <TextInput
                style={styles.input}
                placeholder="Model of your car..."
                onChangeText={setCarModel}
                value={carModel}
              />
              <TextInput
                style={styles.input}
                placeholder="Brand of your car..."
                onChangeText={setCarBrand}
                value={carBrand}
              />
              <TextInput
                style={styles.input}
                placeholder="Your email..."
                onChangeText={setRegEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                value={regEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Your phone number..."
                onChangeText={setPhone}
                autoCapitalize="none"
                keyboardType="phone-pad"
                value={phone}
              />
              <TextInput
                style={styles.input}
                placeholder="Create a password..."
                onChangeText={setRegPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                value={regPassword}
              />
              <TouchableOpacity onPress={registerUser}>
                <Text style={{color: '#666', textAlign: 'center', margin: 30}}>Submit</Text>
              </TouchableOpacity>

              </View>
          }
        </View>

      </View>      

      :

      (<NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Event') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              } else if (route.name === 'Car') {
                iconName = focused ? 'car-sport' : 'car-sport-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Chat') {
                iconName = focused ? 'chatbox' : 'chatbox-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerStyle: { backgroundColor: 'tomato', },
            headerTintColor: '#fff', 
                      
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} initialParams={{ userID: userID }}/>
          <Tab.Screen name="Event" component={AddEventScreen} initialParams={{ userID: userID }}/>
          <Tab.Screen name="Car" component={CarInfoScreen} initialParams={{ userID: userID, carBrand: carBrand, carModel: carModel }}/>
          <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ userID: userID, email: email, phone: phone, name: name, surname: surname }}/>
          <Tab.Screen name="Chat" component={ChatScreen} initialParams={{ userID: userID }}/>
        </Tab.Navigator>
      </NavigationContainer>)
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    margin: 20,
    width: 300,
  },
  
})