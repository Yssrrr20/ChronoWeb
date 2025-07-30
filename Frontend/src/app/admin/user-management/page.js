// src/app/admin/user-management/page.js
import React from 'react';

const PlusIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

// Data contoh untuk user
const mockUsers = [
  {
    id: 'usr_001',
    avatarUrl: null,
    name: 'Maman Asep',
    email: 'sarah.j@chrononews.com',
    role: 'Admin',
    joinDate: 'Dec 1, 2023',
    status: 'Active',
  },
  {
    id: 'usr_002',
    avatarUrl: null,
    name: 'Lebron James',
    email: 'm.chen@chrononews.com',
    role: 'Author',
    joinDate: 'Jan 15, 2024',
    status: 'Active',
  },
  {
    id: 'usr_003',
    avatarUrl: null,
    name: 'Suzu Hirose',
    email: 'e.wilson@chrononews.com',
    role: 'Reader',
    joinDate: 'Jan 20, 2024',
    status: 'Suspended',
  },
];

export default function UserManagementPage() {
  // Fungsi kecil untuk mendapatkan inisial dari nama
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
  };

  // Fungsi untuk styling badge Role
  const RoleBadge = ({ role }) => {
    let bgColor = 'bg-gray-200 dark:bg-gray-600';
    let textColor = 'text-gray-700 dark:text-gray-200';
    if (role === 'Admin') {
      bgColor = 'bg-blue-100 dark:bg-blue-700';
      textColor = 'text-blue-700 dark:text-blue-100';
    } else if (role === 'Author') {
      bgColor = 'bg-green-100 dark:bg-green-700';
      textColor = 'text-green-700 dark:text-green-100';
    } else if (role === 'Reader') {
      bgColor = 'bg-purple-100 dark:bg-purple-700';
      textColor = 'text-purple-700 dark:text-purple-100';
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}>
        {role}
      </span>
    );
  };

  // Fungsi untuk styling Status
  const StatusIndicator = ({ status }) => {
    let dotColor = 'bg-gray-400';
    if (status === 'Active') {
      dotColor = 'bg-green-500';
    } else if (status === 'Suspended') {
      dotColor = 'bg-red-500';
    }
    return (
      <div className="flex items-center">
        <span className={`h-2.5 w-2.5 rounded-full ${dotColor} mr-2`}></span>
        <span>{status}</span>
      </div>
    );
  };
  
  // Placeholder untuk ikon Actions (gantilah dengan SVG atau komponen ikon Heroicons nanti)
  const EditIcon = () => <span className="cursor-pointer hover:text-blue-600">✏️</span>;
  const DisableIcon = () => <span className="cursor-pointer hover:text-yellow-600">🚫</span>;
  const DeleteIcon = () => <span className="cursor-pointer hover:text-red-600">🗑️</span>;

  return (
    <div>
      {/* Baris Judul dan Tombol Add New User */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          User Management
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center space-x-2">
          <PlusIcon className="h-5 w-5" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Baris Search dan Filter */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Search Input */}
          <div>
            <label htmlFor="search_users" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search Users
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search_users"
                id="search_users"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search users..."
              />
            </div>
          </div>

          {/* Filter Roles */}
          <div>
            <label htmlFor="roles" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Roles
            </label>
            <div className="relative">
              <select
                id="roles"
                name="roles"
                className="appearance-none block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Author</option>
                <option>Reader</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Filter Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <div className="relative">
              <select
                id="status"
                name="status"
                className="appearance-none block w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 py-2 px-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Suspended</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <ChevronDownIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel User */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Join Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {user.avatarUrl ? (
                        <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={user.name} />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold">
                          {getInitials(user.name)}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  <StatusIndicator status={user.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <EditIcon />
                  <DisableIcon />
                  <DeleteIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder untuk Pagination */}
      <div className="mt-6">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Kontrol pagination akan ditampilkan di sini.
        </p>
      </div>

    </div>
  );
}