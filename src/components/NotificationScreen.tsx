import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Gift, Clock, Info, Bell, Trash2 } from 'lucide-react';

interface NotificationScreenProps {
  onNavigate: (screen: string) => void;
}

interface Notification {
  id: string;
  type: 'booking' | 'promotion' | 'reminder' | 'info';
  title: string;
  message: string;
  time: string;
  isNew: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Đặt bàn thành công',
    message: 'Bàn số 5 đã được xác nhận cho ngày 15/11/2025 lúc 19:00',
    time: '5 phút trước',
    isNew: true,
  },
  {
    id: '2',
    type: 'promotion',
    title: 'Ưu đãi đặc biệt 🎉',
    message: 'Giảm 20% cho đơn hàng từ 500.000đ. Áp dụng từ 14/11 - 20/11',
    time: '2 giờ trước',
    isNew: true,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Nhắc nhở đặt bàn',
    message: 'Bạn có lịch đặt bàn vào ngày mai lúc 19:00. Đừng quên nhé!',
    time: '1 ngày trước',
    isNew: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'Cập nhật thực đơn',
    message: 'Nhà hàng vừa bổ sung 10 món ăn mới. Khám phá ngay!',
    time: '2 ngày trước',
    isNew: false,
  },
  {
    id: '5',
    type: 'booking',
    title: 'Hoàn thành đặt bàn',
    message: 'Cảm ơn bạn đã sử dụng dịch vụ. Hẹn gặp lại!',
    time: '3 ngày trước',
    isNew: false,
  },
  {
    id: '6',
    type: 'promotion',
    title: 'Điểm thưởng tích lũy',
    message: 'Bạn có 250 điểm. Đổi ngay để nhận ưu đãi hấp dẫn!',
    time: '1 tuần trước',
    isNew: false,
  },
];

export function NotificationScreen({ onNavigate }: NotificationScreenProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'promotion':
        return <Gift className="w-6 h-6 text-orange-600" />;
      case 'reminder':
        return <Clock className="w-6 h-6 text-blue-600" />;
      case 'info':
        return <Info className="w-6 h-6 text-purple-600" />;
      default:
        return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'booking':
        return 'bg-green-100';
      case 'promotion':
        return 'bg-orange-100';
      case 'reminder':
        return 'bg-blue-100';
      case 'info':
        return 'bg-purple-100';
      default:
        return 'bg-gray-100';
    }
  };

  const newNotifications = mockNotifications.filter(n => n.isNew);
  const oldNotifications = mockNotifications.filter(n => !n.isNew);

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
          <h2 className="text-gray-900">Thông báo</h2>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Stats */}
        {newNotifications.length > 0 && (
          <div className="flex items-center justify-between py-3 px-4 bg-orange-50 rounded-2xl border border-orange-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-gray-700">
                {newNotifications.length} thông báo mới
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-orange-600 hover:bg-orange-100 rounded-xl"
            >
              Đánh dấu đã đọc
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* New Notifications */}
        {newNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <p className="text-sm text-gray-600 mb-3 px-2">Mới</p>
            <div className="space-y-3">
              {newNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 rounded-2xl hover:shadow-md transition-shadow cursor-pointer border-2 border-orange-100">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-2xl ${getNotificationBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-gray-900">{notification.title}</p>
                          <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5">Mới</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Old Notifications */}
        {oldNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-gray-600 mb-3 px-2">Trước đó</p>
            <div className="space-y-3">
              {oldNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className="p-4 rounded-2xl hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-2xl ${getNotificationBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 mb-1">{notification.title}</p>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {mockNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <Bell className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-900 mb-2">Chưa có thông báo nào</p>
            <p className="text-sm text-gray-600 text-center mb-6">
              Các thông báo về đặt bàn và khuyến mãi<br />sẽ hiển thị tại đây
            </p>
            <Button
              onClick={() => onNavigate('home')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl"
            >
              Quay về trang chủ
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
