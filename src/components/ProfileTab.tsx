import { User, Settings, Bell, Lock, Globe, LogOut, ArrowLeftRight, Info, ChevronRight, Moon, Shield, Key } from 'lucide-react';
import { useState } from 'react';
import { ValueProposition } from './ValueProposition';
import { QRCodeShare } from './QRCodeShare';
import { ChangePassword } from './ChangePassword';
import { PrivacySettings } from './PrivacySettings';
import { Language, useTranslation } from '../translations/translations';

interface ProfileTabProps {
  role: 'parent' | 'staff';
  onRoleToggle: () => void;
  darkMode: boolean;
  onDarkModeToggle: (value: boolean) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function ProfileTab({ role, onRoleToggle, darkMode, onDarkModeToggle, language, onLanguageChange }: ProfileTabProps) {
  const [showValueProp, setShowValueProp] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  
  const t = useTranslation(language);
  
  const languageNames: { [key: string]: string } = {
    'no': 'Norsk',
    'en': 'English',
    'sv': 'Svenska',
    'da': 'Dansk',
    'fi': 'Suomi',
    'de': 'Deutsch',
    'fr': 'Français',
    'es': 'Español',
    'pl': 'Polski',
    'ar': 'العربية',
    'so': 'Soomaali',
    'ur': 'اردو',
  };

  return (
    <div className={`pb-24 px-4 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-md mx-auto pt-6">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className={`w-24 h-24 ${
              role === 'parent' 
                ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
                : 'bg-gradient-to-br from-blue-500 to-blue-600'
            } rounded-full flex items-center justify-center text-white text-3xl mb-4 shadow-lg`}>
              <User className="w-12 h-12" />
            </div>
            <h2 className={`text-2xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {role === 'parent' ? 'Kari Nordmann' : 'Ola Pedagog'}
            </h2>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {role === 'parent' ? 'Forelder' : 'Pedagogisk leder'}
            </p>
          </div>
        </div>

        {/* Role Toggle Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
              <ArrowLeftRight className="w-6 h-6 text-amber-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Bytt modus</h3>
              <p className="text-sm text-gray-600">
                Du er nå i <span className="font-semibold">{role === 'parent' ? 'forelder' : 'ansatt'}</span>-modus
              </p>
            </div>
          </div>
          <button
            onClick={onRoleToggle}
            className={`w-full h-12 ${
              role === 'parent'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
            } text-white rounded-xl transition-all shadow-sm flex items-center justify-center gap-2`}
          >
            <ArrowLeftRight className="w-5 h-5" />
            Bytt til {role === 'parent' ? 'ansatt' : 'forelder'}
          </button>
        </div>

        {/* NEW: Why Hentetjeneste? */}
        <button 
          onClick={() => setShowValueProp(!showValueProp)}
          className="w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-purple-200 p-6 mb-6 text-left hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Hvorfor Hentetjeneste?</h3>
              <p className="text-sm text-gray-600">
                Se hva som gjør oss unike
              </p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Settings Section */}
        <div className="bg-white rounded-2xl border border-gray-200 mb-6 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Innstillinger</h3>
            </div>
          </div>

          {/* Language Setting */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">Språk</p>
                  <p className="text-sm text-gray-500">
                    {languageNames[language]}
                  </p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="h-10 px-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="no">Norsk</option>
                <option value="en">English</option>
                <option value="sv">Svenska</option>
                <option value="da">Dansk</option>
                <option value="fi">Suomi</option>
                <option value="de">Deutsch</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="pl">Polski</option>
                <option value="ar">العربية</option>
                <option value="so">Soomaali</option>
                <option value="ur">اردو</option>
              </select>
            </div>
          </div>

          {/* Notifications Setting */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-900">Varsler</p>
                  <p className="text-sm text-gray-500">
                    Push-varsler og hendelser
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notifications ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    notifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Dark Mode Setting */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Moon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-900">Mørk modus</p>
                  <p className="text-sm text-gray-500">
                    Endre tema
                  </p>
                </div>
              </div>
              <button
                onClick={() => onDarkModeToggle(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  darkMode ? 'bg-indigo-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Change Password */}
          <button
            onClick={() => setShowChangePassword(true)}
            className="w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Key className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-900">Endre passord</p>
                  <p className="text-sm text-gray-500">
                    Oppdater din sikkerhet
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>

          {/* Privacy Settings */}
          <button
            onClick={() => setShowPrivacySettings(true)}
            className="w-full p-4 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-900">Personvern</p>
                  <p className="text-sm text-gray-500">
                    Databeskyttelse og GDPR
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* QR Code Share - For demo/presentation */}
        <QRCodeShare />

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-3 h-12 bg-white hover:bg-red-50 text-red-600 rounded-xl border border-gray-200 hover:border-red-200 transition-colors mt-6">
          <LogOut className="w-5 h-5" />
          Logg ut
        </button>
      </div>

      {/* NEW: Value Proposition Modal */}
      {showValueProp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full my-8 p-8">
            <ValueProposition onClose={() => setShowValueProp(false)} />
          </div>
        </div>
      )}

      {/* NEW: Change Password Modal */}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} language={language} />
      )}

      {/* NEW: Privacy Settings Modal */}
      {showPrivacySettings && <PrivacySettings onClose={() => setShowPrivacySettings(false)} language={language} />}
    </div>
  );
}