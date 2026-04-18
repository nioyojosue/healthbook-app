import React from 'react';

export function StatsCard({ title, value, icon, trend, color = 'primary' }) {
  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
  };

  const trendClasses = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-text-secondary',
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-text">{value}</p>
          {trend && (
            <p className={`text-sm font-medium mt-2 ${trendClasses[trend.type]}`}>
              {trend.type === 'up' && '↑'} {trend.type === 'down' && '↓'} {trend.value}
            </p>
          )}
        </div>
        {icon && (
          <div className={`${colorClasses[color]} text-white rounded-lg p-4 text-2xl`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-border p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
}
