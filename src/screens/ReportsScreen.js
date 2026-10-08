import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import { colors, fonts, type } from '../../theme';

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Reports " variant="reports" />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sales Reports</Text>
        <Text style={styles.amount}>0.00</Text>
        <Text style={styles.count}>0 transaction</Text>
        <Text style={styles.empty}>No sales yet.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    width: 327,
    height: 240,
    borderRadius: 20,
    backgroundColor: colors.steel,
    marginTop: 54,
    marginLeft: 25,
    paddingTop: 9,
    paddingLeft: 21,
  },
  cardTitle: {
    ...type.methodLabel,
    color: colors.white,
  },
  amount: {
    ...type.statValue,
    color: colors.white,
    marginTop: 13,
    alignSelf: 'center',
  },
  count: {
    ...type.methodLabel,
    color: colors.white,
    marginTop: 17,
    alignSelf: 'center',
    marginRight: 42,
  },
  empty: {
    ...type.methodLabel,
    color: colors.white,
    marginTop: 30,
    marginLeft: 0,
  },
});