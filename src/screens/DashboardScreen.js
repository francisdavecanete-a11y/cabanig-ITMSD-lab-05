import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import SectionTitle from '../components/SectionTitle';
import { StatGrid } from '../components/StatCard';
import ProductRow from '../components/ProductRow';
import { stats, lowStockProducts } from '../data/inventory';
import { layout } from '../../theme';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Dashboard" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <SectionTitle>Store Overview</SectionTitle>
        <StatGrid items={stats} />
        <SectionTitle style={styles.alertsTitle}>Low stock alerts</SectionTitle>
        {lowStockProducts.map((item) => (
          <ProductRow key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    paddingBottom: layout.tabBarHeight + 24,
  },
  alertsTitle: {
    marginTop: 7,
    marginBottom: 0,
    paddingBottom: 0,
  },
});