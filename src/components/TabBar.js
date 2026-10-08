import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { colors, layout } from '../../theme';

const ICONS = {
  Dashboard: require('../../assets/icons/tab-dashboard.png'),
  Inventory: require('../../assets/icons/tab-inventory.png'),
  POS: require('../../assets/icons/tab-pos.png'),
  Payment: require('../../assets/icons/tab-payment.png'),
  Reports: require('../../assets/icons/tab-reports.png'),
};

export default function TabBar({ state, navigation }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.divider} />
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const options = route.options ?? {};
          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <View key={route.key} style={styles.item}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={focused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel ?? route.name}
                onPress={onPress}
                style={styles.pressable}
              >
                <Image
                  source={ICONS[route.name]}
                  resizeMode="contain"
                  style={[styles.icon, !focused && styles.iconInactive]}
                />
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.white,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: layout.tabDividerColor,
  },
  row: {
    height: layout.tabBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  icon: {
    width: 44,
    height: 35,
  },
  iconInactive: {
    opacity: 0.45,
  },
});