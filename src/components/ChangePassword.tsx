import { X, Key, Eye, EyeOff, Check, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Language, useTranslation } from '../translations/translations';

interface ChangePasswordProps {
  onClose: () => void;
  language?: Language;
}

export function ChangePassword({ onClose, language = 'no' }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const t = useTranslation(language);

  // Password validation - samme som LoginScreen
  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push(t.minChars);
    if (!/[A-Z]/.test(password)) errors.push('Minimum 1 stor bokstav');
    if (!/[a-z]/.test(password)) errors.push('Minimum 1 liten bokstav');
    if (!/[0-9]/.test(password)) errors.push('Minimum 1 tall');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push(t.specialChar);
    return errors;
  };

  const passwordStrength = (password: string) => {
    if (password.length === 0) return { level: 0, text: '', color: '' };
    const errors = validatePassword(password);
    if (errors.length >= 4) return { level: 1, text: t.weak, color: 'bg-red-500' };
    if (errors.length >= 2) return { level: 2, text: t.medium, color: 'bg-yellow-500' };
    if (errors.length === 1) return { level: 3, text: t.strong, color: 'bg-blue-500' };
    return { level: 4, text: t.veryStrong, color: 'bg-green-600' };
  };

  const strength = passwordStrength(newPassword);
  const passwordErrors = validatePassword(newPassword);
  const isValid = currentPassword.length > 0 && 
                  newPassword.length >= 8 && 
                  passwordErrors.length === 0 &&
                  newPassword === confirmPassword;

  const handleSubmit = () => {
    if (isValid) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl text-gray-900">{t.changePassword}</h2>
              <p className="text-sm text-gray-600">{t.updateSecurity}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 hover:bg-white/50 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">{t.passwordUpdated}</h3>
              <p className="text-gray-600">Ditt passord er nå endret</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Current Password */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">{t.currentPassword}</label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 px-4 pr-12 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">{t.newPassword}</label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full h-12 px-4 pr-12 bg-gray-50 border ${
                      newPassword && passwordErrors.length > 0 
                        ? 'border-red-300' 
                        : newPassword && passwordErrors.length === 0
                        ? 'border-green-300'
                        : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength */}
                {newPassword && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{t.passwordStrength}:</span>
                      <span className={`text-sm font-medium ${
                        strength.level === 1 ? 'text-red-600' :
                        strength.level === 2 ? 'text-yellow-600' :
                        strength.level === 3 ? 'text-blue-600' :
                        'text-green-600'
                      }`}>{strength.text}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${strength.color} transition-all duration-300`}
                        style={{ width: `${(strength.level / 4) * 100}%` }}
                      />
                    </div>
                    
                    {/* Password Requirements - Real-time validation */}
                    <div className="mt-3 space-y-1">
                      <div className={`flex items-center gap-2 text-xs ${newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${newPassword.length >= 8 ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {newPassword.length >= 8 && <CheckCircle className="w-3 h-3" />}
                        </div>
                        <span>{t.minChars}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) && <CheckCircle className="w-3 h-3" />}
                        </div>
                        <span>{t.uppercaseLowercase}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${/[0-9]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${/[0-9]/.test(newPassword) ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {/[0-9]/.test(newPassword) && <CheckCircle className="w-3 h-3" />}
                        </div>
                        <span>{t.oneNumber}</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) && <CheckCircle className="w-3 h-3" />}
                        </div>
                        <span>{t.specialChar}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">{t.confirmNewPassword}</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full h-12 px-4 pr-12 bg-gray-50 border ${
                      confirmPassword && newPassword !== confirmPassword 
                        ? 'border-red-300' 
                        : confirmPassword && newPassword === confirmPassword
                        ? 'border-green-300'
                        : 'border-gray-300'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>{t.passwordsDoNotMatch}</span>
                  </div>
                )}
                {confirmPassword && newPassword === confirmPassword && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Passordene matcher</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="p-6 border-t border-gray-200 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-11 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`flex-1 h-11 rounded-xl transition-colors ${
                isValid 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {t.updatePassword}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
