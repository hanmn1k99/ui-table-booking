import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Calendar, Users, MapPin, Clock, Search, 
  Menu, LogOut, Home, Settings, Bell, ChevronRight, User, Plus, Trash2, Phone, MessageSquare
} from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { Textarea } from './ui/textarea';
import { 
  AlertDialog, AlertDialogAction, AlertDialogCancel, 
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter, 
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger 
} from './ui/alert-dialog';
import { tables as initialTables, Table, areas, generateTimeSlots } from '../data/mockData';
import { Footer } from './Footer';
import { useNotification } from '../context/NotificationContext';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { showSuccess, showInfo } = useNotification();
  
  // Booking Dialog State
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedBookingTable, setSelectedBookingTable] = useState<Table | null>(null);
  const [bookingData, setBookingData] = useState({
    salutation: 'Anh',
    customerName: '',
    phoneNumber: '',
    phoneValidationError: '',
    date: new Date(),
    time: '',
    duration: 1,
    guests: 2,
    notes: ''
  });
  
  const [newTable, setNewTable] = useState({
    code: '',
    capacity: 2,
    area: 'floor1',
    status: 'available' as Table['status']
  });

  const timeSlots = generateTimeSlots();

  // Mock notifications
  const notifications = [
    { id: 1, type: 'new', message: 'Bàn B03 vừa được đặt lúc 14:30', time: '5 phút trước', unread: true },
    { id: 2, type: 'deposit', message: 'Bàn V01 đã được cọc 500.000đ', time: '10 phút trước', unread: true },
    { id: 3, type: 'cancel', message: 'Đặt bàn B05 đã bị hủy', time: '15 phút trước', unread: true },
    { id: 4, type: 'new', message: 'Bàn T02 vừa được đặt lúc 19:00', time: '30 phút trước', unread: false },
  ];

  const availableTables = tables.filter(t => t.status === 'available').length;
  const servingTables = tables.filter(t => t.status === 'serving').length;
  const bookedTables = tables.filter(t => t.status === 'booked').length;
  const cleaningTables = tables.filter(t => t.status === 'cleaning').length;

  // Get today's date in Vietnamese format
  const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'booked':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'serving':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cleaning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Trống';
      case 'booked': return 'Đã đặt';
      case 'serving': return 'Phục vụ';
      case 'cleaning': return 'Đang dọn';
      default: return status;
    }
  };

  const handleChangeStatus = (tableId: string, newStatus: Table['status']) => {
    const table = tables.find(t => t.id === tableId);
    setTables(tables.map(t => 
      t.id === tableId ? { ...t, status: newStatus } : t
    ));
    
    showInfo(
      'Cập nhật trạng thái bàn',
      `Bàn ${table?.code} đã được chuyển sang trạng thái ${getStatusText(newStatus)}`
    );
  };

  const handleAddTable = () => {
    if (!newTable.code.trim()) return;
    
    const newId = `t${Date.now()}`;
    const table: Table = {
      id: newId,
      code: newTable.code,
      capacity: newTable.capacity,
      area: newTable.area,
      status: newTable.status,
      x: 100,
      y: 100
    };
    
    setTables([...tables, table]);
    showSuccess('Thêm bàn thành công', `Bàn ${newTable.code} đã được thêm vào hệ thống`);
    setNewTable({ code: '', capacity: 2, area: 'floor1', status: 'available' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteTable = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    setTables(tables.filter(t => t.id !== tableId));
    showSuccess('Xóa bàn thành công', `Bàn ${table?.code} đã được xóa khỏi hệ thống`);
  };

  const handleToggleCleaningAvailable = (tableId: string, currentStatus: Table['status']) => {
    let newStatus: Table['status'];
    
    if (currentStatus === 'cleaning') {
      newStatus = 'available';
    } else if (currentStatus === 'available') {
      newStatus = 'cleaning';
    } else {
      // If current status is serving or booked, set to cleaning
      newStatus = 'cleaning';
    }
    
    handleChangeStatus(tableId, newStatus);
  };

  const handleOpenBooking = (table: Table) => {
    setSelectedBookingTable(table);
    setBookingData({
      salutation: 'Anh',
      customerName: '',
      phoneNumber: '',
      phoneValidationError: '',
      date: new Date(),
      time: '',
      duration: 1,
      guests: Math.min(2, table.capacity), // Mặc định 2 người hoặc ít hơn nếu bàn nhỏ
      notes: ''
    });
    setIsBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!bookingData.customerName || !bookingData.phoneNumber || !bookingData.time) {
      showInfo('Thông tin chưa đầy đủ', 'Vui lòng điền đầy đủ thông tin khách hàng và thời gian');
      return;
    }

    // Validate số lượng khách không vượt quá sức chứa
    if (selectedBookingTable && bookingData.guests > selectedBookingTable.capacity) {
      showInfo(
        'Vượt quá sức chứa', 
        `Bàn ${selectedBookingTable.code} chỉ chứa tối đa ${selectedBookingTable.capacity} người`
      );
      return;
    }

    // Update table status to booked
    setTables(tables.map(t => 
      t.id === selectedBookingTable?.id ? { ...t, status: 'booked' as Table['status'] } : t
    ));

    showSuccess(
      'Đặt bàn thành công',
      `Bàn ${selectedBookingTable?.code} đã được đặt cho ${bookingData.salutation} ${bookingData.customerName}`
    );

    setIsBookingDialogOpen(false);
    setSelectedBookingTable(null);
  };

  const getAreaName = (areaId: string) => {
    return areas.find(a => a.id === areaId)?.name || areaId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <div className="ml-3">
              <h2 className="text-white">Admin Dashboard</h2>
              <p className="text-xs text-white/80">Quản lý nhà hàng</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-white" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl text-white mb-1">{tables.length}</p>
            <p className="text-xs text-white/80">Tổng bàn</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl text-white mb-1">{availableTables}</p>
            <p className="text-xs text-white/80">Trống</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl text-white mb-1">{servingTables}</p>
            <p className="text-xs text-white/80">Phục vụ</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl text-white mb-1">{bookedTables}</p>
            <p className="text-xs text-white/80">Đã đặt</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* Add Table Button */}
        <div className="mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="max-w-xs w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-200">
                <Plus className="w-5 h-5 mr-2" />
                Thêm bàn
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl" aria-describedby="add-table-description">
              <DialogHeader>
                <DialogTitle>Thêm bàn mới</DialogTitle>
                <DialogDescription>
                  Điền thông tin để thêm bàn mới vào hệ thống
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tableCode">Mã bàn</Label>
                  <Input
                    id="tableCode"
                    placeholder="Ví dụ: B07, V03"
                    value={newTable.code}
                    onChange={(e) => setNewTable({ ...newTable, code: e.target.value })}
                    className="h-12 rounded-2xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="capacity">Sức chứa</Label>
                  <Select
                    value={String(newTable.capacity)}
                    onValueChange={(value) => setNewTable({ ...newTable, capacity: Number(value) })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 người</SelectItem>
                      <SelectItem value="4">4 người</SelectItem>
                      <SelectItem value="6">6 người</SelectItem>
                      <SelectItem value="8">8 người</SelectItem>
                      <SelectItem value="10">10 người</SelectItem>
                      <SelectItem value="12">12 người</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Khu vực</Label>
                  <Select
                    value={newTable.area}
                    onValueChange={(value) => setNewTable({ ...newTable, area: value })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map(area => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.icon} {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1 h-12 rounded-2xl"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleAddTable}
                  disabled={!newTable.code.trim()}
                  className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl"
                >
                  Thêm bàn
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tables List */}
        <div>
          <h3 className="text-gray-900 mb-4">Danh sách bàn ({tables.length})</h3>
          <div className="grid grid-cols-2 gap-3">
            {tables.map((table, index) => (
              <motion.div
                key={table.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="p-4 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-900 mb-1">{table.code}</p>
                      <p className="text-xs text-gray-500 mb-1">{getAreaName(table.area)}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {table.capacity} người
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs rounded-full px-2 py-1 ${getStatusColor(table.status)}`}
                    >
                      {getStatusText(table.status)}
                    </Badge>
                  </div>
                  
                  {/* Status Change Buttons */}
                  <div className="space-y-2">
                    {/* Đặt Bàn Button - Highlighted */}
                    <Button
                      size="sm"
                      className="w-full text-sm uppercase rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md tracking-wide h-11"
                      onClick={() => handleOpenBooking(table)}
                    >
                      Đặt Bàn
                    </Button>
                    
                    {/* Status Buttons Row: Phục vụ, Đã đặt, Đang dọn/Đặt trống */}
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        size="sm"
                        variant={table.status === 'serving' ? 'default' : 'outline'}
                        onClick={() => handleChangeStatus(table.id, 'serving')}
                        disabled={table.status === 'serving'}
                        className={`text-xs rounded-xl ${table.status === 'serving' ? 'bg-blue-100 text-blue-700 border-blue-200 cursor-default' : ''}`}
                      >
                        Phục vụ
                      </Button>
                      <Button
                        size="sm"
                        variant={table.status === 'booked' ? 'default' : 'outline'}
                        onClick={() => handleChangeStatus(table.id, 'booked')}
                        disabled={table.status === 'booked'}
                        className={`text-xs rounded-xl ${table.status === 'booked' ? 'bg-orange-100 text-orange-700 border-orange-200 cursor-default' : ''}`}
                      >
                        Đã đặt
                      </Button>
                      <Button
                        size="sm"
                        variant={table.status === 'cleaning' || table.status === 'available' ? 'default' : 'outline'}
                        onClick={() => handleToggleCleaningAvailable(table.id, table.status)}
                        className={`text-xs rounded-xl ${
                          table.status === 'cleaning' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
                          table.status === 'available' ? 'bg-green-100 text-green-700 border-green-200' : ''
                        }`}
                      >
                        {table.status === 'cleaning' ? 'Đặt trống' : table.status === 'available' ? 'Đang dọn' : 'Đang dọn'}
                      </Button>
                    </div>
                    
                    {/* Delete Button Row */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs rounded-xl text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Xóa bàn
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-3xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Xác nhận xóa bàn</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bạn có chắc muốn xóa bàn {table.code}? Hành động này không thể hoàn tác.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-2xl">Hủy</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteTable(table.id)}
                            className="rounded-2xl bg-red-600 hover:bg-red-700"
                          >
                            Xóa bàn
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 flex items-center justify-between">
            <h3 className="text-white">Thông báo</h3>
            <button onClick={() => setShowNotifications(false)} className="text-white hover:bg-white/20 rounded-full p-1">
              ✕
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  notif.unread ? 'bg-orange-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notif.type === 'new' ? 'bg-green-500' :
                    notif.type === 'deposit' ? 'bg-blue-500' :
                    'bg-red-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 mb-1">{notif.message}</p>
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 bg-gray-50 text-center">
            <button className="text-sm text-orange-600 hover:text-orange-700">
              Xem tất cả
            </button>
          </div>
        </motion.div>
      )}

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="rounded-3xl max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Đặt bàn cho {selectedBookingTable?.code}</DialogTitle>
            <DialogDescription>
              Điền thông tin khách hàng và thời gian đặt bàn
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Customer Information */}
            <div>
              <h4 className="text-gray-900 mb-4">Thông tin khách hàng</h4>
              <div className="space-y-4">
                {/* Salutation and Name */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-500" />
                    Họ và tên
                  </Label>
                  <div className="flex gap-2">
                    <Select value={bookingData.salutation} onValueChange={(value) => setBookingData({ ...bookingData, salutation: value })}>
                      <SelectTrigger className="h-12 rounded-2xl border-gray-200 w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Anh">Anh</SelectItem>
                        <SelectItem value="Chị">Chị</SelectItem>
                        <SelectItem value="Ông">Ông</SelectItem>
                        <SelectItem value="Bà">Bà</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Nhập tên"
                      value={bookingData.customerName}
                      onChange={(e) => setBookingData({ ...bookingData, customerName: e.target.value })}
                      className="flex-1 h-12 rounded-2xl border-gray-200"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2 relative">
                  <Label className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-500" />
                    Số điện thoại
                  </Label>
                  <Input
                    type="tel"
                    placeholder="0912345678"
                    value={bookingData.phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newBookingData = { ...bookingData, phoneNumber: value };
                      
                      // Kiểm tra liên tục khi nhập
                      if (!value) {
                        newBookingData.phoneValidationError = '';
                      } else if (!/^\d*$/.test(value)) {
                        newBookingData.phoneValidationError = 'Chỉ được nhập số';
                      } else if (!value.startsWith('0')) {
                        newBookingData.phoneValidationError = 'Phải bắt đầu bằng số 0';
                      } else if (value.length < 10) {
                        newBookingData.phoneValidationError = 'Phải có ít nhất 10 số';
                      } else {
                        newBookingData.phoneValidationError = '';
                      }
                      
                      setBookingData(newBookingData);
                    }}
                    className={`h-12 rounded-2xl border-gray-200 ${bookingData.phoneValidationError ? 'border-red-500' : ''}`}
                    maxLength={11}
                  />
                  {bookingData.phoneValidationError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 right-0 mt-1 px-3 py-2 bg-red-50 border border-red-200 rounded-xl shadow-sm z-10"
                    >
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <span>⚠️</span> {bookingData.phoneValidationError}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Time */}
            <div>
              <h4 className="text-gray-900 mb-4">Thời gian đặt bàn</h4>
              <div className="space-y-4">
                {/* Date */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    Ngày đặt
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full h-12 rounded-2xl border-gray-200 justify-start">
                        {format(bookingData.date, 'dd/MM/yyyy', { locale: vi })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={bookingData.date}
                        onSelect={(date) => date && setBookingData({ ...bookingData, date })}
                        initialFocus
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Giờ đặt
                  </Label>
                  <Select value={bookingData.time} onValueChange={(value) => setBookingData({ ...bookingData, time: value })}>
                    <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                      <SelectValue placeholder="Chọn giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration and Guests */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Thời gian (giờ)</Label>
                    <Select value={String(bookingData.duration)} onValueChange={(value) => setBookingData({ ...bookingData, duration: Number(value) })}>
                      <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 giờ</SelectItem>
                        <SelectItem value="2">2 giờ</SelectItem>
                        <SelectItem value="3">3 giờ</SelectItem>
                        <SelectItem value="4">4 giờ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      Số người
                    </Label>
                    <Select value={String(bookingData.guests)} onValueChange={(value) => setBookingData({ ...bookingData, guests: Number(value) })}>
                      <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: selectedBookingTable?.capacity || 2 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} người
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-500" />
                Ghi chú
              </Label>
              <Textarea
                placeholder="Ghi chú thêm (nếu có)"
                value={bookingData.notes}
                onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                className="min-h-[100px] rounded-2xl border-gray-200 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsBookingDialogOpen(false)}
              className="flex-1 h-12 rounded-2xl"
            >
              Hủy
            </Button>
            <Button
              onClick={handleConfirmBooking}
              className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl"
            >
              Xác nhận đặt bàn
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
}