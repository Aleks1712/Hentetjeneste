import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { authService } from '../services/supabase';
import { toast } from 'sonner';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Password strength validation
  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push('Minimum 8 tegn');
    if (!/[A-Z]/.test(password)) errors.push('Minimum 1 stor bokstav');
    if (!/[a-z]/.test(password)) errors.push('Minimum 1 liten bokstav');
    if (!/[0-9]/.test(password)) errors.push('Minimum 1 tall');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Minimum 1 spesialtegn');
    return errors;
  };

  const getPasswordStrength = (password: string): { level: number; text: string; color: string } => {
    const errors = validatePassword(password);
    if (password.length === 0) return { level: 0, text: '', color: '' };
    if (errors.length >= 4) return { level: 1, text: 'Svakt', color: 'bg-red-500' };
    if (errors.length >= 2) return { level: 2, text: 'Middels', color: 'bg-yellow-500' };
    if (errors.length === 1) return { level: 3, text: 'Godt', color: 'bg-blue-500' };
    return { level: 4, text: 'Sterkt', color: 'bg-green-500' };
  };

  // Phone validation (Norwegian format)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+47)?[49]\d{7}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Name validation
  const validateName = (name: string): boolean => {
    return name.trim().length >= 2 && /^[a-zA-ZæøåÆØÅ\s-]+$/.test(name);
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = (field: string) => {
    const newErrors = { ...errors };

    if (field === 'email') {
      if (!email) {
        newErrors.email = 'E-post er påkrevd';
      } else if (!validateEmail(email)) {
        newErrors.email = 'Ugyldig e-postadresse';
      } else {
        delete newErrors.email;
      }
    }

    if (field === 'password') {
      if (!password) {
        newErrors.password = 'Passord er påkrevd';
      } else if (activeTab === 'register') {
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
          newErrors.password = passwordErrors.join(', ');
        } else {
          delete newErrors.password;
        }
      } else if (password.length < 6) {
        newErrors.password = 'Passord må være minst 6 tegn';
      } else {
        delete newErrors.password;
      }
    }

    if (field === 'name' && activeTab === 'register') {
      if (!name) {
        newErrors.name = 'Navn er påkrevd';
      } else if (!validateName(name)) {
        newErrors.name = 'Ugyldig navn (kun bokstaver)';
      } else {
        delete newErrors.name;
      }
    }

    if (field === 'phone' && activeTab === 'register') {
      if (!phone) {
        newErrors.phone = 'Telefon er påkrevd';
      } else if (!validatePhone(phone)) {
        newErrors.phone = 'Ugyldig telefonnummer (norsk format)';
      } else {
        delete newErrors.phone;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const fieldsToValidate = ['email', 'password'];
    if (activeTab === 'register') {
      fieldsToValidate.push('name', 'phone');
    }

    fieldsToValidate.forEach(field => validateField(field));
    setTouched(fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    // Check if there are any errors
    const hasErrors = fieldsToValidate.some(field => {
      if (field === 'email') return !validateEmail(email);
      if (field === 'password') return activeTab === 'register' 
        ? validatePassword(password).length > 0 
        : password.length < 6;
      if (field === 'name') return !validateName(name);
      if (field === 'phone') return !validatePhone(phone);
      return false;
    });

    if (!hasErrors) {
      try {
        if (activeTab === 'register') {
          // Register new user
          await authService.signUp(email, password, {
            full_name: name,
            phone: phone,
            role: 'parent'
          });
          toast.success('Konto opprettet! Du kan nå logge inn.');
          setActiveTab('login');
          // Clear form
          setName('');
          setPhone('');
          setPassword('');
        } else {
          // Login existing user
          await authService.signIn(email, password);
          toast.success('Innlogging vellykket!');
          onLogin();
        }
      } catch (error: any) {
        console.error('Auth error:', error);
        // If Supabase is not configured, allow demo mode
        if (error.message?.includes('fetch') || error.message?.includes('Failed to fetch')) {
          toast.info('Supabase ikke konfigurert, bruker demo-modus');
          onLogin();
        } else {
          toast.error(error.message || 'Innlogging feilet. Prøv igjen.');
        }
      }
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h1 className="text-3xl text-gray-900 mb-2">Hentetjeneste</h1>
          <p className="text-gray-600">Sikker og enkel henting fra barnehagen</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => {
                setActiveTab('login');
                setErrors({});
                setTouched({});
              }}
              className={`flex-1 py-3 rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Logg inn
            </button>
            <button
              onClick={() => {
                setActiveTab('register');
                setErrors({});
                setTouched({});
              }}
              className={`flex-1 py-3 rounded-lg transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Registrer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {activeTab === 'register' && (
              <>
                {/* Name Field */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Fullt navn <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ola Nordmann"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => handleBlur('name')}
                      className={`w-full h-12 bg-gray-50 rounded-xl border ${
                        touched.name && errors.name 
                          ? 'border-red-300 focus:ring-red-500' 
                          : touched.name && !errors.name
                          ? 'border-green-300 focus:ring-green-500'
                          : 'border-gray-200 focus:ring-blue-500'
                      } pl-12 pr-12 focus:outline-none focus:ring-2 transition-all`}
                    />
                    {touched.name && !errors.name && name && (
                      <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {touched.name && errors.name && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Telefonnummer <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="12345678 eller +4712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      className={`w-full h-12 bg-gray-50 rounded-xl border ${
                        touched.phone && errors.phone 
                          ? 'border-red-300 focus:ring-red-500' 
                          : touched.phone && !errors.phone
                          ? 'border-green-300 focus:ring-green-500'
                          : 'border-gray-200 focus:ring-blue-500'
                      } pl-12 pr-12 focus:outline-none focus:ring-2 transition-all`}
                    />
                    {touched.phone && !errors.phone && phone && (
                      <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {touched.phone && errors.phone && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* Email Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                E-postadresse <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="din.epost@eksempel.no"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={`w-full h-12 bg-gray-50 rounded-xl border ${
                    touched.email && errors.email 
                      ? 'border-red-300 focus:ring-red-500' 
                      : touched.email && !errors.email
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-200 focus:ring-blue-500'
                  } pl-12 pr-12 focus:outline-none focus:ring-2 transition-all`}
                />
                {touched.email && !errors.email && email && (
                  <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {touched.email && errors.email && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
            
            {/* Password Field */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Passord <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={activeTab === 'register' ? 'Minimum 8 tegn, tall og spesialtegn' : 'Ditt passord'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  className={`w-full h-12 bg-gray-50 rounded-xl border ${
                    touched.password && errors.password 
                      ? 'border-red-300 focus:ring-red-500' 
                      : touched.password && !errors.password && password
                      ? 'border-green-300 focus:ring-green-500'
                      : 'border-gray-200 focus:ring-blue-500'
                  } pl-12 pr-12 focus:outline-none focus:ring-2 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="flex items-center gap-2 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
              
              {/* Password Strength Indicator for Register */}
              {activeTab === 'register' && password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Passordstyrke:</span>
                    <span className={`text-sm font-medium ${
                      strength.level === 1 ? 'text-red-600' :
                      strength.level === 2 ? 'text-yellow-600' :
                      strength.level === 3 ? 'text-blue-600' :
                      'text-green-600'
                    }`}>
                      {strength.text}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${strength.color}`}
                      style={{ width: `${(strength.level / 4) * 100}%` }}
                    />
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="mt-3 space-y-1">
                    <div className={`flex items-center gap-2 text-xs ${password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${password.length >= 8 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {password.length >= 8 && <CheckCircle className="w-3 h-3" />}
                      </div>
                      <span>Minimum 8 tegn</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {/[A-Z]/.test(password) && /[a-z]/.test(password) && <CheckCircle className="w-3 h-3" />}
                      </div>
                      <span>Store og små bokstaver</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${/[0-9]/.test(password) ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {/[0-9]/.test(password) && <CheckCircle className="w-3 h-3" />}
                      </div>
                      <span>Minst ett tall</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {/[!@#$%^&*(),.?":{}|<>]/.test(password) && <CheckCircle className="w-3 h-3" />}
                      </div>
                      <span>Spesialtegn (!@#$%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.98] text-white rounded-xl transition-all shadow-lg mt-6"
            >
              {activeTab === 'login' ? 'Logg inn' : 'Opprett konto'}
            </button>

            {activeTab === 'login' && (
              <div className="text-center pt-4">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
                  Glemt passord?
                </a>
              </div>
            )}
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-900 text-center">
              <strong>Demo:</strong> Bruk hvilken som helst e-post og passord for å logge inn
            </p>
          </div>
        </div>

        {/* Security badges */}
        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>SSL sikret</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>GDPR-kompatibel</span>
          </div>
        </div>
      </div>
    </div>
  );
}
