import React, { useState } from 'react';
import apiClient from '../src/apiClient'; // Adjust path as necessary

const Reservations: React.FC = () => {
  const [formData, setFormData] = useState({
    guestName: '',
    phone: '',
    date: '',
    time: '',
    guestCount: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      await apiClient.post('/reservations', formData);
      setSuccessMessage('Rezervasyon talebiniz başarıyla alınmıştır. Ekibimiz onay için sizinle iletişime geçecektir.');
      setFormData({ guestName: '', phone: '', date: '', time: '', guestCount: 1 }); // Reset form
    } catch (err: any) {
        if (err.response && err.response.data) {
            const apiError = err.response.data;
            if (apiError.message) {
                 setError(apiError.message);
            } else if (apiError.errors) {
                const errorMessages = Object.values(apiError.errors).flat().join(', ');
                setError(errorMessages);
            }
        } else {
            setError('Rezervasyon gönderilirken bir hata oluştu.');
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservations" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-200">Rezervasyon Yapın</h2>
          <p className="text-stone-400 mt-2">Yerinizi ayırtın ve eşsiz deneyimimizin tadını çıkarın</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {successMessage ? (
            <div className="text-center bg-green-900/50 p-8 rounded-md border border-green-500/20">
              <h3 className="text-2xl font-bold text-green-500">Teşekkür Ederiz!</h3>
              <p className="text-stone-300 mt-2">{successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && <p className="text-red-500 bg-red-900/50 border border-red-500/30 p-3 rounded-md">{error}</p>}
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" name="guestName" value={formData.guestName} onChange={handleChange} placeholder="Adınız Soyadınız" required className="w-full bg-[#2a2726]/50 border border-stone-600/50 rounded-md px-4 py-3 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon Numaranız" required className="w-full bg-[#2a2726]/50 border border-stone-600/50 rounded-md px-4 py-3 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <input type="number" name="guestCount" value={formData.guestCount} onChange={handleChange} placeholder="Kişi Sayısı" min="1" max="10" required className="w-full bg-[#2a2726]/50 border border-stone-600/50 rounded-md px-4 py-3 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full bg-[#2a2726]/50 border border-stone-600/50 rounded-md px-4 py-3 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" style={{colorScheme: 'dark'}} />
                <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full bg-[#2a2726]/50 border border-stone-600/50 rounded-md px-4 py-3 text-stone-200 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all" style={{colorScheme: 'dark'}} />
              </div>
              <div className="text-center">
                <button type="submit" disabled={loading} className="mt-4 inline-block bg-transparent border border-amber-500 text-amber-500 font-bold px-8 py-3 rounded-md uppercase tracking-wide hover:bg-amber-500 hover:text-zinc-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Gönderiliyor...' : 'Rezervasyon Gönder'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reservations;
