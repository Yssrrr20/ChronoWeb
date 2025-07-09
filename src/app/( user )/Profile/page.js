// src/app/(user)/profile/page.js

'use client';
import React from 'react';
import Image from 'next/image'; // Menggunakan Image dari next/image untuk optimasi gambar

export default function ProfilePage() {
  // Contoh data user (nantinya bisa diambil dari API atau konteks otentikasi)
  const user = {
    name: 'Alex',
    email: 'alex@email.com',
    lastLogin: 'Today at 10:30 AM',
    phone: '+62 888888888',
    avatar: '/path/to/alex-avatar.jpg', // Ganti dengan path gambar avatar yang sebenarnya
    readingHistory: [
      'AI',
      'Botol Plastik',
      'Film Jumbo',
      'Penyakit Ginjal',
      'Roket NASA',
    ],
    notifications: {
      email: true,
      push: false,
      newsletter: true,
    },
    security: {
      twoFactor: 'Enabled Via Authenticator App',
      connectedDevices: 2,
    },
  };

  // State untuk toggle notifikasi (contoh sederhana)
  const [emailNotifications, setEmailNotifications] = React.useState(user.notifications.email);
  const [pushNotifications, setPushNotifications] = React.useState(user.notifications.push);
  const [newsletterSubscription, setNewsletterSubscription] = React.useState(user.notifications.newsletter);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Top Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0">
          <Image
            src={user.avatar || '/placeholder-avatar.jpg'} // Gunakan placeholder jika avatar tidak ada
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full object-cover border-2 border-blue-500"
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Last login: {user.lastLogin}</p>
          <div className="mt-4 flex space-x-3 justify-center sm:justify-start">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
            <button className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Account Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                id="fullName"
                defaultValue={user.name}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                defaultValue={user.email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <input
                type="text"
                id="phone"
                defaultValue={user.phone}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Reading History */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
            <span className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13.5m0-13.5c-4.148 0-7.5 3.352-7.5 7.5s3.352 7.5 7.5 7.5 7.5-3.352 7.5-7.5-3.352-7.5-7.5-7.5z" />
              </svg>
              Reading History
            </span>
            <a href="#" className="text-blue-600 hover:underline text-sm font-medium">View All &gt;</a>
          </h3>
          <ul className="space-y-2">
            {user.readingHistory.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 text-sm flex items-center">
                <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17l-3 3m0 0l-3-3m3 3V10m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Notification Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Email Notifications</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Receive updates via email</p>
              </div>
              <label htmlFor="emailToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="emailToggle"
                  className="sr-only peer"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Push Notifications</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Get instant notifications</p>
              </div>
              <label htmlFor="pushToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="pushToggle"
                  className="sr-only peer"
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">Newsletter Subscription</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Weekly news digest</p>
              </div>
              <label htmlFor="newsletterToggle" className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="newsletterToggle"
                  className="sr-only peer"
                  checked={newsletterSubscription}
                  onChange={() => setNewsletterSubscription(!newsletterSubscription)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.618a9 9 0 11-12.728 0 9 9 0 0112.728 0z" />
            </svg>
            Account Security
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Two-Factor Authentication</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user.security.twoFactor}</p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">Connected Devices</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{user.security.connectedDevices} devices currently active</p>
              <button className="mt-3 w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                Logout from all devices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}