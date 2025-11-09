import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { motion } from 'motion/react';
import { Plus, Trash2, User, Users, Bell } from 'lucide-react';
import { areas } from '../data/mockData';
import type { Table } from '../data/mockData';

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [tables, setTables] = useState<Table[]>([
    { id: 't1', number: 'B01', capacity: 2, area: 'main', status: 'available', x: 50, y: 50 },
    { id: 't2', number: 'B02', capacity: 2, area: 'main', status: 'serving', x: 150, y: 50 },
    { id: 't3', number: 'B03', capacity: 4, area: 'main', status: 'available', x: 250, y: 50 },
    { id: 't4', number: 'B04', capacity: 4, area: 'main', status: 'booked', x: 50, y: 150 },
    { id: 't5', number: 'B05', capacity: 6, area: 'main', status: 'available', x: 150, y: 150 },
    { id: 't6', number: 'B06', capacity: 8, area: 'main', status: 'available', x: 250, y: 150 },
    { id: 't7', number: 'B07', capacity: 2, area: 'main', status: 'available', x: 50, y: 50 },
    { id: 't8', number: 'B08', capacity: 4, area: 'main', status: 'available', x: 150, y: 50 },
    { id: 't9', number: 'B09', capacity: 4, area: 'main', status: 'serving', x: 250, y: 50 },
    { id: 't10', number: 'B10', capacity: 6, area: 'main', status: 'available', x: 150, y: 150 },
    { id: 't11', number: 'B11', capacity: 4, area: 'main', status: 'available', x: 50, y: 50 },
    { id: 't12', number: 'B12', capacity: 4, area: 'main', status: 'available', x: 150, y: 50 },
    { id: 't13', number: 'B13', capacity: 6, area: 'main', status: 'booked', x: 250, y: 50 },
    { id: 't14', number: 'V01', capacity: 10, area: 'main', status: 'available', x: 100, y: 100 },
    { id: 't15', number: 'V02', capacity: 12, area: 'main', status: 'available', x: 250, y: 100 },
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTable, setNewTable] = useState({
    number: '',
    capacity: 2,
    area: 'main',
    status: 'available' as Table['status']
  });

  const availableTables = tables.filter(t => t.status === 'available').length;
  const servingTables = tables.filter(t => t.status === 'serving').length;
  const bookedTables = tables.filter(t => t.status === 'booked').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'booked':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'serving':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cleaning':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
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

  const handleChangeStatus = (tableId: string, newStatus: Table['status']) => {
    setTables(tables.map(t => 
      t.id === tableId ? { ...t, status: newStatus } : t
    ));
  };

  const handleAddTable = () => {
    if (!newTable.number.trim()) return;
    
    const newId = `t${Date.now()}`;
    const table: Table = {
      id: newId,
      number: newTable.number,
      capacity: newTable.capacity,
      area: newTable.area,
      status: newTable.status,
      x: 100,
      y: 100
    };
    
    setTables([...tables, table]);
    setNewTable({ number: '', capacity: 2, area: 'main', status: 'available' });
    setIsAddDialogOpen(false);
  };

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter(t => t.id !== tableId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <div className="ml-3">
              <h2 className="text-white">Admin Dashboard</h2>
              <p className="text-xs text-white/80">Quản lý nhà hàng</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl text-white mb-1">{tables.length}</p>
            <p className="text-xs text-white/80">Tổng bàn</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl text-white mb-1">{availableTables}</p>
            <p className="text-xs text-white/80">Trống</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl text-white mb-1">{servingTables}</p>
            <p className="text-xs text-white/80">Phục vụ</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center">
            <p className="text-2xl text-white mb-1">{bookedTables}</p>
            <p className="text-xs text-white/80">Đã đặt</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* Add Table Button */}
        <div className="mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl shadow-lg shadow-orange-200">
                <Plus className="w-5 h-5 mr-2" />
                Thêm bàn mới
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle>Thêm bàn mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tableNumber">Số bàn</Label>
                  <Input
                    id="tableNumber"
                    placeholder="Ví dụ: B07, V03"
                    value={newTable.number}
                    onChange={(e) => setNewTable({ ...newTable, number: e.target.value })}
                    className="h-12 rounded-2xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="capacity">Sức chứa</Label>
                  <Select
                    value={String(newTable.capacity)}
                    onValueChange={(value) => setNewTable({ ...newTable, capacity: Number(value) })}
                  >
                    <SelectTrigger className="h-12 rounded-2xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 người</SelectItem>
                      <SelectItem value="4">4 người</SelectItem>
                      <SelectItem value="6">6 người</SelectItem>
                      <SelectItem value="8">8 người</SelectItem>
                      <SelectItem value="10">10 người</SelectItem>
                      <SelectItem value="12">12 người</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1 h-12 rounded-2xl"
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleAddTable}
                  disabled={!newTable.number.trim()}
                  className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl"
                >
                  Thêm bàn
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tables List */}
        <div>
          <h3 className="text-gray-900 mb-4">Danh sách bàn ({tables.length})</h3>
          <div className="grid grid-cols-2 gap-3">
            {tables.map((table, index) => (
              <motion.div
                key={table.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                      <Card className="p-4 rounded-2xl">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-gray-900 mb-1">{table.number}</p>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="w-4 h-4 mr-1" />
                              {table.capacity} người
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs rounded-full px-2 py-1 ${getStatusColor(table.status)}`}
                          >
                            {getStatusText(table.status)}
                          </Badge>
                        </div>
                        
                        {/* Status Change Buttons */}
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            {table.status !== 'available' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleChangeStatus(table.id, 'available')}
                                className="text-xs rounded-xl"
                              >
                                Đặt trống
                              </Button>
                            )}
                            {table.status !== 'serving' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleChangeStatus(table.id, 'serving')}
                                className="text-xs rounded-xl"
                              >
                                Phục vụ
                              </Button>
                            )}
                            {table.status !== 'booked' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleChangeStatus(table.id, 'booked')}
                                className="text-xs rounded-xl"
                              >
                                Đã đặt
                              </Button>
                            )}
                          </div>
                          
                          {/* Delete Button */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full text-xs rounded-xl text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Xóa bàn
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="rounded-3xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Xác nhận xóa bàn</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bạn có chắc muốn xóa bàn {table.number}? Hành động này không thể hoàn tác.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-2xl">Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteTable(table.id)}
                                  className="rounded-2xl bg-red-600 hover:bg-red-700"
                                >
                                  Xóa
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
