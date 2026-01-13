import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await apiClient.post('/auth/login', { username, password });
      
      const { token } = response.data;
      
      // Store the token and username
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      
      // Configure apiClient to use this token for future requests? 
      // It's better to use an interceptor, but for now we can just rely on the component adding headers.
      // Or we can add a default header here:
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      navigate('/admin');
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError('Kullanıcı adı veya şifre hatalı!');
      } else {
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1a19] flex items-center justify-center">
      <div className="bg-[#2a2726] p-8 rounded-lg border border-stone-700 w-full max-w-md">
        <h2 className="text-2xl font-bold text-amber-500 mb-6 text-center">Yönetici Girişi</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-stone-400 mb-1 text-sm">Kullanıcı Adı</label>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1c1a19] border border-stone-600 rounded px-4 py-2 text-white focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-stone-400 mb-1 text-sm">Şifre</label>
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1c1a19] border border-stone-600 rounded px-4 py-2 text-white focus:border-amber-500 outline-none"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-amber-500 text-zinc-900 font-bold py-2 rounded hover:bg-amber-600 transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;