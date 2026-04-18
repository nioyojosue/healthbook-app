import React from 'react';

export function SimpleLineChart({ data, title, xLabel, yLabel, height = 300 }) {
  if (!data || data.length === 0) {
    return <div className="text-center text-text-secondary py-8">Pas de données</div>;
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const width = 100;
  const chartWidth = width - 20;
  const chartHeight = height - 60;
  const padding = 10;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * (chartWidth - padding * 2) + padding;
      const y =
        chartHeight -
        ((d.value - minValue) / range) * (chartHeight - padding * 2) -
        padding;
      return { x, y, ...d };
    })
    .filter((p) => !isNaN(p.x) && !isNaN(p.y));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      {title && <h3 className="text-lg font-semibold text-text mb-4">{title}</h3>}
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="mb-4">
        {/* Grid lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`grid-${i}`}
            x1="15"
            y1={10 + (i * (chartHeight - 20)) / 4}
            x2={width - 5}
            y2={10 + (i * (chartHeight - 20)) / 4}
            stroke="#E5E7EB"
            strokeWidth="0.5"
          />
        ))}

        {/* Axes */}
        <line x1="15" y1="10" x2="15" y2={height - 20} stroke="#9CA3AF" strokeWidth="1" />
        <line x1="15" y1={height - 20} x2={width - 5} y2={height - 20} stroke="#9CA3AF" strokeWidth="1" />

        {/* Line */}
        <path d={pathD} stroke="#2A7DE1" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Points */}
        {points.map((p, i) => (
          <circle key={`point-${i}`} cx={p.x} cy={p.y} r="3" fill="#2A7DE1" />
        ))}

        {/* Labels */}
        <text x="50%" textAnchor="middle" y={height - 5} fontSize="10" fill="#6B7280">
          {xLabel}
        </text>
        <text
          x="10"
          y="15"
          fontSize="10"
          fill="#6B7280"
          textAnchor="end"
        >
          {yLabel}
        </text>
      </svg>
    </div>
  );
}

export function SimpleBarChart({ data, title, xLabel, yLabel, height = 300 }) {
  if (!data || data.length === 0) {
    return <div className="text-center text-text-secondary py-8">Pas de données</div>;
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const width = 100;
  const chartWidth = width - 20;
  const chartHeight = height - 60;
  const barWidth = (chartWidth - data.length * 2) / data.length;
  const padding = 10;

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      {title && <h3 className="text-lg font-semibold text-text mb-4">{title}</h3>}
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="mb-4">
        {/* Grid lines */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={`grid-${i}`}
            x1="15"
            y1={10 + (i * (chartHeight - 20)) / 4}
            x2={width - 5}
            y2={10 + (i * (chartHeight - 20)) / 4}
            stroke="#E5E7EB"
            strokeWidth="0.5"
          />
        ))}

        {/* Axes */}
        <line x1="15" y1="10" x2="15" y2={height - 20} stroke="#9CA3AF" strokeWidth="1" />
        <line x1="15" y1={height - 20} x2={width - 5} y2={height - 20} stroke="#9CA3AF" strokeWidth="1" />

        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = (d.value / maxValue) * (chartHeight - padding * 2);
          const x = 15 + padding + i * (barWidth + 2);
          const y = height - 20 - barHeight;

          return (
            <g key={`bar-${i}`}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="#2A7DE1"
                rx="2"
              />
              <text
                x={x + barWidth / 2}
                y={height - 25}
                fontSize="9"
                fill="#6B7280"
                textAnchor="middle"
              >
                {d.label}
              </text>
            </g>
          );
        })}

        {/* Labels */}
        <text x="50%" textAnchor="middle" y={height - 5} fontSize="10" fill="#6B7280">
          {xLabel}
        </text>
      </svg>
    </div>
  );
}

export function ProgressBar({ label, value, max = 100, color = 'primary' }) {
  const percentage = (value / max) * 100;
  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium text-text">{label}</p>
        <p className="text-sm text-text-secondary">
          {value}/{max}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${colorClasses[color]} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-border p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="space-y-2 mb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  );
}
