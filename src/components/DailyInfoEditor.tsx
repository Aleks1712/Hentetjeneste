import { useState } from 'react';
import { X, Calendar, UtensilsCrossed, Sparkles, Megaphone, Plus, Edit2, Trash2, Save } from 'lucide-react';
import { DailyInfo } from '../data/mockData';

interface DailyInfoEditorProps {
  info: DailyInfo[];
  onClose: () => void;
  onSave: (updatedInfo: DailyInfo[]) => void;
}

export function DailyInfoEditor({ info, onClose, onSave }: DailyInfoEditorProps) {
  const [items, setItems] = useState<DailyInfo[]>(info);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddNew, setShowAddNew] = useState(false);

  // New item form
  const [newItem, setNewItem] = useState<Partial<DailyInfo>>({
    type: 'announcement',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

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

  const handleEdit = (itemId: string) => {
    setEditingId(itemId);
  };

  const handleSaveEdit = (itemId: string, updatedTitle: string, updatedDescription: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, title: updatedTitle, description: updatedDescription }
        : item
    ));
    setEditingId(null);
  };

  const handleDelete = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleAddNew = () => {
    if (newItem.title && newItem.description) {
      const newDailyInfo: DailyInfo = {
        id: `info-${Date.now()}`,
        type: newItem.type as 'menu' | 'activity' | 'announcement',
        title: newItem.title,
        description: newItem.description,
        date: newItem.date || new Date().toISOString().split('T')[0],
        targetGroup: newItem.targetGroup,
      };
      setItems([...items, newDailyInfo]);
      setNewItem({
        type: 'announcement',
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowAddNew(false);
    }
  };

  const handleSaveAll = () => {
    onSave(items);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl text-gray-900">Rediger daglig info</h2>
              <p className="text-sm text-gray-600">Oppdater informasjon som sendes til foreldre</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Add New Button */}
          <button
            onClick={() => setShowAddNew(!showAddNew)}
            className="w-full mb-6 p-4 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-2xl transition-all flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <Plus className="w-5 h-5" />
            <span>Legg til ny info</span>
          </button>

          {/* Add New Form */}
          {showAddNew && (
            <div className="mb-6 bg-blue-50 rounded-2xl border-2 border-blue-200 p-6">
              <h3 className="text-gray-900 mb-4">Ny informasjon</h3>
              
              <div className="space-y-4">
                {/* Type selector */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="announcement">Beskjed</option>
                    <option value="menu">Matmeny</option>
                    <option value="activity">Aktivitet</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Tittel</label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="F.eks: Fiskeboller og grønnsaker"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Beskrivelse</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    placeholder="Skriv mer detaljer..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Dato</label>
                  <input
                    type="date"
                    value={newItem.date}
                    onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Group (optional) */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Gruppe (valgfritt)</label>
                  <select
                    value={newItem.targetGroup || ''}
                    onChange={(e) => setNewItem({ ...newItem, targetGroup: e.target.value || undefined })}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Alle grupper</option>
                    <option value="Blåklokka">Blåklokka</option>
                    <option value="Solstråla">Solstråla</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddNew}
                    disabled={!newItem.title || !newItem.description}
                    className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Legg til
                  </button>
                  <button
                    onClick={() => setShowAddNew(false)}
                    className="h-11 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors"
                  >
                    Avbryt
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Existing Items */}
          <div className="space-y-3">
            {items.map((item) => {
              const Icon = getInfoIcon(item.type);
              const isEditing = editingId === item.id;
              const [editTitle, setEditTitle] = useState(item.title);
              const [editDescription, setEditDescription] = useState(item.description);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-200 p-5"
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(item.id, editTitle, editDescription)}
                          className="h-10 px-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Lagre
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="h-10 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors"
                        >
                          Avbryt
                        </button>
                      </div>
                    </div>
                  ) : (
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
                        <div className="flex items-center gap-3">
                          {item.targetGroup && (
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              <span className="text-xs text-purple-700">For {item.targetGroup}</span>
                            </div>
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString('no-NO', { day: 'numeric', month: 'long' })}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="w-9 h-9 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors flex items-center justify-center"
                          title="Rediger"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="w-9 h-9 hover:bg-red-100 text-red-600 rounded-xl transition-colors flex items-center justify-center"
                          title="Slett"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {items.length} element{items.length !== 1 ? 'er' : ''}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="h-11 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors"
            >
              Avbryt
            </button>
            <button
              onClick={handleSaveAll}
              className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Lagre alle endringer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
