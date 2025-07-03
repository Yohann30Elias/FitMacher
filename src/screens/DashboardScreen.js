import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgress from '../components/CircularProgress';

const DashboardScreen = ({ steps, heartRate, isConnected, onNavigate }) => {
  const progress = Math.min((steps / 10000) * 100, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FitBuddy</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Icon name="walk" size={24} color="#3B82F6" />
          <Text style={styles.cardLabel}>Schritte heute</Text>
          <Text style={styles.cardValue}>{steps.toLocaleString()}</Text>
        </View>
        <View style={styles.card}>
          <Icon name="heart-pulse" size={24} color="#EF4444" />
          <Text style={styles.cardLabel}>Puls</Text>
          {isConnected ? (
            <Text style={styles.cardValue}>{heartRate} bpm</Text>
          ) : (
            <Text style={[styles.cardValue, { color: '#9CA3AF' }]}>nicht verbunden</Text>
          )}
        </View>
      </View>
      <CircularProgress percentage={progress} />

      <Text style={styles.goalText}>Tagesziel: 10.000 Schritte</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onNavigate('history')}
        >
          <Icon name="chart-bar" size={20} color="#fff" />
          <Text style={styles.buttonText}>Verlauf</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#6366F1' }]}
          onPress={() => onNavigate('bluetooth')}
        >
          <Icon name="bluetooth" size={20} color="#fff" />
          <Text style={styles.buttonText}>Bluetooth</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  cardContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', flex: 1, marginHorizontal: 4, elevation: 2 },
  cardLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  cardValue: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  goalText: { textAlign: 'center', marginTop: 16, fontSize: 16 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 24 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3B82F6', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', marginLeft: 6, fontWeight: 'bold' },
});

export default DashboardScreen;
