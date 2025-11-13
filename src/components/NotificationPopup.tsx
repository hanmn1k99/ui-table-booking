import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Gift, Clock, Info, Bell, Trash2, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'booking' | 'promotion' | 'reminder' | 'info';
  title: string;
  message: string;
  time: string;
  isNew: boolean;
}

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
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
    message: 'Bạn có lịch đặt bàn vào ngày mai lúc 19:00',
    time: '1 ngày trước',
    isNew: false,
  },
  {
    id: '4',
    type: 'info',
    title: 'Cập nhật thực đơn',
    message: 'Nhà hàng vừa bổ sung 10 món ăn mới',
    time: '2 ngày trước',
    isNew: false,
  },
  {
    id: '5',
    type: 'booking',
    title: 'Hoàn thành đặt bàn',
    message: 'Cảm ơn bạn đã sử dụng dịch vụ',
    time: '3 ngày trước',
    isNew: false,
  },
];

export function NotificationPopup({ isOpen, onClose, anchorRef }: NotificationPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  const newCount = notifications.filter(n => n.isNew).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, anchorRef]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'promotion':
        return <Gift className="w-5 h-5 text-orange-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
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

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isNew: false })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute right-6 top-16 w-[380px] max-w-[calc(100vw-3rem)] z-50"
          style={{ maxHeight: 'calc(100vh - 100px)' }}
        >
          <Card className="rounded-2xl shadow-2xl border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-white border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-gray-900">Thông báo</h3>
                  {newCount > 0 && (
                    <Badge className="bg-orange-500 text-white text-xs px-2 py-0.5">
                      {newCount}
                    </Badge>
                  )}
                </div>
                {newCount > 0 && (
                  <Button
                    onClick={markAllAsRead}
                    size="sm"
                    variant="ghost"
                    className="text-xs text-orange-600 hover:bg-orange-50 rounded-lg h-7 px-2"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Đánh dấu đã đọc
                  </Button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[500px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-6">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Bạn chưa có thông báo nào
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 hover:bg-gray-50 transition-colors group ${
                        notification.isNew ? 'bg-orange-50/30' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl ${getNotificationBgColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-gray-900">
                                {notification.title}
                              </p>
                              {notification.isNew && (
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                              )}
                            </div>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-gray-500" />
                            </button>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          
                          <p className="text-xs text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <>
                <Separator />
                <div className="p-3 bg-gray-50">
                  <button className="w-full text-sm text-orange-600 hover:text-orange-700 py-2 text-center transition-colors">
                    Xem tất cả thông báo
                  </button>
                </div>
              </>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}