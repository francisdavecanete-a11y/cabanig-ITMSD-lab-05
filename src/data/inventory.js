export const products = [
  { id: 'p1', name: 'Jasmine Rice 1sack', stock: 56, price: '1,300.00' },
  { id: 'p2', name: 'Cooking Oil 1L', stock: 58, price: '82.00' },
  { id: 'p3', name: 'Brown Sugar 1kg', stock: 100, price: '68.00' },
  { id: 'p4', name: 'Coffee 3-in-1', stock: 200, price: '50.00' },
  { id: 'p5', name: 'Noodles 60g 5x', stock: 99, price: '43.00' },
  { id: 'p6', name: 'Laundry Soap Bar', stock: 65, price: '89.00' },
];

export const lowStockProducts = ['p3', 'p4', 'p5', 'p6']
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean);

export const stats = [
  { id: 'revenue', value: '0', label: 'Total Revenue', accent: '#375695' },
  { id: 'sales', value: '0', label: 'Sales Today ', accent: '#3D8075' },
  { id: 'products', value: '6', label: 'Products', accent: '#3D8050' },
  { id: 'lowStock', value: '0', label: 'Low Stock', accent: '#803D3E' },
];

export const paymentMethods = [
  { id: 'cash', label: 'Cash', icon: require('../../assets/icons/pay-cash.png') },
  { id: 'gcash', label: 'GCash', icon: require('../../assets/icons/pay-gcash.png') },
  { id: 'card', label: 'Card', icon: require('../../assets/icons/pay-card.png') },
];