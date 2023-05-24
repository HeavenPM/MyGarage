import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import CardView from '../components/CardView';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = ({ route, navigation }) => {
  const { userID } = route.params;

  const [requests, setRequests] = useState([]);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Close', style: 'cancel' }]);
  };

  async function updateRequests() {
    try {
      const response = await axios.get(`https://mygarage-test.onrender.com/requests/${userID}`);
      const allRequests = response.data.data;
      const filteredRequests = allRequests.filter((request) => request.is_archived === false);
      setRequests(filteredRequests);
      return filteredRequests;
    } catch (error) {
      showAlert('Error', 'A requests updating error occurred ' + toString(error));
    }
  }

  async function removeRequest (id) {
    try {
      const response = await axios.delete(`https://mygarage-test.onrender.com/requests/${id}`);
      const updatedRequests = requests.filter((request) => request.id !== id);
      setRequests(updatedRequests);
    } catch (error) {
      showAlert('Error', 'A request removing error occurred ' + toString(error));
    }
  };

  async function makeArchival(id) {
    const request = requests.find((req) => req.id === id);
  
    try {
      const response = await axios.put(`https://mygarage-test.onrender.com/requests/${id}`, {
        ...request,
        is_archived: true
      });
      updateRequests();
    } catch (error) {
      showAlert('Error', 'A request archived error occurred ' + error.toString());
    }
  }
  

  useFocusEffect(
    React.useCallback(() => {
      updateRequests();

      return () => {
        
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>Scheduled vehicle maintenance events</Text>
      {requests.length == 0 && <Text style={styles.description}>Events list is empty!</Text>}
      
      {typeof(requests) !== undefined && <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {requests.map(({ id, title, service, comment, date }) => 
          <CardView
            key={id}
            title={title}
            service={service}
            comment={comment}
            date={date}
            onRemove={() => removeRequest(id)}
            onArchival={() => makeArchival(id)}
          />
        )}
      
      </ScrollView>}
    </View>
  );  
  
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 50,
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
})

export default HomeScreen;
