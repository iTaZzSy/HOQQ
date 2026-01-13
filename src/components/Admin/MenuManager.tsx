import React, { useState, useEffect } from 'react';
import apiClient from '../../apiClient';

interface IMenuItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
}

const MenuManager: React.FC = () => {
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  
  // For file upload, we need to store the File object, not just the string path
  const [newItem, setNewItem] = useState<{
    name: string;
    description: string;
    category: string;
    price: number;
    imageFile: File | null;
  }>({
    name: '',
    description: '',
    category: 'Nargile',
    price: 0,
    imageFile: null
  });

  // State for editing price
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/menu');
      setMenuItems(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newItem.name);
      formData.append('description', newItem.description);
      formData.append('category', newItem.category);
      formData.append('price', newItem.price.toString());
      if (newItem.imageFile) {
        formData.append('image', newItem.imageFile);
      }

      await apiClient.post('/menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewItem({ name: '', description: '', category: 'Nargile', price: 0, imageFile: null });
      // Clear file input manually
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      fetchMenu();
    } catch (err) {
      alert('Ürün eklenirken hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await apiClient.delete(`/menu/${id}`);
      fetchMenu();
    } catch (err) {
      alert('Silinirken hata oluştu');
    }
  };

  const startEditing = (item: IMenuItem) => {
    setEditingId(item._id);
    setEditPrice(item.price);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditPrice(0);
  };

  const handleUpdatePrice = async (id: string) => {
    // 1. Optimistic Update: Update UI immediately
    setMenuItems(prevItems => 
      prevItems.map(item => item._id === id ? { ...item, price: editPrice } : item)
    );
    setEditingId(null); // Exit edit mode immediately

    try {
      // 2. Send request to server in background
      await apiClient.patch(`/menu/${id}`, { price: editPrice });
    } catch (err) {
      alert('Fiyat güncellenirken hata oluştu');
      // Revert changes if error occurs (Optional but recommended for robust apps)
      fetchMenu();
    }
  };

  const handleImageUpdate = async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
        await apiClient.patch(`/menu/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        fetchMenu();
    } catch (err) {
        alert('Resim güncellenirken hata oluştu');
    }
  };

  const handleRemoveImage = async (id: string) => {
      if(!window.confirm("Resmi kaldırmak istediğinize emin misiniz?")) return;
      try {
          await apiClient.patch(`/menu/${id}`, { removeImage: 'true' });
          fetchMenu();
      } catch (err) {
          alert('Resim kaldırılırken hata oluştu');
      }
  };

  return (
    <div className="space-y-8">
      {/* Add New Item Form */}
      <div className="bg-stone-800/50 p-4 rounded border border-stone-600">
        <h3 className="text-lg font-bold mb-4 text-amber-500">Yeni Ürün Ekle</h3>
        <form onSubmit={handleCreate} className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 items-end">
          <div className="col-span-1">
             <label className="block text-xs text-stone-400 mb-1">Kategori</label>
             <select 
               value={newItem.category}
               onChange={e => setNewItem({...newItem, category: e.target.value})}
               className="w-full bg-stone-900 border border-stone-600 rounded px-2 py-2"
             >
               <option value="Nargile">Nargile</option>
               <option value="Ana Yemekler">Ana Yemekler</option>
               <option value="Atıştırmalıklar">Atıştırmalıklar</option>
               <option value="Tatlılar">Tatlılar</option>
               <option value="Sıcak İçecekler">Sıcak İçecekler</option>
               <option value="Soğuk İçecekler">Soğuk İçecekler</option>
             </select>
          </div>
          <div className="col-span-1">
            <label className="block text-xs text-stone-400 mb-1">Ürün Adı</label>
            <input 
              type="text" 
              placeholder="Örn: Double Apple" 
              value={newItem.name}
              onChange={e => setNewItem({...newItem, name: e.target.value})}
              className="w-full bg-stone-900 border border-stone-600 rounded px-2 py-2"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-xs text-stone-400 mb-1">Açıklama</label>
            <input 
              type="text" 
              placeholder="İçerik bilgisi" 
              value={newItem.description}
              onChange={e => setNewItem({...newItem, description: e.target.value})}
              className="w-full bg-stone-900 border border-stone-600 rounded px-2 py-2"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-xs text-stone-400 mb-1">Fiyat (TL)</label>
            <input 
              type="number" 
              placeholder="0" 
              value={newItem.price}
              onChange={e => setNewItem({...newItem, price: Number(e.target.value)})}
              className="w-full bg-stone-900 border border-stone-600 rounded px-2 py-2"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-xs text-stone-400 mb-1">Resim</label>
            <input 
              id="fileInput"
              type="file" 
              accept="image/*"
              onChange={e => setNewItem({...newItem, imageFile: e.target.files ? e.target.files[0] : null})}
              className="w-full text-xs text-stone-400 file:mr-2 file:py-2 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-zinc-900 hover:file:bg-amber-600"
            />
          </div>
          <div className="col-span-1">
            <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-2 rounded transition-colors">
              Ekle
            </button>
          </div>
        </form>
      </div>

      {/* List Items */}
      <div>
        <h3 className="text-lg font-bold mb-4 text-stone-200">Menü Listesi</h3>
        {loading ? <p>Yükleniyor...</p> : (
            <div className="grid gap-4">
                {menuItems.map(item => (
                    <div key={item._id} className="flex justify-between items-center bg-stone-800/30 p-3 rounded border border-stone-700">
                        <div className="flex items-center gap-4">
                            {/* Image Thumbnail */}
                            <div className="relative group w-12 h-12 flex-shrink-0 bg-stone-900 rounded overflow-hidden border border-stone-600">
                                {item.image ? (
                                    <>
                                        <img src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${item.image}`} alt={item.name} className="w-full h-full object-cover" />
                                        {/* Remove Button Overlay */}
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering file input if stacked
                                                handleRemoveImage(item._id);
                                            }}
                                            className="absolute top-0 right-0 bg-red-600 text-white w-4 h-4 flex items-center justify-center text-[10px] hover:bg-red-700 z-20"
                                            title="Resmi Kaldır"
                                        >
                                            ✕
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-stone-600">No Img</div>
                                )}
                                
                                {/* Hidden input for quick update (Only clickable if not hitting the remove button) */}
                                <input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    title="Resmi değiştirmek için tıklayın"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            handleImageUpdate(item._id, e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>

                            <div>
                                <p className="font-bold text-amber-500">{item.name} <span className="text-stone-500 text-xs">({item.category})</span></p>
                                <p className="text-sm text-stone-400">{item.description}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {editingId === item._id ? (
                                // Edit Mode
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="number" 
                                        value={editPrice}
                                        onChange={(e) => setEditPrice(Number(e.target.value))}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleUpdatePrice(item._id);
                                            if (e.key === 'Escape') cancelEditing();
                                        }}
                                        className="w-24 bg-stone-900 border border-amber-500 rounded px-2 py-1 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-1 focus:ring-amber-500"
                                        autoFocus
                                    />
                                    <button 
                                        onClick={() => handleUpdatePrice(item._id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500 text-sm"
                                    >
                                        Kaydet
                                    </button>
                                    <button 
                                        onClick={cancelEditing}
                                        className="bg-stone-600 text-white px-3 py-1 rounded hover:bg-stone-500 text-sm"
                                    >
                                        İptal
                                    </button>
                                </div>
                            ) : (
                                // View Mode
                                <>
                                    <span className="font-bold text-stone-200">{item.price} ₺</span>
                                    <button 
                                        onClick={() => startEditing(item)}
                                        className="bg-amber-600/20 text-amber-500 border border-amber-500/50 px-3 py-1 rounded hover:bg-amber-600 hover:text-white transition-colors text-sm"
                                    >
                                        Fiyat Düzenle
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-900/50 text-red-500 px-3 py-1 rounded hover:bg-red-900 transition-colors text-sm"
                                    >
                                        Sil
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default MenuManager;