import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, type } from '../../theme';

export function StatCard({ value, label, accent }) {
  const gradient = gradients.statCard(accent);
  return (
    <LinearGradient colors={gradient.colors} start={gradient.start} end={gradient.end} style={styles.card}>
      <Text style={[type.statValue, { color: accent }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </LinearGradient>
  );
}

export function StatGrid({ items }) {
  return (
    <View style={styles.grid}>
      {items.map(({ id, value, label, accent }) => (
        <StatCard key={id} value={value} label={label} accent={accent} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    columnGap: 38,
    marginTop: 16,
    marginHorizontal: 27,
  },
  card: {
    width: 130,
    height: 60,
    borderRadius: 10,
    paddingTop: 2,
    paddingLeft: 39,
  },
  label: {
    ...type.statLabel,
    color: colors.black,
    marginTop: 8,
  },
});

export default StatCard;