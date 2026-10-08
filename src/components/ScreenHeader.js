import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, layout, type } from '../../theme';

export default function ScreenHeader({ title, variant = 'default' }) {
  return (
    <View style={styles.wrap}>
      <LinearGradient
        {...(variant === 'reports' ? gradients.headerReports : gradients.header)}
        style={styles.gradient}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: layout.headerHeight,
    width: '100%',
    justifyContent: 'flex-start',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    ...type.screenTitle,
    marginTop: 24,
    marginLeft: layout.headerPaddingHorizontal,
  },
});

export { colors };