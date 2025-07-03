import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Accelerometer } from 'expo-sensors';

import DashboardScreen from './src/screens/DashboardScreen';
import HistoryScreen from './src/screens/HistoryScreen';

export default function App() {
  const [screen, setScreen] = useState('dashboard');
  const [steps, setSteps] = useState(0);
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mo', steps: 0 },
    { day: 'Di', steps: 0 },
    { day: 'Mi', steps: 0 },
    { day: 'Do', steps: 0 },
    { day: 'Fr', steps: 0 },
    { day: 'Sa', steps: 0 },
    { day: 'So', steps: 0 }
  ]);
  const [quote, setQuote] = useState("...");

  // Schritte & Datum laden
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
            setSteps(parseInt(storedSteps));
          } else {
            const date = new Date(storedDate);
            const dayIndex = date.getDay();
            const newWeeklyData = [...weeklyData];
            const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
            newWeeklyData[mappedIndex] = {
              day: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][mappedIndex],
              steps: parseInt(storedSteps)
            };
            await AsyncStorage.setItem('weeklyData', JSON.stringify(newWeeklyData));
            setWeeklyData(newWeeklyData);

            setSteps(0);
            await AsyncStorage.setItem('stepsDate', today);
          }
        } else {
          setSteps(0);
          await AsyncStorage.setItem('stepsDate', today);
        }
      } catch (e) {
        console.log('Fehler beim Laden:', e);
      }
    };

    loadSteps();
  }, []);

  // Schritte zählen
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

  // Zitate holen
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json();
        setQuote(`${data[0].q} — ${data[0].a}`);
      } catch (e) {
        console.log('Fehler beim Laden des Zitats:', e);
      }
    };

    fetchQuote(); // erstes Laden
    const interval = setInterval(fetchQuote, 30 * 1000); // alle 30 Sekunden
    return () => clearInterval(interval);
  }, []);

  if (screen === 'dashboard') {
    return (
      <DashboardScreen
        steps={steps}
        quote={quote}
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

  return <View />;
}
