// Mock data cho ứng dụng đặt bàn nhà hàng

export interface Table {
  id: string;
  code: string; // Changed from 'number' to 'code' (Mã bàn)
  capacity: number;
  area: string;
  status: 'available' | 'booked' | 'serving' | 'cleaning';
  x?: number;
  y?: number;
}

export interface Booking {
  id: string;
  tableId: string;
  tableCode: string; // Changed from 'tableNumber' to 'tableCode'
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  duration: number; // Duration in hours (default: 1)
  guests: number;
  area: string;
  note?: string;
  status: 'confirmed' | 'cancelled' | 'served'; // Changed 'completed' to 'served' (Đã được phục vụ)
  qrCode?: string;
  cancelReason?: string; // Lý do hủy
  cancelledAt?: string; // Thời gian hủy
  depositRefunded?: boolean; // Có hoàn cọc không
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'staff' | 'admin';
}

export interface Notification {
  id: string;
  type: 'booking' | 'table' | 'promotion' | 'menu' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon?: string;
}

export const areas = [
  { id: 'floor1', name: 'Tầng 1', icon: '🏠' },
  { id: 'floor2', name: 'Tầng 2', icon: '🏢' },
  { id: 'outdoor', name: 'Ngoài trời', icon: '🌳' },
  { id: 'vip', name: 'Phòng VIP', icon: '👑' }
];

// Restaurant opening hours: 9:00 AM - 9:00 PM (21:00)
export const OPENING_HOUR = 9;
export const CLOSING_HOUR = 21;

// Generate available time slots
export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    slots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
  return slots;
};

export const tables: Table[] = [
  // Tầng 1
  { id: 't1', code: 'B01', capacity: 2, area: 'floor1', status: 'available', x: 50, y: 50 },
  { id: 't2', code: 'B02', capacity: 2, area: 'floor1', status: 'serving', x: 150, y: 50 },
  { id: 't3', code: 'B03', capacity: 4, area: 'floor1', status: 'available', x: 250, y: 50 },
  { id: 't4', code: 'B04', capacity: 4, area: 'floor1', status: 'booked', x: 50, y: 150 },
  { id: 't5', code: 'B05', capacity: 6, area: 'floor1', status: 'cleaning', x: 150, y: 150 },
  { id: 't6', code: 'B06', capacity: 8, area: 'floor1', status: 'available', x: 250, y: 150 },
  
  // Tầng 2
  { id: 't7', code: 'B07', capacity: 2, area: 'floor2', status: 'available', x: 50, y: 50 },
  { id: 't8', code: 'B08', capacity: 4, area: 'floor2', status: 'available', x: 150, y: 50 },
  { id: 't9', code: 'B09', capacity: 4, area: 'floor2', status: 'serving', x: 250, y: 50 },
  { id: 't10', code: 'B10', capacity: 6, area: 'floor2', status: 'available', x: 150, y: 150 },
  
  // Ngoài trời
  { id: 't11', code: 'B11', capacity: 4, area: 'outdoor', status: 'available', x: 50, y: 50 },
  { id: 't12', code: 'B12', capacity: 4, area: 'outdoor', status: 'available', x: 150, y: 50 },
  { id: 't13', code: 'B13', capacity: 6, area: 'outdoor', status: 'booked', x: 250, y: 50 },
  
  // VIP
  { id: 't14', code: 'V01', capacity: 10, area: 'vip', status: 'available', x: 100, y: 100 },
  { id: 't15', code: 'V02', capacity: 12, area: 'vip', status: 'available', x: 250, y: 100 },
];

export const bookings: Booking[] = [
  {
    id: 'b1',
    tableId: 't2',
    tableCode: 'B02',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0912345678',
    date: '2025-11-15',
    time: '19:00',
    duration: 2,
    guests: 2,
    area: 'Tầng 1',
    note: 'Bàn gần cửa sổ',
    status: 'confirmed',
    qrCode: 'QR-B02-20251115'
  },
  {
    id: 'b2',
    tableId: 't4',
    tableCode: 'B04',
    customerName: 'Trần Thị B',
    customerPhone: '0987654321',
    date: '2025-11-15',
    time: '20:00',
    duration: 1,
    guests: 4,
    area: 'Tầng 1',
    status: 'confirmed',
    qrCode: 'QR-B04-20251115'
  },
  {
    id: 'b3',
    tableId: 't9',
    tableCode: 'B09',
    customerName: 'Lê Văn C',
    customerPhone: '0909123456',
    date: '2025-11-14',
    time: '18:30',
    duration: 1.5,
    guests: 4,
    area: 'Tầng 2',
    status: 'served',
    qrCode: 'QR-B09-20251114'
  },
  {
    id: 'b4',
    tableId: 't13',
    tableCode: 'B13',
    customerName: 'Phạm Thị D',
    customerPhone: '0938765432',
    date: '2025-11-15',
    time: '19:30',
    duration: 2,
    guests: 6,
    area: 'Ngoài trời',
    note: 'Sinh nhật',
    status: 'confirmed',
    qrCode: 'QR-B13-20251115'
  }
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    type: 'promotion',
    title: '🎉 Ưu đãi đặc biệt cuối tuần!',
    message: 'Giảm 20% cho hóa đơn từ 500k. Áp dụng từ thứ 6 đến Chủ nhật.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    icon: '🎁'
  },
  {
    id: 'n2',
    type: 'menu',
    title: '🍜 Thực đơn mới: Phở Bò Úc',
    message: 'Thưởng thức món Phở Bò Úc cao cấp với thịt bò nhập khẩu. Giá chỉ 120k.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
    icon: '🍲'
  },
  {
    id: 'n3',
    type: 'promotion',
    title: '☕ Happy Hour: 14h - 16h',
    message: 'Tất cả đồ uống giảm 30%. Đừng bỏ lỡ!',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    icon: '🥤'
  },
  {
    id: 'n4',
    type: 'menu',
    title: '🍰 Món tráng miệng mới',
    message: 'Tiramisu Ý và Panna Cotta đã có mặt trong thực đơn tráng miệng.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    icon: '🧁'
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