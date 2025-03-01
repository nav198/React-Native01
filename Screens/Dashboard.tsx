// Dashboard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Dashboard = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // ✅ Redirect to login
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Dashboard</Text>
      <Text style={styles.subText}>You have successfully logged in!</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
