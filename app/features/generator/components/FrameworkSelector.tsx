'use client';

import { Framework } from '@/app/lib/types';

interface FrameworkSelectorProps {
  selected: Framework;
  onSelect: (framework: Framework) => void;
  disabled?: boolean;
}

const frameworkInfo: Record<Framework, { label: string; icon: string; color: string }> = {
  react: { label: 'React', icon: '⚛️', color: 'bg-blue-500' },
  vue: { label: 'Vue', icon: '💚', color: 'bg-green-500' },
  svelte: { label: 'Svelte', icon: '🔥', color: 'bg-orange-500' },
};

export function FrameworkSelector({
  selected,
  onSelect,
  disabled = false,
}: FrameworkSelectorProps) {
  const frameworks: Framework[] = ['react', 'vue', 'svelte'];

  return (
    <div className="flex flex-wrap gap-3">
      {frameworks.map((framework) => {
        const info = frameworkInfo[framework];
        const isSelected = selected === framework;

        return (
          <button
            key={framework}
            onClick={() => onSelect(framework)}
            disabled={disabled}
            className={`
              px-5 py-3 rounded-lg font-medium transition-all
              ${isSelected
                ? `${info.color} text-white shadow-md transform scale-105`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
              }
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            `}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{info.icon}</span>
              <span>{info.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
