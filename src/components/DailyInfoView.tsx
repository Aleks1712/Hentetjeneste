import { Calendar, UtensilsCrossed, Sparkles, Megaphone, Edit2, Plus, Trash2, Save, X } from 'lucide-react';
import { DailyInfo } from '../data/mockData';
import { useState } from 'react';

interface DailyInfoViewProps {
  info: DailyInfo[];
  targetGroup?: string;
  editable?: boolean;
}

export function DailyInfoView({ info, targetGroup, editable }: DailyInfoViewProps) {
  const getInfoIcon = (type: string) => {
    switch (type) {
      case 'menu':
        return UtensilsCrossed;
      case 'activity':
        return Sparkles;
      case 'announcement':
        return Megaphone;
      default:
        return Calendar;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'menu':
        return 'bg-orange-100 text-orange-600';
      case 'activity':
        return 'bg-purple-100 text-purple-600';
      case 'announcement':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'menu':
        return 'Matmeny';
      case 'activity':
        return 'Aktivitet';
      case 'announcement':
        return 'Beskjed';
      default:
        return 'Info';
    }
  };

  // Filter by target group if specified
  const filteredInfo = targetGroup
    ? info.filter(item => !item.targetGroup || item.targetGroup === targetGroup)
    : info;

  // Group by date
  const today = new Date().toISOString().split('T')[0];
  const todayInfo = filteredInfo.filter(item => item.date === today);
  const upcomingInfo = filteredInfo.filter(item => item.date > today);

  if (filteredInfo.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-gray-900 mb-2">Ingen info tilgjengelig</h3>
        <p className="text-sm text-gray-600">
          Det er ingen planlagte aktiviteter eller info akkurat nå
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Today's Info */}
      {todayInfo.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-gray-900">I dag</h3>
          </div>
          <div className="space-y-3">
            {todayInfo.map((item) => {
              const Icon = getInfoIcon(item.type);
              
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${getTypeStyles(item.type)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="text-gray-900">{item.title}</h4>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex-shrink-0">
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {item.description}
                      </p>
                      {item.targetGroup && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-xs text-purple-700">For {item.targetGroup}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upcoming Info */}
      {upcomingInfo.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-900">Kommende</h3>
          </div>
          <div className="space-y-3">
            {upcomingInfo.map((item) => {
              const Icon = getInfoIcon(item.type);
              const date = new Date(item.date);
              
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${getTypeStyles(item.type)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-gray-900">{item.title}</h4>
                          <p className="text-xs text-gray-500">
                            {date.toLocaleDateString('no-NO', { weekday: 'long', day: 'numeric', month: 'long' })}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs flex-shrink-0">
                          {getTypeLabel(item.type)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        {item.description}
                      </p>
                      {item.targetGroup && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-xs text-purple-700">For {item.targetGroup}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}