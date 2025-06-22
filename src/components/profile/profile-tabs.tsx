"use client";

import React, { useState } from "react";
import clsx from "clsx";

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
  children 
}: ProfileTabsProps) {
  const initialTab = defaultTab || (tabs[0]?.id || "");
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="w-full">
      <div className="border-b border-neutral-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700",
                "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
              )}
              aria-current={activeTab === tab.id ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6">
        {React.Children.toArray(children).map((child, index) => {
          if (index >= tabs.length) return null;
          
          return (
            <div
              key={tabs[index].id}
              className={clsx(
                activeTab === tabs[index].id ? "block" : "hidden"
              )}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}