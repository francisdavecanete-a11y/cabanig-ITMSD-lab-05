import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, layout, type } from '../../theme';

const EMPTY_FORM = { name: '', category: '', price: '', stock: '' };

function Field({ label, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.gray300}
        style={styles.input}
        {...props}
      />
    </View>
  );
}

export default function ProductFormModal({ visible, onCancel, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (visible) {
      setForm(EMPTY_FORM);
    }
  }, [visible]);

  const update = (field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = () => {
    const name = form.name.trim();
    const category = form.category.trim();
    const price = Number(form.price.replace(/,/g, ''));
    const stock = Number(form.stock);

    if (!name || !category) {
      Alert.alert('Missing details', 'Name and category are required.');
      return;
    }
    if (!form.price.trim() || !Number.isFinite(price) || price < 0) {
      Alert.alert('Invalid price', 'Enter a price of 0 or more.');
      return;
    }
    if (!form.stock.trim() || !Number.isInteger(stock) || stock < 0) {
      Alert.alert('Invalid stock', 'Enter a whole number of 0 or more.');
      return;
    }

    onSubmit({ name, category, price, stock });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Add Item</Text>

          <Field
            label="Name"
            value={form.name}
            onChangeText={update('name')}
            placeholder="e.g. Jasmine Rice 1sack"
            returnKeyType="next"
          />
          <Field
            label="Category"
            value={form.category}
            onChangeText={update('category')}
            placeholder="e.g. Rice & Grains"
            returnKeyType="next"
          />
          <Field
            label="Price"
            value={form.price}
            onChangeText={update('price')}
            placeholder="0.00"
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
          <Field
            label="Stock"
            value={form.stock}
            onChangeText={update('stock')}
            placeholder="0"
            keyboardType="number-pad"
            returnKeyType="done"
            onSubmitEditing={submit}
          />

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={onCancel}
              style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
            >
              <Text style={styles.cancelLabel}>Cancel</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Save product"
              onPress={submit}
              style={({ pressed }) => [styles.saveBtn, pressed && styles.pressed]}
            >
              <Text style={styles.saveLabel}>Add Item</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    borderRadius: layout.rowRadius,
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    ...type.sectionTitle,
    fontSize: 16,
    marginBottom: 16,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    ...type.itemName,
    marginBottom: 5,
  },
  input: {
    ...type.itemName,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.gray100,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  cancelBtn: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelLabel: {
    ...type.itemName,
  },
  saveBtn: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveLabel: {
    ...type.itemName,
    color: colors.white,
  },
  pressed: {
    opacity: 0.7,
  },
});
