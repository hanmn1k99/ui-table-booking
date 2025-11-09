import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { CheckCircle, Home, Receipt, Share2 } from 'lucide-react';

interface PaymentSuccessScreenProps {
  onNavigate: (screen: string) => void;
  paymentData?: any;
}

export function PaymentSuccessScreen({ onNavigate, paymentData }: PaymentSuccessScreenProps) {
  const bookingCode = `BK${Date.now().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString('vi-VN');
  const currentTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'card': return 'Thẻ tín dụng/ghi nợ';
      case 'momo': return 'Ví MoMo';
      case 'banking': return 'Chuyển khoản ngân hàng';
      default: return method;
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Xác nhận đặt bàn',
        text: `Mã đặt bàn: ${bookingCode}\nBàn ${paymentData?.tableNumber}\nĐã thanh toán: ${paymentData?.amount?.toLocaleString('vi-VN')}đ`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          {/* Success Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-green-600 mb-2">Đặt bàn thành công!</h2>
            <p className="text-gray-600">
              Cảm ơn bạn đã đặt bàn. Chúng tôi đã nhận được thanh toán của bạn.
            </p>
          </div>

          {/* Booking Code */}
          <Card className="p-6 rounded-3xl shadow-lg mb-4 bg-gradient-to-br from-orange-500 to-orange-600">
            <div className="text-center">
              <p className="text-sm text-white/80 mb-2">Mã đặt bàn</p>
              <p className="text-white mb-4">{bookingCode}</p>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Đã xác nhận
              </Badge>
            </div>
          </Card>

          {/* Booking Details */}
          <Card className="p-6 rounded-3xl shadow-lg mb-4">
            <div className="flex items-center mb-4">
              <Receipt className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="text-gray-900">Chi tiết đặt bàn</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Bàn số</span>
                <span className="text-gray-900">{paymentData?.tableNumber}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Sức chứa</span>
                <span className="text-gray-900">{paymentData?.capacity} người</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Ngày đặt</span>
                <span className="text-gray-900">{currentDate}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-gray-600">Giờ đặt</span>
                <span className="text-gray-900">{currentTime}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-600">Phương thức</span>
                <span className="text-gray-900">{getPaymentMethodText(paymentData?.paymentMethod)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t-2 border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-900">Đã thanh toán</span>
                <span className="text-orange-600">
                  {paymentData?.amount?.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full h-12 rounded-2xl border-2 border-gray-200 hover:bg-gray-50"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Chia sẻ
            </Button>

            <Button
              onClick={() => onNavigate('home')}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl"
            >
              <Home className="w-5 h-5 mr-2" />
              Về trang chủ
            </Button>

            <button
              onClick={() => onNavigate('profile')}
              className="w-full text-center text-sm text-gray-600 py-2"
            >
              Xem lịch sử đặt bàn
            </button>
          </div>

          {/* Info Card */}
          <Card className="mt-6 p-4 rounded-2xl bg-blue-50 border-blue-100">
            <p className="text-sm text-blue-900 mb-1">📱 Thông tin quan trọng</p>
            <p className="text-xs text-blue-700 mb-2">
              Vui lòng lưu lại mã đặt bàn <span className="font-medium">{bookingCode}</span> để xuất trình khi đến nhà hàng.
            </p>
            <p className="text-xs text-blue-700">
              Liên hệ: <span className="font-medium">1900 1234</span> nếu cần hỗ trợ.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
