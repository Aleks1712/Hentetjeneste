import { AlertCircle, Info, HeartPulse, AlertTriangle } from 'lucide-react';
import { Incident } from '../data/mockData';

interface IncidentListProps {
  incidents: Incident[];
  viewType: 'parent' | 'staff';
}

export function IncidentList({ incidents, viewType }: IncidentListProps) {
  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'injury':
        return HeartPulse;
      case 'illness':
        return AlertTriangle;
      case 'emergency':
        return AlertCircle;
      default:
        return Info;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'injury':
        return 'bg-red-100 text-red-600';
      case 'illness':
        return 'bg-orange-100 text-orange-600';
      case 'emergency':
        return 'bg-red-200 text-red-700';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Høy</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Medium</span>;
      default:
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Lav</span>;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    
    // Check if same day
    const isSameDay = date.getDate() === now.getDate() &&
                      date.getMonth() === now.getMonth() &&
                      date.getFullYear() === now.getFullYear();
    
    // Check if yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() &&
                        date.getMonth() === yesterday.getMonth() &&
                        date.getFullYear() === yesterday.getFullYear();

    if (isSameDay) {
      return 'I dag kl. ' + date.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    } else if (isYesterday) {
      return 'I går kl. ' + date.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('no-NO', { day: 'numeric', month: 'short' }) + ' kl. ' + date.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    }
  };

  if (incidents.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Info className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-gray-900 mb-2">Ingen hendelser</h3>
        <p className="text-sm text-gray-600">
          Det er ingen registrerte hendelser for dette barnet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {incidents.map((incident) => {
        const Icon = getIncidentIcon(incident.type);
        
        return (
          <div
            key={incident.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${getTypeStyles(incident.type)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-gray-900">{incident.title}</h4>
                  {getSeverityBadge(incident.severity)}
                </div>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {incident.description}
                </p>
                {incident.actionTaken && (
                  <div className="bg-blue-50 rounded-xl p-3 mb-3 border border-blue-100">
                    <p className="text-xs text-blue-900 mb-1">Tiltak utført:</p>
                    <p className="text-sm text-blue-700">{incident.actionTaken}</p>
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Rapportert av {incident.reportedBy}</span>
                  <span>{formatDate(incident.reportedAt)}</span>
                </div>
                {incident.notifiedParents && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-green-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>Foreldre varslet</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}