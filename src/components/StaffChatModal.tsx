import { useState } from 'react';
import { X, Send, MessageCircle, Search, ChevronLeft } from 'lucide-react';
import { mockChildren } from '../data/mockData';

interface Message {
  text: string;
  sender: 'parent' | 'staff';
  time: string;
}

interface ChatThread {
  childId: string;
  childName: string;
  parentName: string;
  messages: Message[];
  unreadCount: number;
  lastMessageTime: string;
}

interface StaffChatModalProps {
  onClose: () => void;
}

export function StaffChatModal({ onClose }: StaffChatModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  
  // Mock chat threads - in production this would come from Supabase
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([
    {
      childId: 'child-1',
      childName: 'Emma Hansen',
      parentName: 'Anne Hansen',
      lastMessageTime: '14:45',
      unreadCount: 2,
      messages: [
        { text: 'Hei! Emma hadde en flott dag i dag. Hun var veldig aktiv ute!', sender: 'staff', time: '14:22' },
        { text: 'Takk for meldingen! Hvor lenge var dere ute?', sender: 'parent', time: '14:35' },
        { text: 'Vi var ute fra 10:00 til 11:30. Emma lekte med Lucas og Sofia på klatrestativet.', sender: 'staff', time: '14:37' },
        { text: 'Fint! Hun er så glad i å klatre. Spiste hun godt til lunsj?', sender: 'parent', time: '14:40' },
        { text: 'Ja, hun spiste opp alt og tok til og med påfyll av suppe!', sender: 'staff', time: '14:42' },
        { text: 'Supert! Takk for at dere tar så godt vare på henne.', sender: 'parent', time: '14:45' },
      ],
    },
    {
      childId: 'child-5',
      childName: 'Lucas Patel',
      parentName: 'Priya Patel',
      lastMessageTime: '13:20',
      unreadCount: 1,
      messages: [
        { text: 'Hei! Jeg lurte på om Lucas kan få med ekstra skift i dag? Han skal på besøk til besteforeldre etter barnehagen.', sender: 'parent', time: '08:15' },
        { text: 'Selvfølgelig! Vi legger ekstra skift i sekken hans. Ha en fin ettermiddag!', sender: 'staff', time: '08:20' },
        { text: 'Takk! Forresten, kan dere huske å gi ham allergi-medisin kl 12?', sender: 'parent', time: '13:20' },
      ],
    },
    {
      childId: 'child-3',
      childName: 'Sofia Nguyen',
      parentName: 'Mai Nguyen',
      lastMessageTime: '11:05',
      unreadCount: 0,
      messages: [
        { text: 'God morgen! Sofia har litt vondt i halsen i dag, så kan dere holde ekstra øye med henne?', sender: 'parent', time: '08:00' },
        { text: 'Selvfølgelig! Vi følger med og gir beskjed hvis hun blir dårligere. Hun virker grei nå.', sender: 'staff', time: '08:30' },
        { text: 'Sofia føler seg bedre nå og har lekt fint hele formiddagen. Hun spiste godt til lunsj også!', sender: 'staff', time: '11:05' },
      ],
    },
    {
      childId: 'child-7',
      childName: 'Oliver Berg',
      parentName: 'Kari Berg',
      lastMessageTime: '10:30',
      unreadCount: 0,
      messages: [
        { text: 'Hei! Oliver var veldig spent på turdagen i dag. Hadde dere en fin tur?', sender: 'parent', time: '10:00' },
        { text: 'Ja, vi hadde en fantastisk tur til skogen! Oliver fant mange pinnsvin og ville gjerne bygge hytte.', sender: 'staff', time: '10:30' },
      ],
    },
  ]);

  const selectedThreadData = chatThreads.find(t => t.childId === selectedThread);
  
  const filteredThreads = chatThreads.filter(thread =>
    thread.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.parentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnreadCount = chatThreads.reduce((sum, thread) => sum + thread.unreadCount, 0);

  const handleSend = () => {
    if (message.trim() && selectedThread) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
      
      setChatThreads(prev => prev.map(thread => {
        if (thread.childId === selectedThread) {
          return {
            ...thread,
            messages: [...thread.messages, { text: message, sender: 'staff' as const, time: timeString }],
            lastMessageTime: timeString,
          };
        }
        return thread;
      }));
      
      setMessage('');
    }
  };

  const handleSelectThread = (childId: string) => {
    setSelectedThread(childId);
    // Mark as read
    setChatThreads(prev => prev.map(thread => {
      if (thread.childId === childId) {
        return { ...thread, unreadCount: 0 };
      }
      return thread;
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-white">Meldinger</h3>
            <p className="text-sm text-blue-100">
              {totalUnreadCount > 0 ? `${totalUnreadCount} uleste melding${totalUnreadCount > 1 ? 'er' : ''}` : 'Alle meldinger lest'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Thread List */}
          <div className={`${selectedThread ? 'hidden sm:flex' : 'flex'} flex-col w-full sm:w-80 border-r border-gray-200 bg-gray-50`}>
            {/* Search */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Søk etter barn eller foreldre..."
                  className="w-full pl-10 pr-4 h-10 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                />
              </div>
            </div>

            {/* Thread List */}
            <div className="flex-1 overflow-y-auto">
              {filteredThreads.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-1">Ingen samtaler funnet</p>
                  <p className="text-sm text-gray-500">Prøv et annet søk</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredThreads.map(thread => (
                    <button
                      key={thread.childId}
                      onClick={() => handleSelectThread(thread.childId)}
                      className={`w-full p-4 text-left transition-colors hover:bg-white ${
                        selectedThread === thread.childId ? 'bg-white border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                          {thread.childName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-gray-900 truncate">{thread.childName}</h4>
                            <span className="text-xs text-gray-500">{thread.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{thread.parentName}</p>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {thread.messages[thread.messages.length - 1]?.text}
                          </p>
                        </div>
                        {thread.unreadCount > 0 && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                            {thread.unreadCount}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat View */}
          {selectedThread && selectedThreadData ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedThread(null)}
                    className="sm:hidden w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                    {selectedThreadData.childName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-gray-900">{selectedThreadData.childName}</h4>
                    <p className="text-sm text-gray-600">{selectedThreadData.parentName}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="space-y-4">
                  {selectedThreadData.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === 'staff' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.sender === 'staff'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'staff' ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Skriv en melding til foreldre..."
                    maxLength={1000}
                    className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 disabled:bg-gray-300 text-white rounded-xl transition-all shadow-sm flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">{message.length}/1000 tegn</p>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex flex-1 items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h4 className="text-gray-900 mb-2">Velg en samtale</h4>
                <p className="text-sm text-gray-500">
                  Velg en samtale fra listen for å se meldinger
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
