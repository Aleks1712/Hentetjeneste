import { Home, Bell, MessageCircle, User, CheckSquare, BarChart3 } from 'lucide-react';
import { Language, useTranslation } from '../translations/translations';

interface BottomNavigationProps {
  role: 'parent' | 'staff';
  activeTab: string;
  onTabChange: (tab: string) => void;
  darkMode?: boolean;
  language?: Language;
}

export function BottomNavigation({ role, activeTab, onTabChange, darkMode = false, language = 'no' }: BottomNavigationProps) {
  const t = useTranslation(language);
  
  const parentTabs = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'notifications', label: t.notifications, icon: Bell },
    { id: 'chat', label: t.chat, icon: MessageCircle },
    { id: 'profile', label: t.profile, icon: User },
  ];

  const staffTabs = [
    { id: 'checklist', label: t.checklist, icon: CheckSquare },
    { id: 'stats', label: t.statistics, icon: BarChart3 },
    { id: 'chat', label: t.chat, icon: MessageCircle },
    { id: 'profile', label: t.profile, icon: User },
  ];

  const tabs = role === 'parent' ? parentTabs : staffTabs;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 border-t safe-area-bottom z-50 transition-colors ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-md mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
                  isActive
                    ? role === 'parent'
                      ? 'text-purple-600'
                      : 'text-blue-600'
                    : darkMode 
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}