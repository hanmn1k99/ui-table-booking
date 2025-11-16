import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import { Calendar, History, User, LogOut, Users, Bell, MapPin, Search, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Footer } from './Footer';
import { tables } from '../data/mockData';
import { NotificationPopup } from './NotificationPopup';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

// Generate time slots từ 10:00 đến 22:00
const generateOperatingHours = () => {
  const hours = [];
  for (let i = 10; i <= 22; i++) {
    hours.push(`${i.toString().padStart(2, '0')}:00`);
    if (i < 22) {
      hours.push(`${i.toString().padStart(2, '0')}:30`);
    }
  }
  return hours;
};

// Mock data giờ đã đặt cho mỗi bàn
const mockBookedHours: { [tableId: string]: string[] } = {
  '1': ['12:00', '12:30', '13:00', '18:00', '18:30', '19:00'],
  '2': ['11:00', '11:30', '19:00', '19:30', '20:00'],
  '3': ['13:00', '13:30', '14:00', '20:00', '20:30'],
  '4': ['10:00', '10:30', '17:00', '17:30', '18:00'],
  '5': ['14:00', '14:30', '15:00', '19:00', '19:30'],
  '6': ['11:00', '12:00', '18:00', '19:00', '20:00'],
  '7': ['10:00', '11:00', '16:00', '17:00', '18:00'],
  '8': ['13:00', '14:00', '19:00', '20:00', '21:00'],
};

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchDate, setSearchDate] = useState('2025-11-04');
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  
  // Available Hours Dialog State
  const [isAvailableHoursDialogOpen, setIsAvailableHoursDialogOpen] = useState(false);
  const [selectedTableForHours, setSelectedTableForHours] = useState<any>(null);

  const filteredTables = tables;
  const timeSlots = generateOperatingHours();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'booked':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'serving':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cleaning':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Trống';
      case 'booked': return 'Đã đặt';
      case 'serving': return 'Đang phục vụ';
      case 'cleaning': return 'Dọn dẹp';
      default: return status;
    }
  };

  const availableTablesCount = tables.filter(t => t.status === 'available').length;
  const bookedTablesCount = tables.filter(t => t.status === 'booked').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🍽️</span>
            </div>
            <div className="ml-3">
              <span className="text-orange-600">Quản Lý Đặt Bàn</span>
              <p className="text-xs text-gray-500">Xin chào! 👋</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              ref={notificationButtonRef}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors"
            >
              <User className="w-5 h-5 text-orange-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 bg-gradient-to-br from-green-50 to-white border-green-100 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bàn trống</p>
                  <p className="text-green-600">{availableTablesCount}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 bg-gradient-to-br from-orange-50 to-white border-orange-100 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Đặt hôm nay</p>
                  <p className="text-xs text-gray-400 mb-1">{new Date().toLocaleDateString('vi-VN')}</p>
                  <p className="text-orange-600">{bookedTablesCount} bàn</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Button
            onClick={() => onNavigate('booking')}
            className="max-w-xs w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-200"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Đặt bàn ngay
          </Button>
        </motion.div>

        {/* Tables List */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-900">
              Danh sách bàn
              <span className="text-sm text-gray-500 ml-2">
                ({filteredTables.length} bàn)
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {filteredTables.map((table, index) => (
              <motion.div
                key={table.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-3 rounded-2xl border-2 transition-all min-h-[130px] flex flex-col justify-between bg-white">
                  {/* Header: Tên bàn + Số người + Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-900">{table.code}</p>
                      <div className="flex items-baseline gap-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{table.capacity} người</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs rounded-full px-2 py-1 ${getStatusColor(table.status)}`}
                    >
                      {getStatusText(table.status)}
                    </Badge>
                  </div>

                  {/* Footer: Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTableForHours(table);
                        setIsAvailableHoursDialogOpen(true);
                      }}
                      className="flex-1 text-xs rounded-xl h-8 border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      Xem giờ trống
                    </Button>
                    {table.status === 'available' && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('booking', { tableId: table.id });
                        }}
                        className="flex-1 text-xs rounded-xl h-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      >
                        Đặt ngay
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      <NotificationPopup
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        anchorRef={notificationButtonRef}
      />

      {/* Available Hours Dialog */}
      <Dialog open={isAvailableHoursDialogOpen} onOpenChange={setIsAvailableHoursDialogOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle>Giờ trống - Bàn {selectedTableForHours?.code}</DialogTitle>
            <DialogDescription>
              Thời gian hoạt động: 10:00 - 22:00
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((hour) => {
                const bookedHours = mockBookedHours[selectedTableForHours?.id || ''] || [];
                const isBooked = bookedHours.includes(hour);

                return (
                  <motion.button
                    key={hour}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={!isBooked ? { scale: 1.05 } : {}}
                    disabled={isBooked}
                    onClick={() => {
                      if (!isBooked) {
                        onNavigate('booking', { tableId: selectedTableForHours?.id, time: hour });
                        setIsAvailableHoursDialogOpen(false);
                      }
                    }}
                    className={`
                      px-3 py-2 rounded-lg text-sm transition-all
                      ${isBooked 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50' 
                        : 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 hover:from-green-100 hover:to-green-200 hover:shadow-md cursor-pointer border-2 border-green-200'
                      }
                    `}
                  >
                    {hour}
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200"></div>
                <span className="text-xs text-gray-600">Giờ trống</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-100"></div>
                <span className="text-xs text-gray-600">Đã đặt</span>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setIsAvailableHoursDialogOpen(false)}
            className="w-full h-12 rounded-2xl"
          >
            Đóng
          </Button>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
}