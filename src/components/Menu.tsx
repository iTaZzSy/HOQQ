import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';

// --- Interfaces ---
interface IVariant {
  size: string;
  price: number;
}

interface IMenuItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  image?: string;
  variants?: IVariant[];
}

interface IMenuData {
    [category: string]: IMenuItem[];
}


// --- Components ---

const MenuItem: React.FC<IMenuItem> = ({ name, description, price, variants, image }) => {
    const renderPrice = () => {
        if (price) {
            return `${price}₺`;
        }
        if (variants && variants.length > 0) {
            return variants.map(v => `${v.size}: ${v.price}₺`).join(' / ');
        }
        return '-';
    };

    return (
        <div className="flex justify-between items-start mb-6 group">
            <div className="flex items-start gap-4">
                {image && (
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-stone-800 border border-stone-700">
                         <img 
                            src={`${import.meta.env.VITE_API_URL.replace('/api', '')}${image}`} 
                            alt={name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                    </div>
                )}
                <div>
                    <h4 className="text-lg font-bold text-stone-200 group-hover:text-amber-500 transition-colors">{name}</h4>
                    <p className="text-sm text-stone-400 max-w-md">{description}</p>
                </div>
            </div>
            <div className="text-lg font-bold text-amber-500 whitespace-nowrap pl-4">{renderPrice()}</div>
        </div>
    );
};

const MenuCategory: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-2xl font-bold text-amber-500 mb-6 border-b-2 border-amber-500/20 pb-2">{title}</h3>
    {children}
  </div>
);

const INITIAL_VISIBLE_CATEGORIES = 2;

const Menu: React.FC = () => {
    const [menu, setMenu] = useState<IMenuData>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await apiClient.get<IMenuItem[]>('/menu');
                // Group items by category
                const groupedMenu = response.data.reduce((acc, item) => {
                    const category = item.category;
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(item);
                    return acc;
                }, {} as IMenuData);
                setMenu(groupedMenu);
            } catch (err) {
                setError('Menü yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    const categories = Object.keys(menu);
    const visibleCategories = isExpanded ? categories : categories.slice(0, INITIAL_VISIBLE_CATEGORIES);

    if (loading) {
        return <div className="text-center py-20 text-amber-500">Menü Yükleniyor...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">{error}</div>;
    }

    return (
        <section id="menu" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-stone-200">Lezzet Menümüz</h2>
                    <p className="text-stone-400 mt-2">Özenle hazırlanmış tatlarımızı keşfedin</p>
                </div>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                    {visibleCategories.map((category) => (
                        <MenuCategory key={category} title={category}>
                            {menu[category].map((item) => (
                                <MenuItem key={item._id} {...item} />
                            ))}
                        </MenuCategory>
                    ))}
                </div>

                {categories.length > INITIAL_VISIBLE_CATEGORIES && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="bg-transparent border border-amber-500 text-amber-500 font-bold px-8 py-3 rounded-md uppercase tracking-wide hover:bg-amber-500 hover:text-zinc-900 transition-colors duration-300"
                        >
                            {isExpanded ? 'Menüyü Gizle' : 'Tüm Menüyü Gör'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Menu;
