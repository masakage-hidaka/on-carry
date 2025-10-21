import { useState, useEffect } from 'react';
import { AdminAuthProvider, useAdminAuth } from './contexts/AdminAuthContext';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminSetupPage } from './pages/AdminSetupPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { supabase } from './lib/supabase';

function AdminApp() {
  const { user, loading } = useAdminAuth();
  const [showSetup, setShowSetup] = useState(false);
  const [checkingSetup, setCheckingSetup] = useState(true);

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);

      if (!error && (!data || data.length === 0)) {
        setShowSetup(true);
      }
    } catch (err) {
      console.error('Admin check failed:', err);
    } finally {
      setCheckingSetup(false);
    }
  };

  if (loading || checkingSetup) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (showSetup && !user) {
    return <AdminSetupPage />;
  }

  if (!user) {
    return <AdminLoginPage />;
  }

  return <AdminDashboard />;
}

function App() {
  return (
    <AdminAuthProvider>
      <AdminApp />
    </AdminAuthProvider>
  );
}

export default App;
