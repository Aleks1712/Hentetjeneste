import { X } from 'lucide-react';

interface Child {
  id: string;
  name: string;
  group?: string;
  status?: string;
}

interface ChildSelectorProps {
  children: Child[];
  onSelect: (childId: string) => void;
  onClose: () => void;
  title?: string;
  description?: string;
}

export function ChildSelector({ children, onSelect, onClose, title = 'Velg barn', description }: ChildSelectorProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-xl text-gray-900">{title}</h2>
            {description && <p className="text-sm text-gray-600">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Children List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {children.map(child => (
              <button
                key={child.id}
                onClick={() => {
                  onSelect(child.id);
                  onClose();
                }}
                className="w-full flex items-center gap-3 p-4 bg-white hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all text-left"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  {child.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 mb-0.5 truncate">{child.name}</p>
                  {child.group && (
                    <p className="text-xs text-gray-500">{child.group}</p>
                  )}
                </div>
                {child.status === 'present' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    Til stede
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
