import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HistoryScreen = ({ weeklyData, onBack }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Verlauf</Text>
    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
      <VictoryBar
        data={weeklyData}
        x="day"
        y="steps"
        style={{ data: { fill: '#3B82F6' } }}
      />
    </VictoryChart>
    <Text style={styles.pulseText}>Durchschnittspuls: 75 bpm</Text>
    <TouchableOpacity style={styles.button} onPress={onBack}>
      <Icon name="arrow-left" size={20} color="#fff" />
      <Text style={styles.buttonText}>Zurück</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  pulseText: { textAlign: 'center', fontSize: 16, marginTop: 12 },
  button: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#6B7280', padding: 12, borderRadius: 8, marginTop: 20 },
  buttonText: { color: '#fff', marginLeft: 6, fontWeight: 'bold' },
});

export default HistoryScreen;
