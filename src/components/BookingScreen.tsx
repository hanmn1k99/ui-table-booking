import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ArrowLeft, Users } from 'lucide-react';
import { tables } from '../data/mockData';

interface BookingScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  initialData?: { tableId?: string };
}

export function BookingScreen({ onNavigate, initialData }: BookingScreenProps) {
  const [selectedTableId, setSelectedTableId] = useState(initialData?.tableId || '');

  const availableTables = tables.filter(t => t.status === 'available');
  const selectedTable = tables.find(t => t.id === selectedTableId);

  const handleConfirm = () => {
    if (!selectedTableId) return;
    
    const bookingData = {
      tableId: selectedTableId,
      tableNumber: selectedTable?.number,
      capacity: selectedTable?.capacity
    };
    onNavigate('confirmation', bookingData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-gray-900">Chọn bàn</h2>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Danh sách bàn trống</h3>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                {availableTables.length} bàn
              </Badge>
            </div>

            {availableTables.length === 0 ? (
              <Card className="p-8 text-center rounded-2xl">
                <p className="text-gray-500 mb-2">Không có bàn trống</p>
                <p className="text-sm text-gray-400">Vui lòng quay lại sau</p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {availableTables.map((table, index) => (
                  <motion.div
                    key={table.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      onClick={() => setSelectedTableId(table.id)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${
                        selectedTableId === table.id
                          ? 'border-orange-500 bg-orange-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-gray-900">{table.number}</p>
                        {selectedTableId === table.id && (
                          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {table.capacity} người
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={!selectedTableId}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Xác nhận chọn bàn
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
