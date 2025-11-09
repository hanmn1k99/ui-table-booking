// Mock data cho ứng dụng đặt bàn nhà hàng

export interface Table {
  id: string;
  number: string;
  capacity: number;
  area: string;
  status: 'available' | 'booked' | 'serving' | 'cleaning';
  x?: number;
  y?: number;
}

export interface Booking {
  id: string;
  tableId: string;
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  area: string;
  note?: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  qrCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'staff' | 'admin';
}

export const areas = [
  { id: 'floor1', name: 'Tầng 1', icon: '🏠' },
  { id: 'floor2', name: 'Tầng 2', icon: '🏢' },
  { id: 'outdoor', name: 'Ngoài trời', icon: '🌳' },
  { id: 'vip', name: 'Phòng VIP', icon: '👑' }
];

export const tables: Table[] = [
  // Tầng 1
  { id: 't1', number: 'B01', capacity: 2, area: 'floor1', status: 'available', x: 50, y: 50 },
  { id: 't2', number: 'B02', capacity: 2, area: 'floor1', status: 'serving', x: 150, y: 50 },
  { id: 't3', number: 'B03', capacity: 4, area: 'floor1', status: 'available', x: 250, y: 50 },
  { id: 't4', number: 'B04', capacity: 4, area: 'floor1', status: 'booked', x: 50, y: 150 },
  { id: 't5', number: 'B05', capacity: 6, area: 'floor1', status: 'available', x: 150, y: 150 },
  { id: 't6', number: 'B06', capacity: 8, area: 'floor1', status: 'available', x: 250, y: 150 },
  
  // Tầng 2
  { id: 't7', number: 'B07', capacity: 2, area: 'floor2', status: 'available', x: 50, y: 50 },
  { id: 't8', number: 'B08', capacity: 4, area: 'floor2', status: 'available', x: 150, y: 50 },
  { id: 't9', number: 'B09', capacity: 4, area: 'floor2', status: 'serving', x: 250, y: 50 },
  { id: 't10', number: 'B10', capacity: 6, area: 'floor2', status: 'available', x: 150, y: 150 },
  
  // Ngoài trời
  { id: 't11', number: 'B11', capacity: 4, area: 'outdoor', status: 'available', x: 50, y: 50 },
  { id: 't12', number: 'B12', capacity: 4, area: 'outdoor', status: 'available', x: 150, y: 50 },
  { id: 't13', number: 'B13', capacity: 6, area: 'outdoor', status: 'booked', x: 250, y: 50 },
  
  // VIP
  { id: 't14', number: 'V01', capacity: 10, area: 'vip', status: 'available', x: 100, y: 100 },
  { id: 't15', number: 'V02', capacity: 12, area: 'vip', status: 'available', x: 250, y: 100 },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    tableId: 't2',
    tableNumber: 'B02',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0912345678',
    date: '2025-11-04',
    time: '19:00',
    guests: 2,
    area: 'floor1',
    note: 'Bàn gần cửa sổ',
    status: 'confirmed',
    qrCode: 'QR-B02-20251104'
  },
  {
    id: 'b2',
    tableId: 't4',
    tableNumber: 'B04',
    customerName: 'Trần Thị B',
    customerPhone: '0987654321',
    date: '2025-11-04',
    time: '20:00',
    guests: 4,
    area: 'floor1',
    status: 'confirmed',
    qrCode: 'QR-B04-20251104'
  },
  {
    id: 'b3',
    tableId: 't9',
    tableNumber: 'B09',
    customerName: 'Lê Văn C',
    customerPhone: '0909123456',
    date: '2025-11-04',
    time: '18:30',
    guests: 4,
    area: 'floor2',
    status: 'completed',
    qrCode: 'QR-B09-20251104'
  },
  {
    id: 'b4',
    tableId: 't13',
    tableNumber: 'B13',
    customerName: 'Phạm Thị D',
    customerPhone: '0938765432',
    date: '2025-11-04',
    time: '19:30',
    guests: 6,
    area: 'outdoor',
    note: 'Sinh nhật',
    status: 'confirmed',
    qrCode: 'QR-B13-20251104'
  }
];

export const mockUser: User = {
  id: 'u1',
  name: 'Khách hàng Demo',
  email: 'demo@example.com',
  phone: '0912345678',
  role: 'customer'
};

export const mockAdmin: User = {
  id: 'a1',
  name: 'Admin Demo',
  email: 'admin@restaurant.com',
  phone: '0909999999',
  role: 'admin'
};
