import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Wallet, QrCode, CheckCircle2 } from 'lucide-react';

interface PaymentScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  bookingData?: any;
}

export function PaymentScreen({ onNavigate, bookingData }: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const depositAmount = 50000; // 50k VND deposit

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
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
          {/* Booking Info */}
          <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-orange-50 to-white border-orange-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Bàn số</p>
                <p className="text-gray-900">{bookingData?.tableNumber}</p>
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                Đặt cọc
              </Badge>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tiền đặt cọc</span>
                <span className="text-orange-600">
                  {depositAmount.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <div>
            <h3 className="text-gray-900 mb-4">Phương thức thanh toán</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card
                  className={`p-4 rounded-2xl cursor-pointer transition-all border-2 mb-3 ${
                    paymentMethod === 'card'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center">
                    <RadioGroupItem value="card" id="card" className="mr-3" />
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="card" className="cursor-pointer">
                        Thẻ tín dụng/ghi nợ
                      </Label>
                      <p className="text-xs text-gray-500">Visa, Mastercard, JCB</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card
                  className={`p-4 rounded-2xl cursor-pointer transition-all border-2 mb-3 ${
                    paymentMethod === 'momo'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setPaymentMethod('momo')}
                >
                  <div className="flex items-center">
                    <RadioGroupItem value="momo" id="momo" className="mr-3" />
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mr-3">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="momo" className="cursor-pointer">
                        Ví MoMo
                      </Label>
                      <p className="text-xs text-gray-500">Thanh toán qua ví điện tử</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card
                  className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                    paymentMethod === 'banking'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setPaymentMethod('banking')}
                >
                  <div className="flex items-center">
                    <RadioGroupItem value="banking" id="banking" className="mr-3" />
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-3">
                      <QrCode className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="banking" className="cursor-pointer">
                        Chuyển khoản ngân hàng
                      </Label>
                      <p className="text-xs text-gray-500">QR Banking, Internet Banking</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </RadioGroup>
          </div>

          {/* Card Details (show only if card is selected) */}
          {paymentMethod === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Số thẻ</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="h-12 rounded-2xl border-gray-200"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Ngày hết hạn</Label>
                  <Input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    className="h-12 rounded-2xl border-gray-200"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className="h-12 rounded-2xl border-gray-200"
                    maxLength={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Tên trên thẻ</Label>
                <Input
                  id="cardName"
                  type="text"
                  placeholder="NGUYEN VAN A"
                  className="h-12 rounded-2xl border-gray-200"
                />
              </div>
            </motion.div>
          )}

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
    </div>
  );
}
