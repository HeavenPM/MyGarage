import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons'
import axios from 'axios';

const ChatScreen = ({ route, navigation }) => {
  const { userID } = route.params;

  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Close', style: 'cancel' }]);
  };

  async function postMessage() {
    if (currentMessage !== '') {
      try {
        const response = await axios.post('https://awakehook.backendless.app/api/data/messages', {
          messageText: currentMessage,
          userID: userID,
          isUserMessage: true,
        });
        setCurrentMessage('');
        getMessagesByUserID();
        return response.data;
      } catch (error) {
        showAlert('Error', 'Error adding message')
      }
    }  
  }

  async function getMessagesByUserID() {
    try {
      const response = await axios.get(`https://awakehook.backendless.app/api/data/messages?where=userID%3D${userID}`);
      setMessages(response.data)
      return response.data;
    } catch (error) {
      showAlert('Error', 'Error retrieving messages')
      throw error;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getMessagesByUserID();
      return () => {  
      };
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      getMessagesByUserID();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.messageContainer}>

          <View style={styles.inputMessage}>
            <Text style={styles.inputMessageText}>
              Hi, I'm your MyGarage consultant. How can I help you?
            </Text>
          </View>

          <View>
            {messages.sort((a, b) => a.created - b.created).map((message, index) => (
              <View key={index} style={message.isUserMessage ? styles.userMessage : styles.inputMessage}>
                <Text style={message.isUserMessage ? styles.userMessageText : styles.inputMessageText}>{message.messageText}</Text>
              </View>
            ))}
          </View>
          
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textField}
          placeholder="Your message..."
          onChangeText={setCurrentMessage}
          value={currentMessage}
        />
        <TouchableOpacity style={styles.radioButton} onPress={postMessage}>
          <Ionicons name={'send'} size={24} color="#fff" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    margin: 15,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  userMessage: {
    backgroundColor: '#ff907d',
    alignSelf: 'flex-end',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    padding: 10,
  },
  userMessageText: {
    fontSize: 16,
    color: '#fff',
  },
  inputMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    padding: 10,
  },
  inputMessageText: {
    fontSize: 16,
  },
  textField: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
    maxWidth: 380
  },
  radioButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    width: '100%'
  },
  date: {
    fontSize: 12,
    color: '#333',
    marginBottom: 15,
  },
})

export default ChatScreen;
