// src/app/page.jsx (atau page.js)
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/auth/login');

  return null;
}