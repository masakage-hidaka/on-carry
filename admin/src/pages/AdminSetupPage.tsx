import { useState } from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function AdminSetupPage() {
  const [email, setEmail] = useState('admin@oncarry.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      if (signUpData.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert({
            id: signUpData.user.id,
            role: 'admin',
            full_name: 'Admin User',
          });

        if (profileError) throw profileError;

        setSuccess(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '管理者アカウントの作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">セットアップ完了！</h1>
          <p className="text-gray-600 mb-6">
            管理者アカウントが正常に作成されました。
            <br />
            ログインページに移動してログインしてください。
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            ログインページへ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 text-white">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">初回セットアップ</h1>
            <p className="text-purple-100 text-center">管理者アカウントを作成</p>
          </div>

          <form onSubmit={handleSetup} className="p-8 space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-700 text-sm">
                最初の管理者アカウントを作成します。このページは初回のみ使用してください。
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="admin@oncarry.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="最低8文字"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500 mt-1">
                パスワードは8文字以上で設定してください
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '作成中...' : '管理者アカウントを作成'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
