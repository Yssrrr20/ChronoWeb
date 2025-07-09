import UserHeader from '@/components/user/UserHeader';
import UserSidebar from '@/components/user/UserSidebar';

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col h-screen w-full">
      <UserHeader />
      <div className="flex flex-1 overflow-hidden">
        <UserSidebar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}