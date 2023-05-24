import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const CarInfoScreen = ({ route, navigation }) => {
  const { userID, carBrand, carModel } = route.params;

  const [requests, setRequests] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Close', style: 'cancel' }]);
  };

  async function updateRequests() {
    try {
      const response = await axios.get(`https://mygarage-test.onrender.com/requests/${userID}`);
      const allRequests = response.data.data;
      const filteredRequests = allRequests.filter((request) => request.is_archived === true);
      setRequests(filteredRequests);
      return filteredRequests;
    } catch (error) {
      showAlert('Error', 'A requests updating error occurred ' + toString(error));
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      updateRequests();

      return () => {
        
      };
    }, [])
  );


  let visibleRequests = requests;
  if (!showAll && requests.length > 5) {
    visibleRequests = requests.slice(0, 5);
  }

  const handleShowAll = () => {
    setShowAll(!showAll);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
      <Text style={[styles.description, {fontSize: 18}]}> Your current car is 
        <Text style={styles.title}>  {carBrand} {carModel}</Text>
      </Text>
      <Text style={[styles.description, {marginTop: 20, fontSize: 16}]}>{showAll ? 'Your All Finished Events' : 'Your Last 5 Finished Events'}</Text>

      {requests.length == 0 && <Text style={[styles.description, {marginTop: 40}]}>Events list is empty!</Text>}

      {requests.length > 5 && (
            <TouchableOpacity>
              <Text onPress={handleShowAll} style={styles.button}>{showAll ? 'Hide' : 'Show All'}</Text>
            </TouchableOpacity>
      )}

      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {visibleRequests.map(({ id, title, service, comment, date }) => (
          <View key={id} style={styles.card}>
            <Text style={[styles.cardText, {fontWeight: 'bold'}]}>
              {title} - {service}
            </Text>
            <Text style={[styles.cardText, {fontSize: 11}]}>{date}</Text>
            <Text style={styles.cardText}>{comment}</Text>
          </View>
        ))}
      </ScrollView>

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
  button: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    margin: 15,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    margin: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d1d1d1',
    borderRadius: 10,
    padding: 15,
    width: 300,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  }
})

export default CarInfoScreen;
