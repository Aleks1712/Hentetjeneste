import { useState } from 'react';
import { Plus, Check, Clock, UserPlus, Ban, Shield } from 'lucide-react';
import { ConsentModal } from './ConsentModal';
import { mockApprovedPersons } from '../data/mockData';

interface ApprovedPersonsProps {
  childId: string;
}

export function ApprovedPersons({ childId }: ApprovedPersonsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [blockedPersons, setBlockedPersons] = useState<string[]>([]); // NEW: Track blocked persons
  const [newPerson, setNewPerson] = useState({
    name: '',
    relation: '',
    phone: '',
  });

  const persons = mockApprovedPersons.filter(p => p.childId === childId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConsent(true);
  };

  const handleApprove = () => {
    // Handle approval
    setShowConsent(false);
    setShowAddForm(false);
    setNewPerson({ name: '', relation: '', phone: '' });
  };

  // NEW: Toggle block/unblock person
  const toggleBlockPerson = (personId: string) => {
    setBlockedPersons(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900">Godkjente hentepersoner</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">Legg til</span>
        </button>
      </div>

      {/* NEW: Control info banner */}
      <div className="mb-6 bg-purple-50 rounded-xl p-4 border border-purple-200">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm text-purple-900 mb-1">Full kontroll</h4>
            <p className="text-xs text-purple-700 leading-relaxed">
              Du kan midlertidig blokkere personer fra å hente. De vil ikke kunne sende hentemelding før du aktiverer dem igjen.
            </p>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Navn</label>
              <input
                type="text"
                value={newPerson.name}
                onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Relasjon</label>
              <select
                value={newPerson.relation}
                onChange={(e) => setNewPerson({ ...newPerson, relation: e.target.value })}
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                required
              >
                <option value="">Velg relasjon</option>
                <option value="Forelder">Forelder</option>
                <option value="Besteforelder">Besteforelder</option>
                <option value="Tante/Onkel">Tante/Onkel</option>
                <option value="Annen">Annen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Telefon</label>
              <input
                type="tel"
                value={newPerson.phone}
                onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value })}
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                required
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all shadow-sm"
              >
                Fortsett til samtykke
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="h-12 px-6 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border border-gray-200 transition-colors"
              >
                Avbryt
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Persons List */}
      <div className="space-y-3">
        {persons.map(person => {
          const isBlocked = blockedPersons.includes(person.id);
          
          return (
            <div
              key={person.id}
              className={`flex items-center justify-between p-5 rounded-xl border transition-colors ${
                isBlocked 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <p className={`text-gray-900 ${isBlocked ? 'line-through text-gray-500' : ''}`}>
                    {person.name}
                  </p>
                  {isBlocked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                      <Ban className="w-3 h-3" />
                      Blokkert
                    </span>
                  ) : person.status === 'approved' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                      <Check className="w-3 h-3" />
                      Godkjent
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                      <Clock className="w-3 h-3" />
                      Ventende
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{person.relation}</p>
                <p className="text-sm text-gray-500">{person.phone}</p>
                {person.status === 'approved' && !isBlocked && (
                  <p className="text-xs text-gray-500 mt-1">Samtykket gitt: 26.11.2025</p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {/* NEW: Block/Unblock button */}
                {person.status === 'approved' && (
                  <button 
                    onClick={() => toggleBlockPerson(person.id)}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors group ${
                      isBlocked
                        ? 'bg-green-50 hover:bg-green-100 border-green-300 hover:border-green-400'
                        : 'bg-white hover:bg-orange-50 border-gray-200 hover:border-orange-300'
                    }`}
                    title={isBlocked ? 'Aktiver igjen' : 'Blokker midlertidig'}
                  >
                    {isBlocked ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Ban className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                    )}
                  </button>
                )}
                
                {/* Delete button */}
                <button className="w-10 h-10 bg-white hover:bg-red-50 rounded-xl border border-gray-200 hover:border-red-300 flex items-center justify-center transition-colors group">
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {persons.length === 0 && !showAddForm && (
        <div className="text-center py-8">
          <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Ingen godkjente hentepersoner ennå</p>
          <p className="text-sm text-gray-400 mt-1">Klikk "Legg til" for å legge til en ny person</p>
        </div>
      )}

      {/* Consent Modal */}
      {showConsent && (
        <ConsentModal
          personName={newPerson.name}
          relation={newPerson.relation}
          childName="Emma Hansen"
          onApprove={handleApprove}
          onCancel={() => setShowConsent(false)}
        />
      )}
    </div>
  );
}