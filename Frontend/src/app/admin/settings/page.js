// src/app/admin/settings/page.js
'use client'; // Diperlukan untuk state pada komponen ToggleSwitch

import React, { useState } from 'react';

// --- Icon Components ---
const LaptopIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
    </svg>
);

const PhoneIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
);

// --- Reusable Components ---

const SettingsCard = ({ title, description, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
      {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
    <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
      {children}
    </div>
  </div>
);

const InputGroup = ({ label, type = 'text', id, value, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      defaultValue={value}
      placeholder={placeholder}
      className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

const ToggleSwitch = ({ label, description, enabled, setEnabled }) => (
  <div className="flex items-center justify-between">
    <div>
      <h4 className="font-medium text-gray-800 dark:text-gray-200">{label}</h4>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`${enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
    >
      <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
    </button>
  </div>
);

const ActionButton = ({ children }) => (
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg self-start">
        {children}
    </button>
);


const ActiveSession = ({ icon, deviceName, location, lastActive }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
        <div className="flex items-center gap-4">
            {icon}
            <div>
                <p className="font-semibold text-gray-800 dark:text-white">{deviceName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{location} • {lastActive}</p>
            </div>
        </div>
        <button className="text-sm font-medium text-red-500 hover:text-red-700 dark:hover:text-red-400">
            Logout
        </button>
    </div>
)

// --- Page Component ---

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
        <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
          Manage your account and application preferences
        </p>
      </div>
      
      {/* General Settings */}
      <SettingsCard title="General Settings">
        <InputGroup label="Site Title" id="siteTitle" value="ChronoNews Dashboard" />
        <InputGroup label="Default Language" id="language" value="English" />
        <InputGroup label="Timezone" id="timezone" value="UTC (GMT+0)" />
        <ActionButton>Save Changes</ActionButton>
      </SettingsCard>

      {/* Profile & Account */}
      <SettingsCard title="Profile & Account">
        <InputGroup label="Admin Name" id="adminName" value="John Smith" />
        <InputGroup label="Email Address" id="email" value="john.smith@chrononews.com" />
        <InputGroup label="Current Password" id="currentPassword" type="password" placeholder="Enter current password" />
        <InputGroup label="New Password" id="newPassword" type="password" placeholder="Enter new password" />
        <InputGroup label="Confirm New Password" id="confirmPassword" type="password" placeholder="Confirm new password" />
        <ActionButton>Save Changes</ActionButton>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard title="Notifications">
        <ToggleSwitch 
            label="Email Notifications" 
            description="Receive email updates about your account"
            enabled={emailNotifications}
            setEnabled={setEmailNotifications}
        />
        <ToggleSwitch 
            label="In-App Notifications" 
            description="Receive alerts directly in the dashboard"
            enabled={inAppNotifications}
            setEnabled={setInAppNotifications}
        />
        <div className="flex items-start">
            <div className="flex h-5 items-center">
                <input id="weekly-summary" name="weekly-summary" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="weekly-summary" className="font-medium text-gray-700 dark:text-gray-300">Receive Weekly Summary Reports</label>
            </div>
        </div>
        <ActionButton>Save Changes</ActionButton>
      </SettingsCard>

       {/* Security Settings */}
       <SettingsCard title="Security Settings">
        <ToggleSwitch
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            enabled={twoFactor}
            setEnabled={setTwoFactor}
        />
        <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Active Sessions</h4>
            <div className="mt-2 space-y-2">
                <ActiveSession icon={<LaptopIcon className="h-6 w-6 text-gray-500" />} deviceName="MacBook Pro" location="San Francisco, US" lastActive="Active now" />
                <ActiveSession icon={<PhoneIcon className="h-6 w-6 text-gray-500" />} deviceName="iPhone 12" location="San Francisco, US" lastActive="2 hours ago" />
                <ActiveSession icon={<LaptopIcon className="h-6 w-6 text-gray-500" />} deviceName="Windows PC" location="New York, US" lastActive="3 days ago" />
            </div>
        </div>
        <ActionButton>Save Changes</ActionButton>
       </SettingsCard>
    </div>
  );
}