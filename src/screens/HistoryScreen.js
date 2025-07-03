import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HistoryScreen = ({ weeklyData, onBack, onReset }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Verlauf</Text>
    <FlatList
      data={weeklyData}
      keyExtractor={(item) => item.day}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.day}>{item.day}</Text>
          <Text style={styles.steps}>{item.steps} Schritte</Text>
        </View>
      )}
    />
    <TouchableOpacity style={styles.button} onPress={onReset}>
      <Icon name="refresh" size={20} color="#fff" />
      <Text style={styles.buttonText}>Tag speichern & zurücksetzen</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={onBack}>
      <Icon name="arrow-left" size={20} color="#fff" />
      <Text style={styles.buttonText}>Zurück</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8
  },
  day: { fontSize: 16, fontWeight: 'bold' },
  steps: { fontSize: 16 },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6B7280',
    padding: 12,
    borderRadius: 8,
    marginTop: 20
  },
  buttonText: { color: '#fff', marginLeft: 6, fontWeight: 'bold' },
});

export default HistoryScreen;
