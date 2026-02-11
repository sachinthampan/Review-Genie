
import React from 'react';
import { getIcon } from '../constants';
import { Metric } from '../types';

interface MetricToggleProps {
  metric: Metric;
  status: 'positive' | 'negative' | 'neutral';
  onChange: (id: string, status: 'positive' | 'negative' | 'neutral') => void;
}

const MetricToggle: React.FC<MetricToggleProps> = ({ metric, status, onChange }) => {
  const cycleStatus = () => {
    if (status === 'neutral') onChange(metric.id, 'positive');
    else if (status === 'positive') onChange(metric.id, 'negative');
    else onChange(metric.id, 'neutral');
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'positive':
        return 'bg-green-100 text-green-700 border-green-200 ring-2 ring-green-500 ring-offset-1';
      case 'negative':
        return 'bg-red-100 text-red-700 border-red-200 ring-2 ring-red-500 ring-offset-1';
      default:
        return 'bg-white text-slate-600 border-slate-200 hover:border-slate-300';
    }
  };

  return (
    <button
      type="button"
      onClick={cycleStatus}
      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${getStatusStyles()}`}
    >
      <div className="mb-1">{getIcon(metric.icon)}</div>
      <span className="text-xs font-medium text-center">{metric.label}</span>
      <div className="mt-1">
        {status === 'positive' && <span className="text-[10px] font-bold uppercase">Great</span>}
        {status === 'negative' && <span className="text-[10px] font-bold uppercase">Poor</span>}
        {status === 'neutral' && <span className="text-[10px] font-bold uppercase text-slate-400">N/A</span>}
      </div>
    </button>
  );
};

export default MetricToggle;
