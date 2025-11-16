import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500 text-center md:text-left">
            Copyright {new Date().getFullYear()} - Quản Lý Đặt Bàn. All rights reserved.
          </p>
          <a
            href="https://github.com/tdvuanh/quan-ly-dat-ban-nmcnpm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>tdvuanh</span>
          </a>
        </div>
      </div>
    </footer>
  );
}