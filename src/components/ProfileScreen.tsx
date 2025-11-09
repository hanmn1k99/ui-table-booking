import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { motion } from 'motion/react';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, Clock, X, Edit } from 'lucide-react';
import { bookings, areas, mockUser } from '../data/mockData';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('bookings');

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Đã xác nhận</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Hoàn tất</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Đã hủy</Badge>;
      default:
        return null;
    }
  };

  const BookingCard = ({ booking }: { booking: any }) => {
    const areaName = areas.find(a => a.id === booking.area)?.name;
    
    return (
      <Card className="p-4 rounded-2xl mb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-gray-900">Bàn {booking.tableNumber}</p>
              {getStatusBadge(booking.status)}
            </div>
            <div className="space-y-1.5 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                {booking.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                {booking.time}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                {areaName}
              </div>
            </div>
          </div>
          {booking.status === 'confirmed' && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-red-600 border-red-200 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-1" />
              Hủy
            </Button>
          )}
        </div>
        {booking.note && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Ghi chú: {booking.note}</p>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-gray-900">Tài khoản</h2>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Edit className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white mb-1">{mockUser.name}</p>
                <div className="flex items-center text-sm text-white/80 mb-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {mockUser.email}
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <Phone className="w-4 h-4 mr-2" />
                  {mockUser.phone}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <Card className="p-4 rounded-2xl text-center">
            <p className="text-orange-600 mb-1">{confirmedBookings.length}</p>
            <p className="text-xs text-gray-600">Đã đặt</p>
          </Card>
          <Card className="p-4 rounded-2xl text-center">
            <p className="text-blue-600 mb-1">{completedBookings.length}</p>
            <p className="text-xs text-gray-600">Hoàn tất</p>
          </Card>
          <Card className="p-4 rounded-2xl text-center">
            <p className="text-red-600 mb-1">{cancelledBookings.length}</p>
            <p className="text-xs text-gray-600">Đã hủy</p>
          </Card>
        </motion.div>

        {/* Bookings History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-12 bg-white rounded-2xl p-1">
              <TabsTrigger 
                value="bookings" 
                className="rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Đã đặt
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Hoàn tất
              </TabsTrigger>
              <TabsTrigger 
                value="cancelled" 
                className="rounded-xl data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Đã hủy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="mt-6">
              {confirmedBookings.length > 0 ? (
                confirmedBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <Card className="p-8 text-center rounded-2xl">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">Chưa có đặt bàn nào</p>
                  <Button
                    onClick={() => onNavigate('home')}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl"
                  >
                    Đặt bàn ngay
                  </Button>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              {completedBookings.length > 0 ? (
                completedBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <Card className="p-8 text-center rounded-2xl">
                  <p className="text-gray-600">Chưa có lịch sử hoàn tất</p>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="mt-6">
              {cancelledBookings.length > 0 ? (
                cancelledBookings.map(booking => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              ) : (
                <Card className="p-8 text-center rounded-2xl">
                  <p className="text-gray-600">Chưa có đặt bàn bị hủy</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={() => onNavigate('login')}
            variant="outline"
            className="w-full h-12 rounded-2xl border-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            Đăng xuất
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
