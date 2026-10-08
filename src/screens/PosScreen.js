import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import SectionTitle from '../components/SectionTitle';
import ProductRow from '../components/ProductRow';
import { products } from '../data/inventory';
import { colors, layout, type } from '../../theme';

export default function PosScreen() {
  const [cart, setCart] = useState({});
  const navigation = useNavigation();

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  const addItem = (item) => {
    setCart((prev) => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="POS" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scroll}>
        <SectionTitle>Point of sale</SectionTitle>
        <View style={styles.list}>
          {products.map((item) => (
            <ProductRow key={item.id} item={item} onAdd={addItem} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.cartBar}>
        <Text style={styles.cartLabel}>{`Cart (${cartCount} items)`}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Proceed to payment"
          onPress={() => {
            if (cartCount === 0) {
              Alert.alert('Cart is empty', 'Add an item before checking out.');
              return;
            }
            navigation.navigate('Payment', { cartCount });
          }}
          style={({ pressed }) => [styles.checkout, pressed && styles.pressed]}
        >
          <Text style={styles.checkoutLabel}>Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 24,
  },
  list: {
    marginTop: 23,
    alignItems: 'flex-start',
  },
  cartBar: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.contentPaddingHorizontal,
    borderTopWidth: 1,
    borderTopColor: colors.black,
    backgroundColor: colors.white,
  },
  cartLabel: {
    ...type.cartLabel,
  },
  checkout: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutLabel: {
    ...type.itemName,
    color: colors.white,
  },
  pressed: {
    opacity: 0.7,
  },
});