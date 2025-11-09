import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ArrowLeft, List } from 'lucide-react';
import { tables, areas } from '../data/mockData';

interface TableMapScreenProps {
  onNavigate: (screen: string) => void;
  initialArea?: string;
}

export function TableMapScreen({ onNavigate, initialArea }: TableMapScreenProps) {
  const [selectedArea, setSelectedArea] = useState(initialArea || 'floor1');

  const areaTables = tables.filter(t => t.area === selectedArea);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600';
      case 'booked':
        return 'bg-orange-500 hover:bg-orange-600';
      case 'serving':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'cleaning':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Trống';
      case 'booked': return 'Đã đặt';
      case 'serving': return 'Phục vụ';
      case 'cleaning': return 'Dọn dẹp';
      default: return status;
    }
  };

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
          <h2 className="text-gray-900">Sơ đồ bàn</h2>
          <button
            onClick={() => onNavigate('home')}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <List className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Area Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedArea(area.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-2xl transition-all flex items-center gap-2 ${
                selectedArea === area.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <span>{area.icon}</span>
              <span>{area.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-600">Trống</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-gray-600">Đã đặt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-600">Phục vụ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-xs text-gray-600">Dọn dẹp</span>
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="relative w-full min-h-[500px] bg-white rounded-3xl shadow-lg p-8 border-2 border-gray-100">
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-2 border-orange-200 rounded-lg"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-2 border-orange-200 rounded-lg"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-orange-200 rounded-lg"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-orange-200 rounded-lg"></div>

          {/* Area label */}
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm">
              {areas.find(a => a.id === selectedArea)?.icon}{' '}
              {areas.find(a => a.id === selectedArea)?.name}
            </p>
          </div>

          {/* Tables - Simple grid layout */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {areaTables.map((table, index) => (
              <motion.div
                key={table.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center"
              >
                <button
                  onClick={() => {
                    if (table.status === 'available') {
                      onNavigate('booking', { tableId: table.id });
                    }
                  }}
                  className={`w-20 h-20 rounded-2xl ${getStatusColor(table.status)} text-white shadow-lg transition-all transform hover:scale-110 flex flex-col items-center justify-center ${
                    table.status !== 'available' ? 'cursor-not-allowed opacity-75' : ''
                  }`}
                >
                  <span className="text-lg mb-1">🪑</span>
                  <span className="text-xs">{table.number}</span>
                </button>
                <div className="mt-2 text-center">
                  <p className="text-xs text-gray-600">{table.capacity} người</p>
                  <Badge
                    variant="outline"
                    className="text-xs mt-1 border-gray-200"
                  >
                    {getStatusText(table.status)}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {areaTables.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">Không có bàn trong khu vực này</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="bg-white border-t border-gray-100 px-6 py-4">
        <Button
          onClick={() => onNavigate('booking')}
          className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl"
        >
          Đặt bàn ngay
        </Button>
      </div>
    </div>
  );
}
