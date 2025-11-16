import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Calendar, Clock, MessageSquare, User, Phone } from 'lucide-react';
import { tables, areas, generateTimeSlots } from '../data/mockData';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Footer } from './Footer';
import { useNotification } from '../context/NotificationContext';

interface BookingScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  initialData?: { tableId?: string };
}

export function BookingScreen({ onNavigate, initialData }: BookingScreenProps) {
  const [selectedTableId, setSelectedTableId] = useState(initialData?.tableId || '');
  const [date, setDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1); // Default 1 hour
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  
  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneValidationError, setPhoneValidationError] = useState('');
  
  const { showInfo } = useNotification();

  const availableTables = tables.filter(t => t.status === 'available');
  const selectedTable = tables.find(t => t.id === selectedTableId);
  const timeSlots = generateTimeSlots();
  
  // Update guests when table is selected
  const handleTableSelect = (tableId: string) => {
    setSelectedTableId(tableId);
    const table = tables.find(t => t.id === tableId);
    if (table) {
      // Set guests to default 2 or table capacity, whichever is smaller
      setGuests(Math.min(2, table.capacity));
    }
  };

  const handleConfirm = () => {
    if (!selectedTableId || !date || !selectedTime) {
      showInfo('Thông tin chưa đầy đủ', 'Vui lòng điền đầy đủ thông tin và chọn bàn');
      return;
    }

    if (!customerName || !phoneNumber) {
      showInfo('Thông tin chưa đầy đủ', 'Vui lòng điền họ tên và số điện thoại');
      return;
    }

    // Validate số lượng khách không vượt quá sức chứa
    if (selectedTable && guests > selectedTable.capacity) {
      showInfo(
        'Vượt quá sức chứa', 
        `Bàn ${selectedTable.code} chỉ chứa tối đa ${selectedTable.capacity} người`
      );
      return;
    }
    
    const areaName = areas.find(a => a.id === selectedTable?.area)?.name || selectedTable?.area || '';
    
    const bookingData = {
      tableId: selectedTableId,
      tableCode: selectedTable?.code,
      capacity: selectedTable?.capacity,
      area: areaName,
      date: format(date, 'dd/MM/yyyy', { locale: vi }),
      time: selectedTime,
      duration,
      guests,
      notes,
      customerName,
      phoneNumber
    };
    onNavigate('confirmation', bookingData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-gray-900">Đặt bàn</h2>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          {/* Customer Information and Time Selection - 2 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Information */}
            <Card className="p-6 rounded-3xl shadow-sm">
              <h3 className="text-gray-900 mb-4">Thông tin khách hàng</h3>
              
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-500" />
                    Họ và tên
                  </Label>
                  <Input
                    id="customerName"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nhập tên"
                    className="h-12 rounded-2xl border-gray-200 flex-1"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2 relative">
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-orange-500" />
                    Số điện thoại
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPhoneNumber(value);
                      
                      // Kiểm tra liên tục khi nhập
                      if (!value) {
                        setPhoneValidationError('');
                      } else if (!/^\d*$/.test(value)) {
                        setPhoneValidationError('Chỉ được nhập số');
                      } else if (!value.startsWith('0')) {
                        setPhoneValidationError('Phải bắt đầu bằng số 0');
                      } else if (value.length < 10) {
                        setPhoneValidationError('Phải có ít nhất 10 số');
                      } else {
                        setPhoneValidationError('');
                      }
                    }}
                    placeholder="0912345678"
                    className={`h-12 rounded-2xl border-gray-200 ${phoneValidationError ? 'border-red-500' : ''}`}
                    maxLength={11}
                  />
                  {phoneValidationError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 right-0 mt-1 px-3 py-2 bg-red-50 border border-red-200 rounded-xl shadow-sm z-10"
                    >
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <span>⚠️</span> {phoneValidationError}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Guests */}
                <div className="space-y-2">
                  <Label htmlFor="guests" className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    Số lượng khách
                  </Label>
                  <Select 
                    value={String(guests)} 
                    onValueChange={(value) => setGuests(Number(value))}
                    disabled={!selectedTable}
                  >
                    <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                      <SelectValue placeholder={selectedTable ? "Chọn số người" : "Chọn bàn trước"} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTable ? (
                        Array.from({ length: selectedTable.capacity }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={String(num)}>
                            {num} người
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="0" disabled>
                          Vui lòng chọn bàn trước
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {selectedTable && (
                    <p className="text-xs text-gray-500">Tối đa {selectedTable.capacity} người</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Date and Time Selection */}
            <Card className="p-6 rounded-3xl shadow-sm">
              <h3 className="text-gray-900 mb-4">Thời gian đặt bàn</h3>
              
              <div className="space-y-4">
                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    Ngày đặt
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-2xl border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-300 text-gray-900 justify-start font-normal"
                      >
                        <Calendar className="w-5 h-5 mr-3 text-orange-500" />
                        {format(date, 'EEEE, dd MMMM yyyy', { locale: vi })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const maxDate = new Date();
                          maxDate.setDate(maxDate.getDate() + 30);
                          return date < today || date > maxDate;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Giờ đặt (9:00 - 21:00)
                  </Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                      <SelectValue placeholder="Chọn giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration">Thời gian (giờ)</Label>
                  <Select value={duration.toString()} onValueChange={(v) => setDuration(Number(v))}>
                    <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 giờ</SelectItem>
                      <SelectItem value="1.5">1.5 giờ</SelectItem>
                      <SelectItem value="2">2 giờ</SelectItem>
                      <SelectItem value="2.5">2.5 giờ</SelectItem>
                      <SelectItem value="3">3 giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Notes */}
          <Card className="p-6 rounded-3xl shadow-sm">
            <div className="space-y-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-500" />
                Ghi chú
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Yêu cầu đặc biệt (nếu có)"
                className="h-24 rounded-2xl border-gray-200"
              />
            </div>
          </Card>

          {/* Table Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Chọn bàn</h3>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                {availableTables.length} bàn trống
              </Badge>
            </div>

            {availableTables.length === 0 ? (
              <Card className="p-8 text-center rounded-2xl">
                <p className="text-gray-500 mb-2">Không có bàn trống</p>
                <p className="text-sm text-gray-400">Vui lòng chọn thời gian khác</p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {availableTables.map((table, index) => {
                  const areaName = areas.find(a => a.id === table.area)?.name || table.area;
                  return (
                    <motion.div
                      key={table.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        onClick={() => handleTableSelect(table.id)}
                        className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                          selectedTableId === table.id
                            ? 'border-orange-500 bg-orange-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-orange-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-gray-900">{table.code}</p>
                            <p className="text-xs text-gray-500">{areaName}</p>
                          </div>
                          {selectedTableId === table.id && (
                            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {table.capacity} người
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={!selectedTableId || !date || !selectedTime}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Xác nhận đặt bàn
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-white shadow-sm px-6 py-4">
        <Footer />
      </div>
    </div>
  );
}