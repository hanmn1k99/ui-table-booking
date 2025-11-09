import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { CheckCircle, Users, CreditCard, Home } from 'lucide-react';

interface ConfirmationScreenProps {
  onNavigate: (screen: string) => void;
  bookingData?: any;
}

export function ConfirmationScreen({ onNavigate, bookingData }: ConfirmationScreenProps) {

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
            <h2 className="text-green-600 mb-2">Đã chọn bàn thành công!</h2>
            <p className="text-gray-600">
              Vui lòng tiến hành thanh toán để hoàn tất đặt bàn
            </p>
          </div>

          {/* Booking Summary */}
          <Card className="p-6 rounded-3xl shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Thông tin bàn</h3>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                Đang chờ
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bàn số</p>
                  <p className="text-gray-900">{bookingData?.tableNumber}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <span className="text-3xl">🪑</span>
                </div>
              </div>

              <div className="flex items-start pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Sức chứa</p>
                  <p className="text-gray-900">{bookingData?.capacity} người</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('payment', bookingData)}
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-200"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Tiến hành thanh toán
            </Button>

            <Button
              onClick={() => onNavigate('home')}
              variant="outline"
              className="w-full h-12 rounded-2xl border-2 border-gray-200 hover:bg-gray-50"
            >
              <Home className="w-5 h-5 mr-2" />
              Về trang chủ
            </Button>
          </div>

          {/* Note */}
          <Card className="mt-6 p-4 rounded-2xl bg-blue-50 border-blue-100">
            <p className="text-sm text-blue-900 mb-1">💡 Lưu ý</p>
            <p className="text-xs text-blue-700">
              Bàn sẽ được giữ trong 10 phút. Vui lòng thanh toán để xác nhận đặt bàn.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
