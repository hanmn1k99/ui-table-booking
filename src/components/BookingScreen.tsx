import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Calendar, Clock } from 'lucide-react';
import { tables, areas, generateTimeSlots } from '../data/mockData';

interface BookingScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  initialData?: { tableId?: string };
}

export function BookingScreen({ onNavigate, initialData }: BookingScreenProps) {
  const [selectedTableId, setSelectedTableId] = useState(initialData?.tableId || '');
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1); // Default 1 hour
  const [guests, setGuests] = useState(2);

  const availableTables = tables.filter(t => t.status === 'available');
  const selectedTable = tables.find(t => t.id === selectedTableId);
  const timeSlots = generateTimeSlots();

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getMinDate() {
    return getTodayDate();
  }

  function getMaxDate() {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // Allow booking up to 30 days ahead
    return maxDate.toISOString().split('T')[0];
  }

  const handleConfirm = () => {
    if (!selectedTableId || !selectedDate || !selectedTime) return;
    
    const areaName = areas.find(a => a.id === selectedTable?.area)?.name || selectedTable?.area || '';
    
    const bookingData = {
      tableId: selectedTableId,
      tableCode: selectedTable?.code,
      capacity: selectedTable?.capacity,
      area: areaName,
      date: selectedDate,
      time: selectedTime,
      duration,
      guests
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
          <h2 className="text-gray-900">Đặt bàn</h2>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          {/* Date and Time Selection */}
          <Card className="p-6 rounded-3xl shadow-sm">
            <h3 className="text-gray-900 mb-4">Thời gian đặt bàn</h3>
            
            <div className="space-y-4">
              {/* Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  Ngày đặt
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getMinDate()}
                  max={getMaxDate()}
                  className="h-12 rounded-2xl border-gray-200"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  Giờ đặt (9:00 - 21:00)
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                    <SelectValue placeholder="Chọn giờ" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Thời gian (giờ)</Label>
                <Select value={duration.toString()} onValueChange={(v) => setDuration(Number(v))}>
                  <SelectTrigger className="h-12 rounded-2xl border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 giờ</SelectItem>
                    <SelectItem value="1.5">1.5 giờ</SelectItem>
                    <SelectItem value="2">2 giờ</SelectItem>
                    <SelectItem value="2.5">2.5 giờ</SelectItem>
                    <SelectItem value="3">3 giờ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-500" />
                  Số lượng khách
                </Label>
                <Input
                  id="guests"
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  min={1}
                  max={20}
                  className="h-12 rounded-2xl border-gray-200"
                />
              </div>
            </div>
          </Card>

          {/* Table Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Chọn bàn</h3>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                {availableTables.length} bàn trống
              </Badge>
            </div>

            {availableTables.length === 0 ? (
              <Card className="p-8 text-center rounded-2xl">
                <p className="text-gray-500 mb-2">Không có bàn trống</p>
                <p className="text-sm text-gray-400">Vui lòng chọn thời gian khác</p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {availableTables.map((table, index) => {
                  const areaName = areas.find(a => a.id === table.area)?.name || table.area;
                  return (
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
                          <div>
                            <p className="text-gray-900">{table.code}</p>
                            <p className="text-xs text-gray-500">{areaName}</p>
                          </div>
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
                  );
                })}
              </div>
            )}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={!selectedTableId || !selectedDate || !selectedTime}
            className="w-full h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Xác nhận đặt bàn
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
