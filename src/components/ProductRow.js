import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, layout, type } from '../../theme';

export default function ProductRow({ item, showPrice = false, onAdd, onDelete, onStockChange }) {
  const showControls = Boolean(onDelete || onStockChange);

  return (
    <View style={styles.row}>
      <Text numberOfLines={1} style={[styles.name, showControls && styles.nameWithControls]}>
        {item.name}
      </Text>
      <Text style={styles.stock}>{`Stock: ${item.stock}`}</Text>
      {showPrice ? <Text style={styles.price}>{item.price}</Text> : null}
      {onAdd ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Add ${item.name} to cart`}
          onPress={() => onAdd(item)}
          style={styles.addBtn}
        >
          <Text style={styles.addLabel}>+Add</Text>
        </Pressable>
      ) : null}
      {onDelete ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.name}`}
          hitSlop={8}
          onPress={onDelete}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteIcon}>{'\u2715'}</Text>
        </Pressable>
      ) : null}
      {onStockChange ? (
        <>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Decrease stock of ${item.name}`}
            hitSlop={6}
            onPress={() => onStockChange(-1)}
            style={[styles.stockBtn, styles.stockMinus]}
          >
            <Text style={styles.stockBtnLabel}>{'\u2212'}</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Increase stock of ${item.name}`}
            hitSlop={6}
            onPress={() => onStockChange(1)}
            style={[styles.stockBtn, styles.stockPlus]}
          >
            <Text style={styles.stockBtnLabel}>+</Text>
          </Pressable>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: layout.rowWidth,
    height: layout.rowHeight,
    borderRadius: layout.rowRadius,
    backgroundColor: colors.gray100,
    marginLeft: layout.contentPaddingHorizontal + 18,
    marginBottom: layout.rowGap,
  },
  name: {
    ...type.itemName,
    position: 'absolute',
    left: 10,
    top: 7,
  },
  nameWithControls: {
    right: 30,
  },
  stock: {
    ...type.itemMeta,
    position: 'absolute',
    left: 96,
    top: 34,
  },
  price: {
    ...type.itemPrice,
    position: 'absolute',
    right: 18,
    top: 25,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    top: 22,
    height: 26,
    minWidth: 45,
    paddingHorizontal: 7,
    borderRadius: 5,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addLabel: {
    ...type.itemName,
    color: colors.white,
  },
  deleteBtn: {
    position: 'absolute',
    right: 8,
    top: 4,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    fontSize: 13,
    lineHeight: 15,
    color: colors.statLowStock,
  },
  stockBtn: {
    position: 'absolute',
    top: 30,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockMinus: {
    left: 64,
  },
  stockPlus: {
    left: 164,
  },
  stockBtnLabel: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.navy,
  },
});
