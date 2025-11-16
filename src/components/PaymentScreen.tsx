import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Wallet, QrCode, CheckCircle2, User, Phone, Calendar, Users, MapPin, Clock } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { Footer } from './Footer';

interface PaymentScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  bookingData?: any;
}

export function PaymentScreen({ onNavigate, bookingData }: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState('banking');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showSuccess } = useNotification();

  const depositAmount = 50000; // 50k VND deposit

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      showSuccess('Đặt bàn thành công!', `Bàn ${bookingData?.tableCode} đã được đặt`);
      
      // Navigate to success screen after 1.5s
      setTimeout(() => {
        onNavigate('paymentSuccess', {
          ...bookingData,
          amount: depositAmount,
          paymentMethod
        });
      }, 1500);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-green-600 mb-2">Thanh toán thành công!</h2>
          <p className="text-gray-600">Đang chuyển hướng...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('confirmation', bookingData)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            disabled={isProcessing}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-gray-900">Thanh toán</h2>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto space-y-6"
        >
          {/* Booking Summary */}
          <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-orange-50 to-white border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Thông tin đặt bàn</h3>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                Đặt cọc
              </Badge>
            </div>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <p className="text-xs text-gray-600">Mã bàn</p>
                </div>
                <p className="text-gray-900">{bookingData?.tableCode}</p>
              </div>
              
              <div className="p-3 bg-white rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <p className="text-xs text-gray-600">Khu vực</p>
                </div>
                <p className="text-gray-900">{bookingData?.area}</p>
              </div>
              
              <div className="p-3 bg-white rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <p className="text-xs text-gray-600">Ngày đặt</p>
                </div>
                <p className="text-gray-900">{bookingData?.date}</p>
              </div>
              
              <div className="p-3 bg-white rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <p className="text-xs text-gray-600">Giờ đặt</p>
                </div>
                <p className="text-gray-900">{bookingData?.time}</p>
              </div>
              
              <div className="p-3 bg-white rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-orange-500" />
                  <p className="text-xs text-gray-600">Số khách</p>
                </div>
                <p className="text-gray-900">{bookingData?.guests} người</p>
              </div>
              
              <div className="p-3 bg-white rounded-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-orange-500" />
                  <p className="text-xs text-gray-600">Thời gian</p>
                </div>
                <p className="text-gray-900">{bookingData?.duration} giờ</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-orange-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Tiền đặt cọc</span>
                <span className="text-orange-600">
                  {depositAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <div>
            <h3 className="text-gray-900 mb-4">Phương thức thanh toán</h3>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 rounded-2xl border-2 border-orange-500 bg-orange-50">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-3">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">Chuyển khoản ngân hàng</p>
                    <p className="text-xs text-gray-500">QR Banking, Internet Banking</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Payment Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-200 disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Đang xử lý...
              </div>
            ) : (
              <>Thanh toán {depositAmount.toLocaleString('vi-VN')}đ</>
            )}
          </Button>

          {/* Security Note */}
          <Card className="p-4 rounded-2xl bg-green-50 border-green-100">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-green-900 mb-1">Thanh toán an toàn</p>
                <p className="text-xs text-green-700">
                  Thông tin của bạn được mã hóa và bảo mật theo tiêu chuẩn PCI DSS
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="bg-white px-6 py-4">
        <Footer />
      </div>
    </div>
  );
}