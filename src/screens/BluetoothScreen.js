import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BluetoothScreen = ({ isConnected, onConnect, onBack }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Bluetooth Geräte</Text>
    <TouchableOpacity style={styles.device} onPress={onConnect}>
      <Icon name="watch" size={24} color="#6B7280" />
      <Text style={styles.deviceText}>Fitnessband 123</Text>
    </TouchableOpacity>
    {isConnected && <Text style={styles.connected}>✅ Verbunden!</Text>}
    <TouchableOpacity style={styles.button} onPress={onBack}>
      <Icon name="arrow-left" size={20} color="#fff" />
      <Text style={styles.buttonText}>Zurück</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  device: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12 },
  deviceText: { marginLeft: 12, fontSize: 16 },
  connected: { textAlign: 'center', color: '#10B981', marginTop: 8, fontSize: 16 },
  button: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6B7280', padding: 12, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', marginLeft: 6, fontWeight: 'bold' },
});

export default BluetoothScreen;
