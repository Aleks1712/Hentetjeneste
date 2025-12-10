import { Shield, AlertTriangle } from 'lucide-react';

interface ConsentModalProps {
  personName: string;
  relation: string;
  childName: string;
  onApprove: () => void;
  onCancel: () => void;
}

export function ConsentModal({
  personName,
  relation,
  childName,
  onApprove,
  onCancel,
}: ConsentModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center">
            <Shield className="w-7 h-7 text-yellow-600" />
          </div>
          <h3 className="text-xl text-gray-900">Samtykke til henting</h3>
        </div>

        {/* Person Info */}
        <div className="mb-8">
          <p className="text-gray-900 mb-4">Du er i ferd med å godkjenne:</p>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-gray-600">Person:</span>
              <span className="text-gray-900">{personName}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600">Relasjon:</span>
              <span className="text-gray-900">{relation}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-600">Barn:</span>
              <span className="text-gray-900">{childName}</span>
            </div>
          </div>
        </div>

        {/* Warning Box */}
        <div className="mb-8 p-5 bg-yellow-50 rounded-xl border border-yellow-200">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <h4 className="text-gray-900">Viktig informasjon:</h4>
          </div>
          <ul className="space-y-3 text-sm text-gray-700 ml-8">
            <li className="leading-relaxed">
              Ved å godkjenne gir du denne personen lov til å hente {childName.split(' ')[0]}
            </li>
            <li className="leading-relaxed">
              Personalet vil sjekke legitimasjon ved henting
            </li>
            <li className="leading-relaxed">
              Du kan trekke tilbake samtykket når som helst
            </li>
          </ul>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Ved å bekrefte samtykker du eksplisitt til at <strong>{personName}</strong> kan hente
          barnet ditt fra barnehagen.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-12 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border border-gray-200 transition-colors"
          >
            Avbryt
          </button>
          <button
            onClick={onApprove}
            className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all shadow-sm"
          >
            Jeg godkjenner og samtykker
          </button>
        </div>
      </div>
    </div>
  );
}