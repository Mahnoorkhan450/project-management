"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (
    value: string
  ) => void;
}

const TabsContext =
  createContext<
    TabsContextType | undefined
  >(undefined);

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

export function Tabs({
  defaultValue,
  children,
}: TabsProps) {
  const [activeTab, setActiveTab] =
    useState(defaultValue);

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
}

export function TabsList({
  children,
}: TabsListProps) {
  return (
    <div className="flex gap-1 border-b border-slate-200">
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

export function TabsTrigger({
  value,
  children,
}: TabsTriggerProps) {
  const context =
    useContext(TabsContext);

  if (!context) {
    throw new Error(
      "TabsTrigger must be used inside Tabs"
    );
  }

  const active =
    context.activeTab === value;

  return (
    <button
      type="button"
      onClick={() =>
        context.setActiveTab(value)
      }
      className={`
        border-b-2 px-4 py-3 text-sm font-medium
        ${
          active
            ? "border-slate-900 text-slate-900"
            : "border-transparent text-slate-500 hover:text-slate-800"
        }
      `}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

export function TabsContent({
  value,
  children,
}: TabsContentProps) {
  const context =
    useContext(TabsContext);

  if (!context) {
    throw new Error(
      "TabsContent must be used inside Tabs"
    );
  }

  if (context.activeTab !== value) {
    return null;
  }

  return (
    <div className="pt-5">
      {children}
    </div>
  );
}