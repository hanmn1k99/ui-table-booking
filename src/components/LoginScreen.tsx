import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Users, UserCog } from 'lucide-react';
import { Footer } from './Footer';

interface LoginScreenProps {
  onLogin: (role: 'guest' | 'staff') => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col px-6 py-8">
      {/* Logo - Top Left */}
      <div className="flex items-center mb-12">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">🍽️</span>
        </div>
        <span className="ml-3 text-orange-600">Quản Lý Đặt Bàn</span>
      </div>

      {/* Login Options - Centered */}
      <div className="flex-1 flex items-center justify-center pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-12">
            <h1 className="text-gray-900 mb-2">Quản Lý Đặt Bàn</h1>
            <p className="text-gray-600">
              Chọn vai trò để tiếp tục
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={() => onLogin('guest')}
                className="w-full h-20 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-200 flex items-center justify-start px-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white mb-1">Khách hàng</p>
                  <p className="text-sm text-white/80">Đặt bàn & xem menu</p>
                </div>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={() => onLogin('staff')}
                variant="outline"
                className="w-full h-20 rounded-2xl border-2 border-orange-200 hover:bg-orange-50 flex items-center justify-start px-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mr-4">
                  <UserCog className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 mb-1">Nhân viên</p>
                  <p className="text-sm text-gray-600">Quản lý đặt bàn</p>
                </div>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer - Bottom */}
      <Footer />
    </div>
  );
}