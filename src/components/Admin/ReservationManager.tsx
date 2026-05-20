import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient.ts';

interface IReservation {
  _id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

const ReservationManager: React.FC = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await apiClient.get('/reservations', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      setReservations(response.data);
    } catch (err) {
      setError('Rezervasyonları getirirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu rezervasyonu silmek istediğinizden emin misiniz?")) return;
    
    try {
        await apiClient.delete(`/reservations/${id}`);
        fetchReservations(); 
    } catch (err) {
        alert('Rezervasyon silinirken bir hata oluştu.');
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-stone-200">Gelen Rezervasyonlar</h2>
      {reservations.length === 0 ? (
        <p className="text-stone-500">Henüz rezervasyon yok.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-600 text-stone-400">
                <th className="p-3">Ad Soyad</th>
                <th className="p-3">Telefon</th>
                <th className="p-3">Kişi</th>
                <th className="p-3">Tarih</th>
                <th className="p-3">Saat</th>
                <th className="p-3">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res._id} className="border-b border-stone-800 hover:bg-stone-800/50">
                  <td className="p-3">{res.name}</td>
                  <td className="p-3">{res.phone}</td>
                  <td className="p-3">{res.guests}</td>
                  <td className="p-3">{new Date(res.date).toLocaleDateString('tr-TR')}</td>
                  <td className="p-3">{res.time}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => handleDelete(res._id)}
                      className="text-red-500 hover:text-red-400 font-bold"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationManager;