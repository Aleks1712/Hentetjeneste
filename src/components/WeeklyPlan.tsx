import { Calendar, UtensilsCrossed, Sparkles, Users, Clock } from 'lucide-react';

interface WeekDay {
  day: string;
  date: string;
  activities: Activity[];
}

interface Activity {
  time: string;
  type: 'activity' | 'meal' | 'rest' | 'outdoor';
  title: string;
  icon: any;
}

export function WeeklyPlan() {
  const weekPlan: WeekDay[] = [
    {
      day: 'Mandag',
      date: '9. des',
      activities: [
        { time: '09:00', type: 'activity', title: 'Morgensamling', icon: Users },
        { time: '10:30', type: 'outdoor', title: 'Utetur til parken', icon: Sparkles },
        { time: '11:30', type: 'meal', title: 'Lunsj: Fiskesuppe', icon: UtensilsCrossed },
        { time: '13:00', type: 'rest', title: 'Hvile', icon: Clock },
      ],
    },
    {
      day: 'Tirsdag',
      date: '10. des',
      activities: [
        { time: '09:00', type: 'activity', title: 'Morgensamling', icon: Users },
        { time: '10:00', type: 'activity', title: 'Forming med leire', icon: Sparkles },
        { time: '11:30', type: 'meal', title: 'Lunsj: Pasta Bolognese', icon: UtensilsCrossed },
        { time: '13:00', type: 'rest', title: 'Hvile', icon: Clock },
      ],
    },
    {
      day: 'Onsdag',
      date: '11. des',
      activities: [
        { time: '09:00', type: 'activity', title: 'Morgensamling', icon: Users },
        { time: '10:00', type: 'activity', title: 'Julegranpynting', icon: Sparkles },
        { time: '11:30', type: 'meal', title: 'Lunsj: Kjøttboller', icon: UtensilsCrossed },
        { time: '13:00', type: 'rest', title: 'Hvile', icon: Clock },
      ],
    },
    {
      day: 'Torsdag',
      date: '12. des',
      activities: [
        { time: '09:00', type: 'activity', title: 'Morgensamling', icon: Users },
        { time: '10:30', type: 'activity', title: 'Lucia-feiring', icon: Sparkles },
        { time: '11:30', type: 'meal', title: 'Lunsj: Lussekatter', icon: UtensilsCrossed },
        { time: '13:00', type: 'rest', title: 'Hvile', icon: Clock },
      ],
    },
    {
      day: 'Fredag',
      date: '13. des',
      activities: [
        { time: '09:00', type: 'activity', title: 'Morgensamling', icon: Users },
        { time: '10:00', type: 'outdoor', title: 'Skitur', icon: Sparkles },
        { time: '11:30', type: 'meal', title: 'Lunsj: Vafler', icon: UtensilsCrossed },
        { time: '13:00', type: 'rest', title: 'Hvile', icon: Clock },
      ],
    },
  ];

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'activity':
        return 'bg-purple-100 text-purple-600';
      case 'meal':
        return 'bg-orange-100 text-orange-600';
      case 'rest':
        return 'bg-blue-100 text-blue-600';
      case 'outdoor':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-gray-900">Ukeplan</h3>
          <p className="text-sm text-gray-600">Uke 50 - Oversikt over uken</p>
        </div>
      </div>

      <div className="space-y-4">
        {weekPlan.map((day, dayIndex) => (
          <div key={dayIndex} className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="text-gray-900">{day.day}</h4>
                <span className="text-sm text-gray-600">{day.date}</span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {day.activities.map((activity, actIndex) => {
                const Icon = activity.icon;
                return (
                  <div key={actIndex} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-12 flex-shrink-0">{activity.time}</span>
                    <div className={`w-8 h-8 ${getTypeStyles(activity.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-700">{activity.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-900">
          <span className="font-medium">Tips:</span> Ukeplanen oppdateres hver mandag. Endringer i planen varsles via appen.
        </p>
      </div>
    </div>
  );
}
