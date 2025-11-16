import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'motion/react';
import { ArrowLeft, User, Calendar, MapPin, Clock, ChevronRight, LogOut, Edit, X, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { Footer } from './Footer';
import { mockUser, bookings as initialBookings } from '../data/mockData';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useNotification } from '../context/NotificationContext';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState(initialBookings);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [cancelReason, setCancelReason] = useState('');
  const { showSuccess, showInfo } = useNotification();

  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const servedBookings = bookings.filter(b => b.status === 'served');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Đã xác nhận</Badge>;
      case 'served':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Đã được phục vụ</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Đã hủy</Badge>;
      default:
        return null;
    }
  };

  const BookingCard = ({ booking }: { booking: any }) => {
    // Format date and time: hh:mm dd/mm/yyyy
    const formatDateTime = (dateStr: string, timeStr: string) => {
      return `${timeStr} ${dateStr}`;
    };

    return (
      <Card className="p-4 rounded-2xl mb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-gray-900">Mã bàn: {booking.tableCode}</p>
              {getStatusBadge(booking.status)}
            </div>
            <div className="space-y-1.5 text-sm text-gray-600">
              <div className="flex items-center">
                {booking.area}
              </div>
              <div className="flex items-center">
                {formatDateTime(booking.date, booking.time)} ({booking.duration}h)
              </div>
            </div>
          </div>
          {booking.status === 'confirmed' && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => {
                setSelectedBooking(booking);
                setIsCancelDialogOpen(true);
              }}
            >
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

  const handleCancelBooking = () => {
    if (!selectedBooking) return;
    
    if (!cancelReason.trim()) {
      showInfo('Vui lòng nhập lý do hủy', 'Lý do hủy là bắt buộc');
      return;
    }

    // Parse booking date and time
    const bookingDateTime = new Date(`${selectedBooking.date}T${selectedBooking.time}`);
    const now = new Date();
    
    // Calculate time difference in hours
    const timeDiffMs = bookingDateTime.getTime() - now.getTime();
    const timeDiffHours = timeDiffMs / (1000 * 60 * 60);
    
    // Check if cancellation is within 1 hour before booking time
    const depositRefunded = timeDiffHours > 1;
    
    // Update booking
    const updatedBookings = bookings.map(b => {
      if (b.id === selectedBooking.id) {
        return {
          ...b,
          status: 'cancelled' as const,
          cancelReason: cancelReason.trim(),
          cancelledAt: now.toISOString(),
          depositRefunded: depositRefunded
        };
      }
      return b;
    });
    
    setBookings(updatedBookings);
    setIsCancelDialogOpen(false);
    setCancelReason('');
    
    // Show notification about deposit refund
    if (depositRefunded) {
      showSuccess(
        'Đã hủy đặt bàn thành công',
        'Tiền cọc sẽ được hoàn lại trong vòng 24h'
      );
    } else {
      showInfo(
        'Đã hủy đặt bàn',
        '⚠️ Hủy trong vòng 1h trước giờ đặt - Không hoàn cọc'
      );
    }
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
                <div className="text-sm text-white/80 mb-1">
                  {mockUser.email}
                </div>
                <div className="text-sm text-white/80">
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
            <p className="text-blue-600 mb-1">{servedBookings.length}</p>
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
              {servedBookings.length > 0 ? (
                servedBookings.map(booking => (
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

      {/* Footer */}
      <Footer />

      {/* Cancel Booking Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="rounded-3xl sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hủy đặt bàn {selectedBooking?.tableCode}</DialogTitle>
            <DialogDescription>
              Vui lòng nhập lý do hủy đặt bàn. Nếu hủy trong vòng 1 giờ trước giờ đặt, tiền cọc sẽ không được hoàn lại.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cancelReason" className="flex items-center gap-2">
                <span className="text-red-500">*</span>
                Lý do hủy (bắt buộc)
              </Label>
              <Textarea
                id="cancelReason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Vui lòng nhập lý do hủy đặt bàn..."
                className="min-h-[100px] rounded-2xl border-gray-200 resize-none"
                maxLength={500}
              />
              <p className="text-xs text-gray-500">{cancelReason.length}/500 ký tự</p>
            </div>
            
            {selectedBooking && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <p className="text-sm text-orange-800">
                  <strong>Lưu ý:</strong> Thời gian đặt bàn: {selectedBooking.time} {selectedBooking.date}
                </p>
                <p className="text-sm text-orange-700 mt-2">
                  • Hủy trước 1h: Hoàn cọc 100%<br />
                  • Hủy trong vòng 1h: Không hoàn cọc
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsCancelDialogOpen(false);
                setCancelReason('');
              }}
              className="flex-1 h-12 rounded-2xl"
            >
              Quay lại
            </Button>
            <Button
              onClick={handleCancelBooking}
              disabled={!cancelReason.trim()}
              className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Xác nhận hủy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}