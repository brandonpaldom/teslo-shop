'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface ProfileTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  children: React.ReactNode;
}

export default function ProfileTabs({
  tabs,
  defaultTab,
  children,
}: ProfileTabsProps) {
  const initialTab = defaultTab || tabs[0]?.id || '';
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="w-full">
      <div className="border-neutral-200 border-b">
        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              aria-current={activeTab === tab.id ? 'page' : undefined}
              className={clsx(
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700',
                'whitespace-nowrap border-b-2 px-1 py-4 font-medium text-sm'
              )}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {React.Children.toArray(children).map((child, index) => {
          if (index >= tabs.length) {
            return null;
          }

          return (
            <div
              className={clsx(
                activeTab === tabs[index].id ? 'block' : 'hidden'
              )}
              key={tabs[index].id}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
