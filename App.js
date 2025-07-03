import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Accelerometer } from 'expo-sensors';

import DashboardScreen from './src/screens/DashboardScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import BluetoothScreen from './src/screens/BluetoothScreen';

export default function App() {
  const [screen, setScreen] = useState('dashboard');
  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState(78);
  const [isConnected, setIsConnected] = useState(false);
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mo', steps: 0 },
    { day: 'Di', steps: 0 },
    { day: 'Mi', steps: 0 },
    { day: 'Do', steps: 0 },
    { day: 'Fr', steps: 0 },
    { day: 'Sa', steps: 0 },
    { day: 'So', steps: 0 }
  ]);

  useEffect(() => {
    const loadSteps = async () => {
      try {
        const storedSteps = await AsyncStorage.getItem('steps');
        const storedDate = await AsyncStorage.getItem('stepsDate');
        const storedHistory = await AsyncStorage.getItem('weeklyData');

        const today = new Date().toDateString();

        if (storedHistory) {
          setWeeklyData(JSON.parse(storedHistory));
        }

        if (storedSteps && storedDate) {
          if (storedDate === today) {
            // Schritte von heute übernehmen
            setSteps(parseInt(storedSteps));
          } else {
            // Schritte vom alten Tag in Verlauf schreiben
            const date = new Date(storedDate);
            const dayIndex = date.getDay(); // 0=Sonntag

            const newWeeklyData = [...weeklyData];
            const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
            newWeeklyData[mappedIndex] = {
              day: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][mappedIndex],
              steps: parseInt(storedSteps)
            };

            await AsyncStorage.setItem('weeklyData', JSON.stringify(newWeeklyData));
            setWeeklyData(newWeeklyData);

            // Schritte zurücksetzen
            setSteps(0);
            await AsyncStorage.setItem('stepsDate', today);
            await AsyncStorage.setItem('steps', '0');
          }
        } else {
          // Kein gespeicherter Stand
          setSteps(0);
          await AsyncStorage.setItem('stepsDate', today);
        }
      } catch (e) {
        console.log('Fehler beim Laden der Daten:', e);
      }
    };

    loadSteps();
  }, []);

  useEffect(() => {
    let stepCount = steps;
    let lastStepTime = Date.now();

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();

      if (magnitude > 1.2 && now - lastStepTime > 300) {
        stepCount++;
        setSteps(stepCount);
        lastStepTime = now;

        const today = new Date().toDateString();
        AsyncStorage.setItem('steps', stepCount.toString());
        AsyncStorage.setItem('stepsDate', today);
      }
    });

    Accelerometer.setUpdateInterval(100);

    return () => subscription.remove();
  }, [steps]);

  if (screen === 'dashboard') {
    return (
      <DashboardScreen
        steps={steps}
        heartRate={heartRate}
        isConnected={isConnected}
        onNavigate={setScreen}
      />
    );
  }

  if (screen === 'history') {
    return (
      <HistoryScreen
        weeklyData={weeklyData}
        onBack={() => setScreen('dashboard')}
      />
    );
  }

  if (screen === 'bluetooth') {
    return (
      <BluetoothScreen
        isConnected={isConnected}
        onConnect={() => setIsConnected(true)}
        onBack={() => setScreen('dashboard')}
      />
    );
  }

  return <View />;
}
