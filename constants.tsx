
import React from 'react';
import { 
  Zap, 
  UserCheck, 
  Trash2, 
  Accessibility, 
  DollarSign, 
  Clock, 
  Heart,
  ShieldCheck,
  Coffee
} from 'lucide-react';
import { Metric, Tone } from './types';

export const METRICS: Metric[] = [
  { id: 'quality', label: 'Quality', icon: 'Zap' },
  { id: 'service', label: 'Service', icon: 'UserCheck' },
  { id: 'cleanliness', label: 'Cleanliness', icon: 'Trash2' },
  { id: 'accessibility', label: 'Accessibility', icon: 'Accessibility' },
  { id: 'value', label: 'Value for Money', icon: 'DollarSign' },
  { id: 'speed', label: 'Wait Time / Speed', icon: 'Clock' },
  { id: 'atmosphere', label: 'Atmosphere', icon: 'Coffee' },
  { id: 'safety', label: 'Safety', icon: 'ShieldCheck' },
];

export const TONES: Tone[] = [
  Tone.PROFESSIONAL,
  Tone.ENTHUSIASTIC,
  Tone.CASUAL,
  Tone.CONSTRUCTIVE,
  Tone.CRITICAL,
  Tone.HUMOROUS,
];

export const getIcon = (iconName: string, className?: string) => {
  const icons: Record<string, React.ReactNode> = {
    Zap: <Zap className={className} size={18} />,
    UserCheck: <UserCheck className={className} size={18} />,
    Trash2: <Trash2 className={className} size={18} />,
    Accessibility: <Accessibility className={className} size={18} />,
    DollarSign: <DollarSign className={className} size={18} />,
    Clock: <Clock className={className} size={18} />,
    Coffee: <Coffee className={className} size={18} />,
    ShieldCheck: <ShieldCheck className={className} size={18} />,
    Heart: <Heart className={className} size={18} />,
  };
  return icons[iconName] || <Zap className={className} size={18} />;
};
