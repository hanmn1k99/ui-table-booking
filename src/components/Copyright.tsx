export function Copyright() {
  return (
    <div className="text-center text-sm text-gray-500 py-4">
      Copyright {new Date().getFullYear()} -{' '}
      <a
        href="https://github.com/tdvuanh/quan-ly-dat-ban-nmcnpm"
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-600 hover:text-orange-700 hover:underline"
      >
        tdvuanh
      </a>
    </div>
  );
}
