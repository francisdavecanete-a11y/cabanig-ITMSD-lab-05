import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import SectionTitle from '../components/SectionTitle';
import ProductRow from '../components/ProductRow';
import ProductFormModal from '../components/ProductFormModal';
import { getDb, initDatabase } from '../services/db';
import { colors, layout, type } from '../../theme';

const SELECT_ALL = 'SELECT * FROM products ORDER BY name ASC';
const SELECT_BY_NAME = 'SELECT * FROM products WHERE name LIKE ? ORDER BY name ASC';
const INSERT_PRODUCT = 'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)';
const DELETE_PRODUCT = 'DELETE FROM products WHERE id = ?';
const UPDATE_STOCK = 'UPDATE products SET stock = MAX(stock + ?, 0) WHERE id = ?';

const formatPrice = (value) => {
  const [whole, decimals] = Number(value).toFixed(2).split('.');
  return `${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimals}`;
};

export default function InventoryScreen() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [ready, setReady] = useState(false);
  const [dbError, setDbError] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  const loadProducts = useCallback((term) => {
    try {
      const db = getDb();
      const trimmed = (term || '').trim();
      const rows = trimmed
        ? db.getAllSync(SELECT_BY_NAME, [`%${trimmed}%`])
        : db.getAllSync(SELECT_ALL);
      setProducts(rows);
      setDbError('');
    } catch (error) {
      console.error('Inventory DB error:', error);
      setDbError('DBERR: ' + (error && error.message ? error.message : String(error)));
    }
  }, []);

  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      console.error('Inventory DB error:', error);
      setDbError('DBERR: ' + (error && error.message ? error.message : String(error)));
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      loadProducts(search);
    }
  }, [ready, search, loadProducts]);

  const addProduct = ({ name, category, price, stock }) => {
    try {
      getDb().runSync(INSERT_PRODUCT, [name, category, price, stock]);
    } catch (error) {
      Alert.alert('Could not add item', 'The offline database is unavailable.');
      return;
    }
    setFormVisible(false);
    setSearch('');
    loadProducts('');
  };

  const removeProduct = (item) => {
    Alert.alert('Delete product?', `${item.name} will be removed from inventory.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          try {
            getDb().runSync(DELETE_PRODUCT, [item.id]);
          } catch (error) {
            Alert.alert('Could not delete item', 'The offline database is unavailable.');
            return;
          }
          loadProducts(search);
        },
      },
    ]);
  };

  const changeStock = (item, delta) => {
    try {
      getDb().runSync(UPDATE_STOCK, [delta, item.id]);
    } catch (error) {
      Alert.alert('Could not update stock', 'The offline database is unavailable.');
      return;
    }
    loadProducts(search);
  };

  const renderItem = ({ item }) => (
    <ProductRow
      item={{ ...item, price: formatPrice(item.price) }}
      showPrice
      onDelete={() => removeProduct(item)}
      onStockChange={(delta) => changeStock(item, delta)}
    />
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="Inventory" />
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}>
              <SectionTitle>{`Inventory (${products.length} items)`}</SectionTitle>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add item"
                onPress={() => setFormVisible(true)}
                style={({ pressed }) => [styles.addBtn, pressed && styles.pressed]}
              >
                <Text style={styles.addLabel}>Add Item</Text>
              </Pressable>
            </View>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search products"
              placeholderTextColor={colors.gray300}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="search"
              style={styles.search}
            />
          </View>
        }
        ListHeaderComponentStyle={styles.header}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {dbError || (ready ? 'No products found.' : 'Loading inventory...')}
          </Text>
        }
      />
      <ProductFormModal
        visible={formVisible}
        onCancel={() => setFormVisible(false)}
        onSubmit={addProduct}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingBottom: layout.tabBarHeight + 24,
  },
  header: {
    marginBottom: 23,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: layout.contentPaddingHorizontal,
  },
  addBtn: {
    height: 30,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLabel: {
    ...type.itemName,
    color: colors.white,
  },
  search: {
    ...type.itemName,
    height: 38,
    marginHorizontal: layout.contentPaddingHorizontal,
    marginTop: 12,
    borderRadius: 19,
    paddingHorizontal: 16,
    backgroundColor: colors.gray100,
  },
  empty: {
    ...type.itemName,
    color: colors.gray300,
    alignSelf: 'center',
    marginTop: 40,
  },
  pressed: {
    opacity: 0.7,
  },
});


