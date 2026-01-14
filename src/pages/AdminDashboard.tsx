import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationManager from '../components/Admin/ReservationManager';
import MenuManager from '../components/Admin/MenuManager';
import apiClient from '../apiClient';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'reservations' | 'menu'>('reservations');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/x9z');
    } else {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    delete apiClient.defaults.headers.common['Authorization'];
    navigate('/x9z');
  };

  return (
    <div className="min-h-screen bg-[#1c1a19] text-stone-300 p-6">
      <div className="flex justify-between items-center mb-8 border-b border-stone-700 pb-4">
        <h1 className="text-3xl font-bold text-amber-500">Yönetici Paneli</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-900/50 text-red-500 px-4 py-2 rounded hover:bg-red-900 transition-colors"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-4 py-2 rounded ${activeTab === 'reservations' ? 'bg-amber-500 text-zinc-900 font-bold' : 'bg-stone-800'}`}
        >
          Rezervasyonlar
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-2 rounded ${activeTab === 'menu' ? 'bg-amber-500 text-zinc-900 font-bold' : 'bg-stone-800'}`}
        >
          Menü Yönetimi
        </button>
      </div>

      <div className="bg-[#2a2726] p-6 rounded-lg border border-stone-700">
        {activeTab === 'reservations' ? <ReservationManager /> : <MenuManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;