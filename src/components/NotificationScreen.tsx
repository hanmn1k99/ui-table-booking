import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, Gift, Clock, Info, Bell, Trash2, UtensilsCrossed } from 'lucide-react';
import { notifications as mockNotifications } from '../data/mockData';

interface NotificationScreenProps {
  onNavigate: (screen: string) => void;
}

export function NotificationScreen({ onNavigate }: NotificationScreenProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'promotion':
        return <Gift className="w-6 h-6 text-orange-600" />;
      case 'menu':
        return <UtensilsCrossed className="w-6 h-6 text-purple-600" />;
      case 'system':
        return <Info className="w-6 h-6 text-blue-600" />;
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
      case 'menu':
        return 'bg-purple-100';
      case 'system':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else if (diffDays === 1) {
      return '1 ngày trước';
    } else {
      return `${diffDays} ngày trước`;
    }
  };

  const newNotifications = mockNotifications.filter(n => !n.read);
  const oldNotifications = mockNotifications.filter(n => n.read);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 flex flex-col">
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
                        <p className="text-xs text-gray-400">{formatTime(notification.timestamp)}</p>
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
                        <p className="text-xs text-gray-400">{formatTime(notification.timestamp)}</p>
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