import { useState } from 'react';
import { ChildCard } from './ChildCard';
import { IncidentReport } from './IncidentReport';
import { DailyInfoEditor } from './DailyInfoEditor';
import { StatsView } from './StatsView';
import { ChildSelector } from './ChildSelector';
import { StaffChatModal } from './StaffChatModal';
import { mockChildren, mockDailyInfo } from '../data/mockData';
import { Plus, Calendar, Users, CheckCircle, BarChart3, Clock, UserCheck, TrendingUp, MessageCircle } from 'lucide-react';
import { Language, useTranslation } from '../translations/translations';

type Tab = 'all' | 'present' | 'absent';

interface StaffViewProps {
  viewType: 'checklist' | 'stats';
  darkMode?: boolean;
  language?: Language;
}

export function StaffView({ viewType, darkMode = false, language = 'no' }: StaffViewProps) {
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showIncidentReport, setShowIncidentReport] = useState(false);
  const [showDailyInfoEditor, setShowDailyInfoEditor] = useState(false);
  const [incidentChildId, setIncidentChildId] = useState<string | null>(null);
  const [showChildSelector, setShowChildSelector] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  // Add state to track children status
  const [childrenStatus, setChildrenStatus] = useState(() => {
    const statusMap: { [key: string]: { status: 'present' | 'home'; checkInTime?: string; checkOutTime?: string } } = {};
    mockChildren.forEach(child => {
      statusMap[child.id] = {
        status: child.status,
        checkInTime: child.checkInTime,
        checkOutTime: child.checkOutTime
      };
    });
    return statusMap;
  });
  
  // Function to check in a child
  const handleCheckIn = (childId: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    setChildrenStatus(prev => ({
      ...prev,
      [childId]: {
        status: 'present',
        checkInTime: timeString,
        checkOutTime: undefined
      }
    }));
  };
  
  // Function to check out a child
  const handleCheckOut = (childId: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    setChildrenStatus(prev => ({
      ...prev,
      [childId]: {
        status: 'home',
        checkInTime: prev[childId]?.checkInTime,
        checkOutTime: timeString
      }
    }));
  };
  
  // Get child with updated status
  const getChildStatus = (childId: string) => {
    return childrenStatus[childId] || { status: 'home' };
  };
  
  // Calculate current present count
  const presentCount = Object.values(childrenStatus).filter(status => status.status === 'present').length;
  
  const selectedChild = mockChildren.find(c => c.id === selectedChildId);
  const incidentChild = mockChildren.find(c => c.id === incidentChildId);

  const handleIncidentSubmit = (incident: any) => {
    // Handle incident submission
    console.log('Incident reported:', incident);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-24 sm:px-6 lg:px-8">
      {/* Demo Banner */}
      <div className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-1">Demo-modus: Ansatt</h4>
            <p className="text-sm text-blue-100">
              {viewType === 'checklist' 
                ? 'Se krysseliste for 16 barn. Trykk "Hendelse" for å rapportere ulykker/info. Hendelser sendes direkte til foreldre!'
                : 'Se statistikk og oversikt over barnehagen. Daglige tall og trender.'}
            </p>
          </div>
        </div>
      </div>

      {/* STATISTICS VIEW */}
      {viewType === 'stats' && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl text-gray-900">Statistikk</h1>
                <p className="text-sm text-gray-600">Oversikt og analyse</p>
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Total Children */}
            <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-4xl text-blue-600">{mockChildren.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Barn totalt</p>
                </div>
              </div>
            </div>

            {/* Present */}
            <div className="bg-white rounded-2xl border-2 border-green-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="text-4xl text-green-600">{mockChildren.filter(c => c.status === 'present').length}</p>
                  <p className="text-sm text-gray-600 mt-1">Til stede</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 rounded-full h-2" style={{ width: `${(mockChildren.filter(c => c.status === 'present').length / mockChildren.length) * 100}%` }}></div>
                </div>
                <span className="text-xs">{Math.round((mockChildren.filter(c => c.status === 'present').length / mockChildren.length) * 100)}%</span>
              </div>
            </div>

            {/* Pending Pickups */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-right">
                  <p className="text-4xl text-orange-600">{mockChildren.filter(c => c.pickupStatus === 'pending').length}</p>
                  <p className="text-sm text-gray-600 mt-1">Ventende</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {mockChildren.filter(c => c.pickupStatus === 'pending').length > 0 ? 'Trenger godkjenning' : 'Ingen ventende'}
              </p>
            </div>

            {/* Approved Today */}
            <div className="bg-white rounded-2xl border-2 border-purple-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-right">
                  <p className="text-4xl text-purple-600">{mockChildren.filter(c => c.pickupStatus === 'approved').length}</p>
                  <p className="text-sm text-gray-600 mt-1">Godkjente i dag</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Klar til henting</p>
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="text-gray-900">Ukeoversikt</h3>
            </div>
            <div className="space-y-4">
              {['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'].map((day, index) => {
                const attendance = Math.floor(Math.random() * 5) + 11;
                const percentage = (attendance / mockChildren.length) * 100;
                return (
                  <div key={day}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700">{day}</span>
                      <span className="text-sm text-gray-900">{attendance}/{mockChildren.length}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group Statistics */}
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-gray-900">Blåklokka</h3>
              </div>
              <p className="text-3xl text-gray-900 mb-2">7/8</p>
              <p className="text-sm text-gray-600">barn til stede</p>
              <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 rounded-full h-2" style={{ width: '87.5%' }}></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-gray-900">Solstråla</h3>
              </div>
              <p className="text-3xl text-gray-900 mb-2">6/8</p>
              <p className="text-sm text-gray-600">barn til stede</p>
              <div className="mt-4 w-full bg-gray-100 rounded-full h-2">
                <div className="bg-yellow-500 rounded-full h-2" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CHECKLIST VIEW */}
      {viewType === 'checklist' && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl text-gray-900">Krysselista</h1>
                <p className="text-sm text-gray-600">Ansatt</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* NEW: Quick Actions */}
              <button 
                onClick={() => setShowChildSelector(true)}
                className="h-10 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl border border-red-200 transition-colors flex items-center gap-2"
                title="Rapporter hendelse"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Hendelse</span>
              </button>
              <button 
                onClick={() => setShowDailyInfoEditor(!showDailyInfoEditor)}
                className="h-10 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl border border-purple-200 transition-colors flex items-center gap-2"
                title="Daglig info"
              >
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Daglig info</span>
              </button>
              <button 
                onClick={() => setShowChat(true)}
                className="h-10 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl border border-blue-200 transition-colors flex items-center gap-2"
                title="Chat med foreldre"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Chat</span>
              </button>
              <button className="w-10 h-10 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>

          {/* NEW: Daily Info Section (expandable) - Opens modal directly */}

          {/* Daily Info Editor Modal */}
          {showDailyInfoEditor && (
            <DailyInfoEditor
              info={mockDailyInfo}
              onClose={() => setShowDailyInfoEditor(false)}
              onSave={(updatedInfo) => {
                // Save updated daily info
                console.log('Daily info updated:', updatedInfo);
                setShowDailyInfoEditor(false);
              }}
            />
          )}

          {/* Dashboard Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Total Children */}
            <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-4xl text-blue-600">{mockChildren.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Barn totalt</p>
                </div>
              </div>
            </div>

            {/* Present */}
            <div className="bg-white rounded-2xl border-2 border-green-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="text-4xl text-green-600">{presentCount}</p>
                  <p className="text-sm text-gray-600 mt-1">Til stede</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 rounded-full h-2" style={{ width: `${(presentCount / mockChildren.length) * 100}%` }}></div>
                </div>
                <span className="text-xs">{Math.round((presentCount / mockChildren.length) * 100)}%</span>
              </div>
            </div>

            {/* Pending Pickups */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-right">
                  <p className="text-4xl text-orange-600">{mockChildren.filter(c => c.pickupStatus === 'pending').length}</p>
                  <p className="text-sm text-gray-600 mt-1">Ventende</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {mockChildren.filter(c => c.pickupStatus === 'pending').length > 0 ? 'Trenger godkjenning' : 'Ingen ventende'}
              </p>
            </div>

            {/* Approved Today */}
            <div className="bg-white rounded-2xl border-2 border-purple-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-right">
                  <p className="text-4xl text-purple-600">{mockChildren.filter(c => c.pickupStatus === 'approved').length}</p>
                  <p className="text-sm text-gray-600 mt-1">Godkjente i dag</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">Klar til henting</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-t-2xl border border-gray-200 mb-0">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-4 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'all'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 border-transparent'
                }`}
              >
                Inn/Ut
              </button>
              <button
                onClick={() => setActiveTab('present')}
                className={`px-6 py-4 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'present'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 border-transparent'
                }`}
              >
                Til stede
              </button>
              <button
                onClick={() => setActiveTab('absent')}
                className={`px-6 py-4 text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'absent'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 border-transparent'
                }`}
              >
                Ikke til stede
              </button>
            </div>
          </div>

          {/* Overview */}
          {activeTab === 'all' && (
            <div className="bg-gradient-to-br from-blue-50 to-white border-x border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-gray-900">Oversikt</h3>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-6xl text-blue-600">{presentCount}</p>
                <div>
                  <p className="text-gray-900">av {mockChildren.length} barn til stede</p>
                  <p className="text-sm text-gray-500 mt-1">Oppdatert nå nettopp</p>
                </div>
                <div className="ml-auto">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="bg-white rounded-b-2xl border border-gray-200 border-t-0">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-gray-900">
                  {activeTab === 'all' && 'Alle barn'}
                  {activeTab === 'present' && 'Barn til stede'}
                  {activeTab === 'absent' && 'Barn ikke til stede'}
                </h3>
              </div>

              {/* Children List - Grid Layout for "all" tab */}
              {activeTab === 'all' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mockChildren.map(child => {
                    const childStatus = getChildStatus(child.id);
                    return (
                      <div
                        key={child.id}
                        className="flex items-center justify-between p-4 bg-white hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                            {child.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 mb-0.5 truncate">{child.name}</p>
                            {childStatus.checkInTime && (
                              <p className="text-xs text-gray-500">Inn: {childStatus.checkInTime}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {childStatus.status === 'present' ? (
                            <>
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                Til stede
                              </span>
                              <button
                                onClick={() => handleCheckOut(child.id)}
                                className="h-9 px-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors shadow-sm text-sm"
                                title="Kryss ut"
                              >
                                Ut
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleCheckIn(child.id)}
                              className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm text-sm"
                            >
                              Kryss inn
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Other tabs keep list layout */
                <div className="space-y-2">
                  {mockChildren.filter(child => {
                    const childStatus = getChildStatus(child.id);
                    if (activeTab === 'present') return childStatus.status === 'present';
                    if (activeTab === 'absent') return childStatus.status !== 'present';
                    return true;
                  }).map(child => {
                    const childStatus = getChildStatus(child.id);
                    return (
                      <div
                        key={child.id}
                        className="flex items-center justify-between p-5 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl shadow-sm">
                            {child.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-gray-900 mb-1">{child.name}</p>
                            {childStatus.checkInTime && (
                              <p className="text-sm text-gray-500">Inn: {childStatus.checkInTime}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {childStatus.status === 'present' ? (
                            <>
                              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                                Til stede
                              </span>
                              <button
                                onClick={() => handleCheckOut(child.id)}
                                className="h-11 px-5 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white rounded-xl transition-colors shadow-sm flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                </svg>
                                Kryss ut
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleCheckIn(child.id)}
                              className="h-11 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl transition-colors shadow-sm flex items-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                              Kryss inn
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {mockChildren.filter(child => {
                const childStatus = getChildStatus(child.id);
                if (activeTab === 'present') return childStatus.status === 'present';
                if (activeTab === 'absent') return childStatus.status !== 'present';
                return true;
              }).length === 0 && (
                <div className="text-center py-12">
                  <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Ingen barn i denne kategorien</p>
                </div>
              )}
            </div>
          </div>

          {/* Child Selector Modal */}
          {showChildSelector && (
            <ChildSelector
              children={mockChildren}
              onSelect={(childId) => {
                setIncidentChildId(childId);
                setShowIncidentReport(true);
              }}
              onClose={() => setShowChildSelector(false)}
              title="Velg barn"
              description="Velg barnet du vil rapportere en hendelse for"
            />
          )}

          {/* NEW: Incident Report Modal */}
          {showIncidentReport && incidentChild && (
            <IncidentReport
              childId={incidentChild.id}
              childName={incidentChild.name}
              onClose={() => {
                setShowIncidentReport(false);
                setIncidentChildId(null);
              }}
              onSubmit={handleIncidentSubmit}
            />
          )}
        </>
      )}

      {/* Chat Modal - available in both views */}
      {showChat && (
        <StaffChatModal onClose={() => setShowChat(false)} />
      )}
    </div>
  );
}