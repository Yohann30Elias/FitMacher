import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import DashboardScreen from './src/screens/DashboardScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import BluetoothScreen from './src/screens/BluetoothScreen';

export default function App() {
  const [screen, setScreen] = useState('dashboard');
  const [steps, setSteps] = useState(5430);
  const [heartRate, setHeartRate] = useState(78);
  const [isConnected, setIsConnected] = useState(false);

  const weeklyData = [
    { day: 'Mo', steps: 8500 },
    { day: 'Di', steps: 7200 },
    { day: 'Mi', steps: 9800 },
    { day: 'Do', steps: 6400 },
    { day: 'Fr', steps: 8900 },
    { day: 'Sa', steps: 5430 },
    { day: 'So', steps: 0 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(s => s + Math.floor(Math.random() * 5));
      setHeartRate(h => h + Math.floor(Math.random() * 6) - 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (screen === 'dashboard') {
    return (
      <DashboardScreen
        steps={steps}
        heartRate={heartRate}
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
