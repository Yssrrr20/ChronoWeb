// src/app/(user)/profile/page.jsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProfileImageCropperModal from '@/components/user/ProfileImageCropperModal';
import NewsCard from '@/components/user/NewsCard'; 

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [newsletterSubscription, setNewsletterSubscription] = useState(false);

  const [showCropperModal, setShowCropperModal] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileUpdateError, setProfileUpdateError] = useState(null);
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(null);

  const [showChangePasswordSection, setShowChangePasswordSection] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(null);

  // State untuk Reading History
  const [readingHistory, setReadingHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState(null);


  const fileInputRef = useRef(null);
  const router = useRouter();

  // Fetch User Profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        router.push('/auth/login');
        return;
      }

      try {
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user);
          setFullName(data.user.full_name || '');
          setPhoneNumber(data.user.phone_number || '');
          setEmailNotifications(data.user.email_notifications || false);
          setPushNotifications(data.user.push_notifications || false);
          setNewsletterSubscription(data.user.newsletter_subscription || false);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch user profile.');
          if (response.status === 401) {
            localStorage.removeItem('authToken');
            router.push('/auth/login');
          }
        }
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('An unexpected error occurred while fetching profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result);
        setShowCropperModal(true);
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  const onCropCompleteFromModal = async (croppedImageBlob) => {
    setShowCropperModal(false);
    await handleAvatarUpload(croppedImageBlob);
  };

  const handleAvatarUpload = async (croppedImageBlob) => {
    if (!croppedImageBlob) {
      setUploadError('No image to upload after cropping.');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setUploadError('Not authenticated. Please log in.');
      setUploading(false);
      router.push('/auth/login');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', croppedImageBlob, 'profile_avatar.jpeg');

    try {
      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadSuccess(data.message);
        setUserProfile(prevProfile => ({ ...prevProfile, avatar_url: data.avatarUrl }));
        console.log('Avatar upload response:', data);
      } else {
        setUploadError(data.message || 'Avatar upload failed.');
        console.error('Avatar upload failed:', data);
      }
    } catch (err) {
      console.error('Network error during avatar upload:', err);
      setUploadError('An unexpected network error occurred.');
    } finally {
      setUploading(false);
    }
  };


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileUpdateError(null);
    setProfileUpdateSuccess(null);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setProfileUpdateError('Not authenticated. Please log in.');
      setIsUpdatingProfile(false);
      router.push('/auth/login');
      return;
    }

    try {
      const profileDataToUpdate = {
        full_name: fullName,
        phone_number: phoneNumber,
        email_notifications: emailNotifications,
        push_notifications: pushNotifications,
        newsletter_subscription: newsletterSubscription,
      };

      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileDataToUpdate),
      });

      const data = await response.json();

      if (response.ok) {
        setProfileUpdateSuccess(data.message);
        setUserProfile(data.user);
        console.log('Profile update successful:', data.user);
      } else {
        setProfileUpdateError(data.message || 'Failed to update profile.');
        console.error('Profile update failed:', data);
      }
    } catch (err) {
      console.error('Network error during profile update:', err);
      setProfileUpdateError('An unexpected network error occurred.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    setPasswordChangeError(null);
    setPasswordChangeSuccess(null);

    if (newPassword !== confirmNewPassword) {
      setPasswordChangeError('New passwords do not match.');
      setIsChangingPassword(false);
      return;
    }
    if (newPassword.length < 6) {
      setPasswordChangeError('New password must be at least 6 characters long.');
      setIsChangingPassword(false);
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setPasswordChangeError('Not authenticated. Please log in.');
      setIsChangingPassword(false);
      router.push('/auth/login');
      return;
    }

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordChangeSuccess(data.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setPasswordChangeError(data.message || 'Failed to change password.');
        console.error('Password change failed:', data);
      }
    } catch (err) {
      console.error('Network error during password change:', err);
      setPasswordChangeError('An unexpected network error occurred.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // --- Fungsi untuk Mengambil Riwayat Bacaan ---
  const fetchReadingHistory = useCallback(async () => {
    console.log('Attempting to fetch reading history...'); // <-- LOG INI
    setLoadingHistory(true);
    setHistoryError(null);
    const token = localStorage.getItem('authToken');

    if (!token) {
      setHistoryError('No authentication token found for reading history.');
      setLoadingHistory(false);
      console.warn('Reading history fetch skipped: No auth token.'); // <-- LOG INI
      return;
    }

    try {
      const response = await fetch('/api/reading-history', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReadingHistory(data.history);
        console.log('Fetched Reading History successfully:', data.history); 
      } else {
        const errorData = await response.json();
        setHistoryError(errorData.message || 'Failed to fetch reading history.');
        console.error('Failed to fetch reading history:', errorData); 
      }
    } catch (err) {
      console.error('Error fetching reading history:', err); 
      setHistoryError('An unexpected error occurred while fetching reading history.');
    } finally {
      setLoadingHistory(false);
      console.log('Finished fetching reading history.'); 
    }
  }, []);

  // useEffect untuk memicu fetchReadingHistory
  useEffect(() => {
    if (userProfile && userProfile.id) { 
      console.log('userProfile is available, triggering fetchReadingHistory.'); 
      fetchReadingHistory();
    } else {
      console.log('userProfile not yet available, skipping fetchReadingHistory.'); 
    }
  }, [userProfile, fetchReadingHistory]); 

  if (loading) return <div className="text-center dark:text-gray-300 p-8">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500 dark:text-red-400 p-8">Error: {error}</div>;
  if (!userProfile) return <div className="text-center dark:text-gray-300 p-8">No profile data.</div>;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {showCropperModal && imageToCrop && (
        <ProfileImageCropperModal
          imageSrc={imageToCrop}
          onCropComplete={onCropCompleteFromModal}
          onClose={() => setShowCropperModal(false)}
        />
      )}

      {/* Top Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0 flex flex-col items-center">
          <Image
            src={userProfile.avatar_url || '/placeholder-avatar.jpg'}
            alt="User Avatar"
            width={100}
            height={100}
            className="rounded-full object-cover border-2 border-blue-500 mb-2"
          />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={handleChooseFileClick}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Choose File
          </button>
          {uploadError && <p className="text-red-500 text-xs mt-2 text-center">{uploadError}</p>}
          {uploadSuccess && <p className="text-green-500 text-xs mt-2 text-center">{uploadSuccess}</p>}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{userProfile.full_name || userProfile.username}</h2>
          <p className="text-gray-600 dark:text-gray-400">{userProfile.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Last login: {userProfile.last_login_at ? new Date(userProfile.last_login_at).toLocaleString() : 'N/A'}</p>
          <div className="mt-4 flex space-x-3 justify-center sm:justify-start">
            <button
              onClick={handleUpdateProfile}
              disabled={isUpdatingProfile}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isUpdatingProfile ? 'Saving Profile...' : 'Save Profile Changes'}
            </button>
            <button
              onClick={() => setShowChangePasswordSection(!showChangePasswordSection)}
              className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Change Password
            </button>
          </div>
          {profileUpdateError && <p className="text-red-500 text-xs mt-2 text-center sm:text-left">{profileUpdateError}</p>}
          {profileUpdateSuccess && <p className="text-green-500 text-xs mt-2 text-center sm:text-left">{profileUpdateSuccess}</p>}
        </div>
      </div>

      {showChangePasswordSection && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6zM8 10V7a4 4 0 018 0v3" />
            </svg>
            Change Password
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-900 dark:border-gray-900 dark:text-white text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-900 dark:border-gray-900 dark:text-white text-gray-900"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-900 dark:border-gray-900 dark:text-white text-gray-900"
                required
              />
            </div>
            {passwordChangeError && <p className="text-red-500 text-xs mt-2">{passwordChangeError}</p>}
            {passwordChangeSuccess && <p className="text-green-500 text-xs mt-2">{passwordChangeSuccess}</p>}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowChangePasswordSection(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isChangingPassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      )}

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
          <form className="space-y-4" onSubmit={handleUpdateProfile}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                value={userProfile.email}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 sm:text-sm cursor-not-allowed text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <input
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white text-gray-900"
              />
            </div>
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              {isUpdatingProfile ? 'Saving Changes...' : 'Save Account Settings'}
            </button>
          </form>
        </div>

        {/* Reading History */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13.5m0-13.5c-4.148 0-7.5 3.352-7.5 7.5s3.352 7.5 7.5 7.5 7.5-3.352 7.5-7.5-3.352-7.5-7.5-7.5z" />
              </svg>
              Reading History
            </span>
          </h3>
          {loadingHistory ? (
            <div className="text-center dark:text-gray-400">Loading reading history...</div>
          ) : historyError ? (
            <div className="text-center text-red-500 dark:text-red-400">Error: {historyError}</div>
          ) : readingHistory.length > 0 ? (
            <div className="grid grid-cols-1 gap-4"> 
              {readingHistory.map((article) => (
                <NewsCard
                  key={article.article_id + '-' + article.read_at} 
                  id={article.article_id} // ID artikel dari Guardian
                  category={article.category || 'General'} 
                  title={article.title}
                  description={article.description || 'No description available.'}
                  imageUrl={article.image_url || '/placeholder-image.png'}
                  time={article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'} // Format tanggal
                  readTime={article.read_time || 'N/A'} 
                  externalUrl={article.url}
                  author={article.author || 'Unknown Author'}
                  articlePublishedAtRaw={article.published_at}
                />
              ))}
            </div>
          ) : (
            <div className="text-center dark:text-gray-400">No reading history found. Start reading some articles!</div>
          )}
        </div>
      </div>
    </div>
  );
}