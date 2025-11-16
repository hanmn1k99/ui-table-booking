import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { BookingScreen } from './components/BookingScreen';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { PaymentSuccessScreen } from './components/PaymentSuccessScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { TableMapScreen } from './components/TableMapScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { LogoPage } from './components/LogoPage';
import { NotificationScreen } from './components/NotificationScreen';
import { setFavicon, setDocumentTitle } from './utils/favicon';
import { NotificationProvider } from './context/NotificationContext';

type Screen = 
  | 'splash' 
  | 'login' 
  | 'home' 
  | 'booking' 
  | 'confirmation'
  | 'payment'
  | 'paymentSuccess'
  | 'profile' 
  | 'tableMap'
  | 'admin'
  | 'logo'
  | 'notifications';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [bookingData, setBookingData] = useState<any>(null);
  const [userRole, setUserRole] = useState<'guest' | 'staff'>('guest');

  // Set favicon and title on mount
  useEffect(() => {
    setFavicon();
    setDocumentTitle('Quản Lý Đặt Bàn - Dễ dàng & Nhanh chóng');
  }, []);

  const handleNavigate = (screen: Screen, data?: any) => {
    setCurrentScreen(screen);
    if (data) {
      setBookingData(data);
    }
  };

  const handleLogin = (role: 'guest' | 'staff') => {
    setUserRole(role);
    if (role === 'staff') {
      setCurrentScreen('admin');
    } else {
      setCurrentScreen('home');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={() => setCurrentScreen('login')} />;
      
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      
      case 'booking':
        return (
          <BookingScreen 
            onNavigate={handleNavigate} 
            initialData={bookingData}
          />
        );
      
      case 'confirmation':
        return (
          <ConfirmationScreen 
            onNavigate={handleNavigate} 
            bookingData={bookingData}
          />
        );
      
      case 'payment':
        return (
          <PaymentScreen 
            onNavigate={handleNavigate} 
            bookingData={bookingData}
          />
        );
      
      case 'paymentSuccess':
        return (
          <PaymentSuccessScreen 
            onNavigate={handleNavigate} 
            paymentData={bookingData}
          />
        );
      
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      
      case 'tableMap':
        return (
          <TableMapScreen 
            onNavigate={handleNavigate}
            initialArea={bookingData?.area}
          />
        );
      
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      
      case 'logo':
        return <LogoPage onNavigate={handleNavigate} />;
      
      case 'notifications':
        return <NotificationScreen onNavigate={handleNavigate} />;
      
      default:
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NotificationProvider>
        {renderScreen()}
      </NotificationProvider>
    </div>
  );
}