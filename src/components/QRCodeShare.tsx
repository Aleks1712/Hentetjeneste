import { useState } from 'react';
import { QrCode, Copy, Check, Share2 } from 'lucide-react';
import { Button } from './ui/button';

interface QRCodeShareProps {
  url?: string;
}

export function QRCodeShare({ url = window.location.href }: QRCodeShareProps) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Generate QR code URL using API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hentetjeneste - Digital barnehageløsning',
          text: 'Sjekk ut vår nye barnehage-app!',
          url: url,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      setShowQR(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Share2 className="size-5 text-white" />
        </div>
        <div>
          <h3 className="text-gray-900">Del appen</h3>
          <p className="text-sm text-gray-500">La andre teste løsningen</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* URL Display */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">App URL:</p>
          <div className="flex items-center gap-2">
            <code className="text-sm text-blue-600 flex-1 truncate">
              {url}
            </code>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyUrl}
              className="shrink-0"
            >
              {copied ? (
                <Check className="size-4 text-green-600" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Share2 className="size-4 mr-2" />
            Del
          </Button>
          <Button
            onClick={() => setShowQR(!showQR)}
            variant="outline"
            className="flex-1"
          >
            <QrCode className="size-4 mr-2" />
            {showQR ? 'Skjul QR' : 'Vis QR'}
          </Button>
        </div>

        {/* QR Code */}
        {showQR && (
          <div className="mt-4 p-4 bg-white border-2 border-gray-200 rounded-xl">
            <div className="text-center">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="mx-auto mb-3 rounded-lg"
                style={{ width: '250px', height: '250px' }}
              />
              <p className="text-sm text-gray-600 mb-2">
                Scan med mobil-kamera for å åpne appen
              </p>
              <p className="text-xs text-gray-500">
                Android: Kamera → Pek på QR<br />
                iPhone: Kamera → Trykk på notifikasjon
              </p>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 mt-4">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Slik installerer du appen:
          </h4>
          
          <div className="space-y-3 text-xs text-blue-800">
            <div>
              <div className="font-semibold mb-1">Android (Chrome/Edge):</div>
              <p className="leading-relaxed">
                1. Åpne lenken i Chrome<br />
                2. Trykk &quot;Installer&quot; når banner dukker opp<br />
                3. Appen legges til hjemskjermen
              </p>
            </div>
            \n            <div>
              <div className="font-semibold mb-1">iOS (Safari):</div>
              <p className="leading-relaxed">
                1. Åpne lenken i Safari<br />
                2. Trykk Del-knappen (firkant med pil)<br />
                3. Velg &quot;Legg til på Hjem-skjerm&quot;<br />
                4. Appen legges til hjemskjermen
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}