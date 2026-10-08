import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { layout, type } from '../../theme';

export default function SectionTitle({ children, style }) {
  return <Text style={[styles.base, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    ...type.sectionTitle,
    marginTop: 7,
    marginLeft: layout.contentPaddingHorizontal,
  },
});