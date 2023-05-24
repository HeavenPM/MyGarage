import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CardView = ({ title, service, comment, date, onRemove, onArchival }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpanded}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{service}</Text>
        {!expanded ? <Text style={styles.date}>{date}</Text> : 
        <View>
          <Text style={styles.description}>{comment}</Text>
          <Text style={styles.date}>{date}</Text>

          
          <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 50}}>
            <TouchableOpacity>
              <Text style={styles.subtitle} onPress={onArchival}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.subtitle} onPress={onRemove}>Delete</Text>
            </TouchableOpacity>
          </View>
          
        </View>
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    minWidth: '80%',
    maxWidth: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  date: {
    fontSize: 12,
    color: 'tomato',
    marginBottom: 8,
  },
});

export default CardView;
