import { useState } from 'react';
import { ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import type { Child } from '../data/mockData';

interface ChildCardProps {
  child: Child;
  onSelect: () => void;
  isSelected: boolean;
  viewType: 'parent' | 'staff';
  onApprovePickup?: (childId: string) => void;
}

export function ChildCard({ child, onSelect, isSelected, viewType, onApprovePickup }: ChildCardProps) {
  const [localStatus, setLocalStatus] = useState(child.status);
  const [checkInTime, setCheckInTime] = useState(child.checkInTime);
  const [checkOutTime, setCheckOutTime] = useState(child.checkOutTime);
  const [pickupStatus, setPickupStatus] = useState(child.pickupStatus);

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    setLocalStatus('present');
    setCheckInTime(timeString);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    setLocalStatus('home');
    setCheckOutTime(timeString);
  };

  const handleApprovePickup = () => {
    setPickupStatus('approved');
    if (onApprovePickup) {
      onApprovePickup(child.id);
    }
  };

  const getStatusBadge = () => {
    switch (localStatus) {
      case 'present':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Til stede
          </span>
        );
      case 'home':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            Hjemme
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-2xl border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-blue-600 shadow-sm'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="p-6">
        {/* Child Info */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl">{child.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0 pt-2">
            <h4 className="text-gray-900 truncate mb-1">{child.name}</h4>
            <p className="text-sm text-gray-500">{child.group}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-5">
          {getStatusBadge()}
        </div>

        {/* Time Info */}
        {(checkInTime || checkOutTime) && (
          <div className="mb-5 space-y-2">
            {checkInTime && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ArrowRight className="w-4 h-4 text-green-600" />
                <span>Inn: {checkInTime}</span>
              </div>
            )}
            {checkOutTime && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ArrowLeft className="w-4 h-4 text-gray-600" />
                <span>Ut: {checkOutTime}</span>
              </div>
            )}
          </div>
        )}

        {/* Pickup Status (Staff View Only) */}
        {viewType === 'staff' && pickupStatus === 'pending' && (
          <div className="mb-5 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-yellow-800">
              <Clock className="w-4 h-4" />
              <span>Henting forespurt av {child.pickupPerson}</span>
            </div>
          </div>
        )}

        {/* Approved Pickup Status */}
        {viewType === 'staff' && pickupStatus === 'approved' && (
          <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Klar til henting av {child.pickupPerson}</span>
            </div>
          </div>
        )}

        {/* Action Buttons (Staff View Only) */}
        {viewType === 'staff' && (
          <div className="flex gap-3">
            {localStatus === 'home' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckIn();
                }}
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl transition-colors shadow-sm"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Kryss inn</span>
              </button>
            )}
            
            {localStatus === 'present' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckOut();
                }}
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white rounded-xl transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kryss ut</span>
              </button>
            )}

            {pickupStatus === 'pending' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprovePickup();
                }}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl transition-colors shadow-sm"
              >
                Godkjenn
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}