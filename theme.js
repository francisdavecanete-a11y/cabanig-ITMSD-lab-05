import { Platform } from 'react-native';

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#D9D9D9',
  gray300: '#A19B9B',
  navy: '#161F69',
  blue: '#1F26E1',
  deepBlue: '#0D117A',
  steel: '#6DA3CD',
  green: '#539265',
  headerGradientFrom: '#1F26E1',
  headerGradientTo: '#192C1F',
  statRevenue: '#375695',
  statSales: '#3D8075',
  statProducts: '#3D8050',
  statLowStock: '#803D3E',
  tabInactive: '#8A8A8A',
};

export const gradients = {
  header: {
    colors: [colors.headerGradientFrom, colors.headerGradientTo],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  headerReports: {
    colors: [colors.headerGradientFrom, colors.deepBlue],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  statCard: (accent) => ({
    colors: [accent, colors.gray300],
    start: { x: 1, y: 0 },
    end: { x: 0, y: 0 },
  }),
};

export const fonts = {
  regular: 'Inter_400Regular',
  roboto: 'Roboto_400Regular',
};

export const type = {
  screenTitle: { fontFamily: fonts.regular, fontSize: 20, color: colors.white },
  sectionTitle: { fontFamily: fonts.regular, fontSize: 14, color: colors.black },
  itemName: { fontFamily: fonts.regular, fontSize: 12, color: colors.black },
  itemMeta: { fontFamily: fonts.regular, fontSize: 12, color: colors.black },
  itemPrice: { fontFamily: fonts.regular, fontSize: 12, color: colors.navy },
  statValue: { fontFamily: fonts.regular, fontSize: 24, fontWeight: '400' },
  statLabel: { fontFamily: fonts.regular, fontSize: 12, color: colors.black },
  methodLabel: { fontFamily: fonts.regular, fontSize: 20, color: colors.black },
  buttonLabel: { fontFamily: fonts.roboto, fontSize: 20, color: colors.white },
  cartLabel: { fontFamily: fonts.regular, fontSize: 12, color: colors.black },
};

export const layout = {
  frameWidth: 390,
  frameHeight: 844,
  headerHeight: 85,
  headerPaddingHorizontal: 17,
  contentPaddingHorizontal: 17,
  rowWidth: 320,
  rowHeight: 70,
  rowRadius: 20,
  rowGap: 23,
  tabBarHeight: 54,
  tabDividerColor: colors.black,
};

export const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  android: { elevation: 1 },
  default: {},
});

export default { colors, gradients, fonts, type, layout, shadow };