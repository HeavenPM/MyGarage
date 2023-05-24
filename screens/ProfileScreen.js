import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ route, navigation }) => {
  const { userID: userID, email: email, phone: phone, name: name, surname: surname } = route.params;

  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Close', style: 'cancel' }]);
  };

  function hideText(text) {
    if (text.length <= 2) {
      return text;
    }
    const firstChar = text.slice(0, 2);
    const lastChar = text.slice(text.length - 3, text.length);
    const hiddenText = '*'.repeat(text.length - 4);
    
    return firstChar + hiddenText + lastChar;
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 20 }}>
      <Text style={[styles.title, {marginTop: 20}]}>Account Info</Text>
      <View style={styles.card}>
        <Text style={styles.description}>Name: <Text style={styles.cardText}>{name}</Text></Text>
        <Text style={styles.description}>Surname: <Text style={styles.cardText}>{surname}</Text></Text>
        <Text style={styles.description}>Email: <Text style={styles.cardText}>{hideText(email)}</Text></Text>
        <Text style={styles.description}>Phone number: <Text style={styles.cardText}>+{hideText(phone)}</Text></Text>

        <Text style={[styles.description, {marginTop: 100}]}>Changing the password</Text>
        <TextInput
                style={styles.input}
                placeholder="New Password..."
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={setNewPassword}
                value={newPassword}
        />
        <TextInput
                style={styles.input}
                placeholder="Old Password..."
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={setOldPassword}
                value={oldPassword}
        />

        <TouchableOpacity style={{}}>
          <Text style={styles.button} onPress={() => showAlert('Changing the password', 'Password change request completed successfully')}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  button: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    margin: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    margin: 15,
    marginBottom: 20,
    backgroundColor: '#d1d1d1',
    borderRadius: 10,
    padding: 20,
    width: 300,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
    margin: 5,
    width: '90%',
  },
})

export default ProfileScreen;