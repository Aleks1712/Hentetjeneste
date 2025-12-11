import { useState, useEffect, useRef } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { ParentView } from './components/ParentView';
import { StaffView } from './components/StaffView';
import { BottomNavigation } from './components/BottomNavigation';
import { NotificationsTab } from './components/NotificationsTab';
import { ProfileTab } from './components/ProfileTab';
import { ChatModal } from './components/ChatModal';
import { InstallPWA } from './components/InstallPWA';
import { Language } from './translations/translations';
import { Toaster } from 'sonner';
import { authService, supabase } from './services/supabase';

type UserRole = 'parent' | 'staff';
type AppState = 'login' | 'onboarding' | 'main';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('parent');
  const [appState, setAppState] = useState<AppState>('login');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [showChat, setShowChat] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('no');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const authInitialized = useRef(false);
  const isHandlingAuthChange = useRef(false);

  // Check for existing session on mount/refresh
  useEffect(() => {
    // Prevent multiple initializations
    if (authInitialized.current) return;
    authInitialized.current = true;

    const checkAuth = async () => {
      try {
        const session = await authService.getSession();
        if (session) {
          // User is logged in, go directly to main app
          setAppState('main');
        } else {
          // No session, show login screen
          setAppState('login');
        }
      } catch (error) {
        // If Supabase is not configured or error, use demo mode
        console.log('Supabase not configured, using demo mode');
        setAppState('login');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();

    // Listen for auth state changes - but ignore TOKEN_REFRESH to prevent loops
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Prevent handling auth changes while already handling one
      if (isHandlingAuthChange.current) return;
      
      // Ignore TOKEN_REFRESH events - these happen automatically and shouldn't change UI
      if (event === 'TOKEN_REFRESHED') {
        return;
      }

      isHandlingAuthChange.current = true;
      
      // Only update state if it actually needs to change
      setAppState((currentState) => {
        if (session && currentState !== 'main' && currentState !== 'onboarding') {
          return 'main';
        } else if (!session && currentState !== 'login') {
          return 'login';
        }
        return currentState;
      });

      // Reset flag after a short delay to allow state updates
      setTimeout(() => {
        isHandlingAuthChange.current = false;
      }, 100);
    });

    return () => {
      subscription.unsubscribe();
      authInitialized.current = false;
    };
  }, []);

  const handleLogin = () => {
    setAppState('onboarding');
  };

  const handleLoadDemo = () => {
    setAppState('main');
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setAppState('login');
  };

  // Show loading screen while checking auth
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Laster inn...</p>
        </div>
      </div>
    );
  }

  // Show login screen
  if (appState === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Show onboarding screen
  if (appState === 'onboarding') {
    return <OnboardingScreen onLoadDemo={handleLoadDemo} onLogout={handleLogout} />;
  }

  // Determine active tab label based on role
  const getActiveTabLabel = () => {
    if (currentRole === 'parent') {
      if (activeTab === 'home') return 'home';
      if (activeTab === 'checklist') return 'home'; // Parent doesn't have checklist
      return activeTab;
    } else {
      if (activeTab === 'home') return 'checklist'; // Staff sees checklist instead
      if (activeTab === 'stats') return 'stats';
      return activeTab;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'chat') {
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  };

  const renderContent = () => {
    const currentTab = getActiveTabLabel();
    
    if (currentTab === 'notifications') {
      return <NotificationsTab role={currentRole} darkMode={darkMode} language={language} />;
    }
    if (currentTab === 'profile') {
      return <ProfileTab role={currentRole} onRoleToggle={() => setCurrentRole(currentRole === 'parent' ? 'staff' : 'parent')} darkMode={darkMode} onDarkModeToggle={setDarkMode} language={language} onLanguageChange={setLanguage} />;
    }
    if (currentTab === 'home') {
      return <ParentView darkMode={darkMode} language={language} />;
    }
    if (currentTab === 'checklist') {
      return <StaffView viewType="checklist" darkMode={darkMode} language={language} />;
    }
    if (currentTab === 'stats') {
      return <StaffView viewType="stats" darkMode={darkMode} language={language} />;
    }
    
    return <ParentView darkMode={darkMode} language={language} />;
  };

  // Show main app
  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Toaster position="top-center" richColors />
      
      {/* Header */}
      <header className={`border-b sticky top-0 z-20 transition-colors ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${
                currentRole === 'parent' 
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
                  : 'bg-gradient-to-br from-blue-500 to-blue-600'
              } rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className={`text-lg sm:text-xl font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hentetjeneste</h1>
                <p className={`text-xs sm:text-sm truncate ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                  {currentRole === 'parent' ? 'Forelder-modus' : 'Ansatt-modus'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
        {renderContent()}
      </main>

      <BottomNavigation 
        role={currentRole}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        darkMode={darkMode}
        language={language}
      />

      {showChat && (
        <ChatModal
          childName="Emma Nordmann"
          onClose={() => {
            setShowChat(false);
            setActiveTab('home');
          }}
        />
      )}

      {/* PWA Install Banner */}
      <InstallPWA />
    </div>
  );
}
