import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, ArrowLeft } from 'lucide-react';

interface LogoPageProps {
  onNavigate: (screen: string) => void;
}

export function LogoPage({ onNavigate }: LogoPageProps) {
  // Draw rounded rectangle
  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Download icon logo
  const downloadIconLogo = (size: number, filename: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#f97316');
    gradient.addColorStop(1, '#ea580c');
    
    // Draw rounded rectangle background
    const radius = size * 0.2;
    ctx.fillStyle = gradient;
    drawRoundedRect(ctx, 0, 0, size, size, radius);
    ctx.fill();

    // Add emoji text
    ctx.font = `${size * 0.5}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍽️', size / 2, size / 2);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    }, 'image/png', 1);
  };

  // Download horizontal logo
  const downloadHorizontalLogo = (width: number, height: number, filename: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Icon size and position
    const iconSize = height * 0.7;
    const iconX = width * 0.15;
    const iconY = (height - iconSize) / 2;

    // Create gradient for icon
    const gradient = ctx.createLinearGradient(iconX, iconY, iconX + iconSize, iconY + iconSize);
    gradient.addColorStop(0, '#f97316');
    gradient.addColorStop(1, '#ea580c');
    
    // Draw icon background
    const radius = iconSize * 0.2;
    ctx.fillStyle = gradient;
    drawRoundedRect(ctx, iconX, iconY, iconSize, iconSize, radius);
    ctx.fill();

    // Add emoji to icon
    ctx.font = `${iconSize * 0.5}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍽️', iconX + iconSize / 2, iconY + iconSize / 2);

    // Add text
    const textX = iconX + iconSize + width * 0.05;
    const textY = height / 2;
    
    ctx.fillStyle = '#ea580c';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = `bold ${height * 0.2}px Arial, sans-serif`;
    ctx.fillText('Nhà Hàng Gì Cũng Được', textX, textY);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    }, 'image/png', 1);
  };

  // Download full logo with tagline
  const downloadFullLogo = (width: number, height: number, filename: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Transparent or white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Icon size and position (centered)
    const iconSize = height * 0.4;
    const iconX = (width - iconSize) / 2;
    const iconY = height * 0.15;

    // Create gradient for icon
    const gradient = ctx.createLinearGradient(iconX, iconY, iconX + iconSize, iconY + iconSize);
    gradient.addColorStop(0, '#f97316');
    gradient.addColorStop(1, '#ea580c');
    
    // Draw icon background
    const radius = iconSize * 0.2;
    ctx.fillStyle = gradient;
    drawRoundedRect(ctx, iconX, iconY, iconSize, iconSize, radius);
    ctx.fill();

    // Add emoji to icon
    ctx.font = `${iconSize * 0.5}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍽️', iconX + iconSize / 2, iconY + iconSize / 2);

    // Add main text
    ctx.fillStyle = '#ea580c';
    ctx.textAlign = 'center';
    ctx.font = `bold ${height * 0.08}px Arial, sans-serif`;
    ctx.fillText('Nhà Hàng Gì Cũng Được', width / 2, iconY + iconSize + height * 0.1);

    // Add tagline
    ctx.fillStyle = '#6b7280';
    ctx.font = `${height * 0.05}px Arial, sans-serif`;
    ctx.fillText('Đặt bàn nhanh – Ăn ngon trọn vị', width / 2, iconY + iconSize + height * 0.18);

    // Download
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(blob);
      link.click();
      URL.revokeObjectURL(link.href);
    }, 'image/png', 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại
        </Button>
        <h1 className="text-gray-900">Logo & Brand Assets</h1>
        <div className="w-24"></div>
      </div>

      <div className="px-6 py-8 max-w-6xl mx-auto">
        {/* Main Logo - Hero Section */}
        <Card className="p-12 rounded-3xl bg-gradient-to-br from-white to-orange-50 border-2 border-orange-100 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">Logo chính</p>
              <Button
                onClick={() => downloadFullLogo(1024, 512, 'nha-hang-gi-cung-duoc-main')}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Tải xuống
              </Button>
            </div>
            <div id="main-logo" className="flex flex-col items-center justify-center mb-8">
              <div className="w-40 h-40 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[40px] flex items-center justify-center shadow-2xl mb-6">
                <span className="text-8xl">🍽️</span>
              </div>
              <h2 className="text-orange-600 mb-2">Nhà Hàng Gì Cũng Được</h2>
              <p className="text-gray-600">Đặt bàn nhanh – Ăn ngon trọn vị</p>
            </div>
          </div>
        </Card>

        {/* Logo Variations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Icon Only - Large */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Icon lớn</p>
              <Button
                onClick={() => downloadIconLogo(512, 'nha-hang-icon-large')}
                size="sm"
                variant="outline"
                className="rounded-xl"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div id="icon-large" className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[32px] flex items-center justify-center shadow-xl">
                <span className="text-7xl">🍽️</span>
              </div>
            </div>
          </Card>

          {/* Horizontal Logo */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Logo ngang</p>
              <Button
                onClick={() => downloadHorizontalLogo(1024, 512, 'nha-hang-horizontal')}
                size="sm"
                variant="outline"
                className="rounded-xl"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div id="logo-horizontal" className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 flex items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[20px] flex items-center justify-center shadow-lg">
                  <span className="text-5xl">🍽️</span>
                </div>
                <div className="text-left">
                  <p className="text-orange-600">Nhà Hàng</p>
                  <p className="text-orange-600">Gì Cũng Được</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Dark Background Version */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Nền tối</p>
              <Button
                onClick={() => downloadHorizontalLogo(1024, 256, 'nha-hang-dark.png')}
                size="sm"
                variant="outline"
                className="rounded-xl"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div id="logo-dark" className="bg-gray-900 rounded-2xl p-8 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[16px] flex items-center justify-center shadow-lg">
                  <span className="text-4xl">🍽️</span>
                </div>
                <span className="text-white">Nhà Hàng Gì Cũng Được</span>
              </div>
            </div>
          </Card>

          {/* Small Icon */}
          <Card className="p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Icon nhỏ (App Icon)</p>
              <Button
                onClick={() => downloadIconLogo(256, 'nha-hang-app-icon.png')}
                size="sm"
                variant="outline"
                className="rounded-xl"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <div id="icon-small" className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🍽️</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-2xl">🍽️</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-xl">🍽️</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Compact Versions */}
        <Card className="p-8 rounded-2xl mb-8">
          <p className="text-sm text-gray-600 mb-6">Các kích thước sử dụng</p>
          <div className="space-y-6">
            {/* Extra Large */}
            <div className="flex items-center justify-center py-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[24px] flex items-center justify-center shadow-xl">
                  <span className="text-6xl">🍽️</span>
                </div>
                <div>
                  <h2 className="text-orange-600">Nhà Hàng Gì Cũng Được</h2>
                  <p className="text-sm text-gray-600">Đặt bàn nhanh – Ăn ngon trọn vị</p>
                </div>
              </div>
            </div>

            {/* Large */}
            <div className="flex items-center justify-center py-4 bg-white rounded-2xl border-2 border-orange-100">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-[16px] flex items-center justify-center shadow-lg">
                  <span className="text-4xl">🍽️</span>
                </div>
                <span className="text-orange-600">Nhà Hàng Gì Cũng Được</span>
              </div>
            </div>

            {/* Medium */}
            <div className="flex items-center justify-center py-3 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-3xl">🍽️</span>
                </div>
                <span className="text-orange-600">Nhà Hàng Gì Cũng Được</span>
              </div>
            </div>

            {/* Small */}
            <div className="flex items-center justify-center py-2 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
                <span className="text-sm text-orange-600">Nhà Hàng Gì Cũng Được</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Color Palette */}
        <Card className="p-8 rounded-2xl mb-8">
          <p className="text-sm text-gray-600 mb-6">Bảng màu thương hiệu</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="w-full h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg mb-3"></div>
              <p className="text-xs text-gray-900 mb-1">Primary Gradient</p>
              <p className="text-xs text-gray-500">#FF8A00 → #FF6B00</p>
            </div>
            <div>
              <div className="w-full h-24 bg-orange-600 rounded-2xl shadow-lg mb-3"></div>
              <p className="text-xs text-gray-900 mb-1">Orange 600</p>
              <p className="text-xs text-gray-500">#FF8A00</p>
            </div>
            <div>
              <div className="w-full h-24 bg-orange-50 rounded-2xl border-2 border-orange-100 mb-3"></div>
              <p className="text-xs text-gray-900 mb-1">Orange 50</p>
              <p className="text-xs text-gray-500">#FFF7ED</p>
            </div>
            <div>
              <div className="w-full h-24 bg-white rounded-2xl border-2 border-gray-200 mb-3"></div>
              <p className="text-xs text-gray-900 mb-1">White</p>
              <p className="text-xs text-gray-500">#FFFFFF</p>
            </div>
          </div>
        </Card>

        {/* Usage Guidelines */}
        <Card className="p-8 rounded-2xl">
          <p className="text-sm text-gray-600 mb-6">Hướng dẫn sử dụng</p>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600">✓</span>
              </div>
              <div>
                <p className="mb-1">Luôn giữ tỷ lệ gốc của logo, không kéo dãn hoặc méo hình</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600">✓</span>
              </div>
              <div>
                <p className="mb-1">Sử dụng gradient cam chính thức (#FF8A00 → #FF6B00)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600">✓</span>
              </div>
              <div>
                <p className="mb-1">Đảm bảo khoảng trống tối thiểu xung quanh logo</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600">✗</span>
              </div>
              <div>
                <p className="mb-1">Không thay đổi màu sắc hoặc thêm hiệu ứng không được phê duyệt</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-red-600">✗</span>
              </div>
              <div>
                <p className="mb-1">Không xoay logo hoặc đặt ở góc nghiêng</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Download Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Để lưu logo, nhấn giữ (long press) vào logo và chọn "Lưu hình ảnh"
          </p>
          <p className="text-xs text-gray-500">
            hoặc chụp màn hình (screenshot) trang này
          </p>
        </div>
      </div>
    </div>
  );
}