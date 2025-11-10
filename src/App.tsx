import { useState } from 'react';
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
  | 'logo';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userRole, setUserRole] = useState<'customer' | 'admin' | null>(null);
  const [navigationData, setNavigationData] = useState<any>(null);

  const handleNavigate = (screen: string, data?: any) => {
    setCurrentScreen(screen as Screen);
    setNavigationData(data);
  };

  const handleLogin = (role: 'customer' | 'admin') => {
    setUserRole(role);
    if (role === 'admin') {
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
            initialData={navigationData}
          />
        );
      
      case 'confirmation':
        return (
          <ConfirmationScreen 
            onNavigate={handleNavigate} 
            bookingData={navigationData}
          />
        );
      
      case 'payment':
        return (
          <PaymentScreen 
            onNavigate={handleNavigate} 
            bookingData={navigationData}
          />
        );
      
      case 'paymentSuccess':
        return (
          <PaymentSuccessScreen 
            onNavigate={handleNavigate} 
            paymentData={navigationData}
          />
        );
      
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      
      case 'tableMap':
        return (
          <TableMapScreen 
            onNavigate={handleNavigate}
            initialArea={navigationData?.area}
          />
        );
      
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      
      case 'logo':
        return <LogoPage onNavigate={handleNavigate} />;
      
      default:
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderScreen()}
    </div>
  );
}