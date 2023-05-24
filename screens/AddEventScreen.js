import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

const AddEventScreen = ({ route, navigation, }) => {

  const { userID } = route.params;

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [selectedValue, setSelectedValue] = useState('Oil Change');
  const [date, setDate] = useState("2023-05-15");

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Close', style: 'cancel' }]);
  };

  async function createRequest() {
    try {
      const response = await axios.post(`https://mygarage-test.onrender.com/requests/?user_id=${userID}`, {
        user_id: userID,
        title: title,
        service: selectedValue,
        comment: comment,
        date: date,
        is_archived: false
      });
      setTitle('');
      setComment('');
      setSelectedValue('Oil Change');
      setDate("2023-05-15");
      showAlert('Success', 'Event has created successfully')
      return response.data;
    } catch (error) {
      showAlert('Error', 'A request creating error occurred' + error);
    }
  }

  const handleTitleChange = (newText) => {
    setTitle(newText);
  }

  const handleCommentChange = (newText) => {
    setComment(newText);
  }

  const handleDateChange = (newDate) => {
    setDate(newDate);
  }

  return (
    <View>
      <Text style={styles.title}>New Event</Text>
      <Text style={[styles.subtitle, {textAlign: 'center', margin:0}]}>Create a reminder for the repair</Text>

      <ScrollView>
        <Text style={styles.subtitle}>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event title..."
          onChangeText={handleTitleChange}
          value={title}
        />

        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Maintenance" value="Maintenance" />
          <Picker.Item label="Repair" value="Repair" />
          <Picker.Item label="Diagnostics" value="Diagnostics" />
          <Picker.Item label="Oil Change" value="Oil Change" />
          <Picker.Item label="Tire fitting" value="Tire fitting" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
        <Text style={styles.subtitle}>Service: {selectedValue}</Text>

        <Text style={styles.subtitle}>Optional comment:</Text>
        <TextInput
          style={[styles.input, {height: 100}]}
          multiline={true}
          numberOfLines={4}
          placeholder="Enter comment..."
          onChangeText={handleCommentChange}
          value={comment}
        />

        <DatePicker
          style={{width: 300, marginLeft: 40, marginRight: 40, marginTop: 10}}
          date={date}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2023-05-10"
          maxDate="2024-05-10"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
          }}
          onDateChange={handleDateChange}
        />

        <TouchableOpacity onPress={createRequest}>
          <Text style={styles.button}>
            Submit
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 20,
  },
  button: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    margin: 15,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AddEventScreen;
