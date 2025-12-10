import { useState } from 'react';
import { HeartPulse, UserCheck, CalendarCheck, Clock, Bell } from 'lucide-react';
import { Language, useTranslation } from '../translations/translations';

interface NotificationsTabProps {
  role: 'parent' | 'staff';
  darkMode?: boolean;
  language?: Language;
}

export function NotificationsTab({ role, darkMode = false, language = 'no' }: NotificationsTabProps) {
  const t = useTranslation(language);

  const [parentNotifications, setParentNotifications] = useState([
    {
      id: '1',
      type: 'incident',
      icon: HeartPulse,
      title: 'Mindre fall på lekeplassen',
      message: 'Emma skrapte kneet sitt. Såret ble rengjort og plaster påført.',
      time: '10 min siden',
      read: false,
    },
    {
      id: '2',
      type: 'success',
      icon: UserCheck,
      title: 'Henting godkjent',
      message: 'Din hentemelding for Emma kl. 15:30 er godkjent',
      time: '1 time siden',
      read: false,
    },
    {
      id: '3',
      type: 'info',
      icon: Bell,
      title: 'Ny melding fra barnehagen',
      message: 'Besked om ekstra klesbytte til i morgen',
      time: '2 timer siden',
      read: false,
    },
    {
      id: '4',
      type: 'pending',
      icon: Clock,
      title: 'Venter på samtykke',
      message: 'Husk å godkjenne ny henteperson: Besteforelder Nordmann',
      time: 'I går',
      read: true,
    },
  ]);

  const [staffNotifications, setStaffNotifications] = useState([
    {
      id: '1',
      type: 'warning',
      icon: Bell,
      title: 'Hentemelding venter',
      message: '3 nye hentemeldinger krever godkjenning',
      time: '5 min siden',
      read: false,
    },
    {
      id: '2',
      type: 'incident',
      icon: HeartPulse,
      title: 'Hendelse rapportert',
      message: 'Lucas Berg følte seg kvalm etter lunsj. Foreldre varslet.',
      time: '30 min siden',
      read: false,
    },
    {
      id: '3',
      type: 'success',
      icon: UserCheck,
      title: 'Emma ble krysset inn',
      message: 'Krysset inn av Kari Nordmann kl. 08:24',
      time: '1 time siden',
      read: false,
    },
    {
      id: '4',
      type: 'info',
      icon: Bell,
      title: 'Ny melding fra forelder',
      message: 'Kari Nordmann: "Emma trenger ekstra votter i dag"',
      time: '2 timer siden',
      read: true,
    },
  ]);

  const notifications = role === 'parent' ? parentNotifications : staffNotifications;
  const setNotifications = role === 'parent' ? setParentNotifications : setStaffNotifications;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-orange-100 text-orange-600';
      case 'info':
        return 'bg-blue-100 text-blue-600';
      case 'incident':
        return 'bg-red-100 text-red-600';
      case 'pending':
        return role === 'parent' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="pb-24 px-4">
      <div className="max-w-md mx-auto pt-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl text-gray-900 mb-2">Varsler</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {notifications.filter(n => !n.read).length} uleste varsler
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700" onClick={markAllAsRead}>
              Merk alle som lest
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-2xl border ${
                  notification.read ? 'border-gray-200' : 'border-gray-300 shadow-sm'
                } p-4 transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${getTypeStyles(notification.type)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`${notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className={`w-2 h-2 ${
                          role === 'parent' ? 'bg-purple-600' : 'bg-blue-600'
                        } rounded-full flex-shrink-0 mt-1.5`}></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State (hvis tom) */}
        {notifications.length === 0 && (
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">Ingen varsler</h3>
            <p className="text-sm text-gray-600">
              Du har ingen nye varsler akkurat nå
            </p>
          </div>
        )}
      </div>
    </div>
  );
}