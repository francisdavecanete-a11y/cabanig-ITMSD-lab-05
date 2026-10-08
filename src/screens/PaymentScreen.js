import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import SectionTitle from '../components/SectionTitle';
import { PaymentMethod, ConfirmButton } from '../components/PaymentMethod';
import { paymentMethods } from '../data/inventory';
import { colors } from '../../theme';

export default function PaymentScreen() {
  const route = useRoute();
  const cartCount = route.params?.cartCount ?? 0;
  const [selected, setSelected] = useState(null);

  const onConfirm = () => {
    const method = paymentMethods.find((m) => m.id === selected);
    if (!method) {
      Alert.alert('Choose a payment method', 'Tap Cash, GCash or Card first.');
      return;
    }
    Alert.alert(
      'Payment confirmed',
      `${cartCount} item${cartCount === 1 ? '' : 's'} paid with ${method.label}.`
    );
    setSelected(null);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Payment" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <SectionTitle>Payment</SectionTitle>
        <View style={styles.methods}>
          {paymentMethods.map((method) => (
            <PaymentMethod
              key={method.id}
              label={method.label}
              icon={method.icon}
              selected={selected === method.id}
              onPress={() => setSelected(method.id)}
              disabled={false}
            />
          ))}
        </View>
        <ConfirmButton onPress={onConfirm} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    paddingBottom: 32,
  },
  methods: {
    marginTop: 39,
  },
});