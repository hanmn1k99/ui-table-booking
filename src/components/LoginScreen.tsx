import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Users, UserCog } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (role: 'customer' | 'admin') => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-center">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
          <span className="text-2xl">🍽️</span>
        </div>
        <span className="ml-3 text-orange-600">Quản Lý Đặt Bàn</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-12">
            <h1 className="text-gray-900 mb-2">Kính Chào Quý Khách</h1>
            <p className="text-gray-600">
              Chọn vai trò để tiếp tục
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                onClick={() => onLogin('customer')}
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
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={() => onLogin('admin')}
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
    </div>
  );
}