import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') await Notifications.requestPermissionsAsync();
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.DEFAULT,
          sound: true,
        });
      }
    })();
  }, []);

  const schedule = async () => {
    await Notifications.scheduleNotificationAsync({
      content: { title: 'Тест уведомлений', body: 'Уведомление через 5 секунд', sound: true },
      trigger: { seconds: 5 }
    });
  };

  return (
    <SafeAreaView style={s.wrap}>
      <Text style={s.title}>My Timers — iOS EAS Build</Text>
      <TouchableOpacity onPress={schedule} style={s.btn}>
        <Text style={s.btnText}>Отправить уведомление через 5 сек</Text>
      </TouchableOpacity>
      <Text style={s.note}>Минимальный проект, готовый к сборке .ipa через EAS.</Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  btn: { backgroundColor: '#111827', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '700' },
  note: { marginTop: 16, opacity: 0.6, textAlign: 'center' }
});
