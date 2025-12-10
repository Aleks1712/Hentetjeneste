import { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';

interface ChatModalProps {
  childName: string;
  onClose: () => void;
}

export function ChatModal({ childName, onClose }: ChatModalProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'parent' | 'staff'; time: string }>>([
    { text: 'Hei! Emma hadde en flott dag i dag. Hun var veldig aktiv ute!', sender: 'staff', time: '14:22' },
    { text: 'Takk for meldingen! Hvor lenge var dere ute?', sender: 'parent', time: '14:35' },
    { text: 'Vi var ute fra 10:00 til 11:30. Emma lekte med Lucas og Sofia på klatrestativet.', sender: 'staff', time: '14:37' },
    { text: 'Fint! Hun er så glad i å klatre. Spiste hun godt til lunsj?', sender: 'parent', time: '14:40' },
    { text: 'Ja, hun spiste opp alt og tok til og med påfyll av suppe!', sender: 'staff', time: '14:42' },
    { text: 'Supert! Takk for at dere tar så godt vare på henne.', sender: 'parent', time: '14:45' },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { text: message, sender: 'parent', time: timeString }]);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-200">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg shadow-sm">
            {childName.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900">{childName}</h3>
            <p className="text-sm text-gray-600">Chat med barnehagen</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-1">Ingen meldinger ennå</p>
              <p className="text-sm text-gray-500">Send første melding!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.sender === 'parent'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === 'parent' ? 'text-purple-100' : 'text-gray-500'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Skriv en melding..."
              maxLength={1000}
              className="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 active:from-purple-800 active:to-purple-900 disabled:bg-gray-300 text-white rounded-xl transition-all shadow-sm flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">{message.length}/1000 tegn</p>
        </div>
      </div>
    </div>
  );
}