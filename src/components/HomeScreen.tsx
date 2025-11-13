import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Search, Calendar, Users, MapPin, Bell, User, Clock } from 'lucide-react';
import { tables, areas, bookings } from '../data/mockData';
import { NotificationPopup } from './NotificationPopup';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [searchDate, setSearchDate] = useState('2025-11-04');
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  const filteredTables = tables;

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
  const todayBookingsCount = bookings.filter(b => b.date === searchDate && b.status === 'confirmed').length;

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
              <p className="text-xs text-gray-500">Xin chào!</p>
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

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Tìm bàn trống theo ngày/giờ..."
            className="h-12 pl-12 pr-4 rounded-2xl border-gray-200 bg-gray-50"
          />
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
                  <p className="text-orange-600">{todayBookingsCount}</p>
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
        >
          <Button
            onClick={() => onNavigate('booking')}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-200 mb-6"
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
            <button 
              onClick={() => onNavigate('tableMap')}
              className="text-sm text-orange-600 flex items-center gap-1"
            >
              <MapPin className="w-4 h-4" />
              Xem sơ đồ
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredTables.map((table, index) => (
              <motion.div
                key={table.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    table.status === 'available' 
                      ? 'bg-white hover:border-orange-300' 
                      : 'bg-gray-50 opacity-75'
                  }`}
                  onClick={() => {
                    if (table.status === 'available') {
                      onNavigate('booking', { tableId: table.id });
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-gray-900 mb-1">{table.number}</p>
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
                  
                  {table.status === 'booked' && (
                    <div className="flex items-center text-xs text-gray-500 bg-orange-50 rounded-lg px-2 py-1">
                      <Clock className="w-3 h-3 mr-1" />
                      19:00
                    </div>
                  )}
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
    </div>
  );
}