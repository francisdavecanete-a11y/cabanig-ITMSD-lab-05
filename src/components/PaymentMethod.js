import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors, type } from '../../theme';

export function PaymentMethod({ label, icon, onPress, disabled, selected }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, selected: !!selected }}
      accessibilityLabel={`Pay with ${label}`}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.method,
        selected && styles.methodSelected,
        pressed && styles.pressed,
      ]}
    >
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

export function ConfirmButton({ label = 'Confirm Payment', onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.confirm, pressed && styles.pressed]}
    >
      <Text style={styles.confirmLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  method: {
    width: 320,
    height: 70,
    borderRadius: 20,
    backgroundColor: colors.steel,
    marginLeft: 25,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 46,
  },
  methodSelected: {
    borderWidth: 2,
    borderColor: colors.green,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    position: 'absolute',
    left: -7,
    width: 58,
    height: 22,
  },
  label: {
    ...type.methodLabel,
  },
  confirm: {
    width: 301,
    height: 52,
    borderRadius: 4,
    backgroundColor: colors.green,
    alignSelf: 'center',
    marginTop: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmLabel: {
    ...type.buttonLabel,
  },
});

export default PaymentMethod;