import React from 'react';
import { useAuth } from '../context/AuthContext';

const SettingsPage: React.FC = () => {
    const { currentUser } = useAuth();

    if (!currentUser) return null;

    return (
        <div className="container mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Pengaturan Akun</h1>

            <div className="max-w-2xl mx-auto space-y-12">
                {/* Profile Information Section */}
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 border-b border-slate-700 pb-2">Informasi Profil</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-400 mb-1">Username</label>
                            <input type="text" id="username" defaultValue={currentUser.username} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                            <input type="email" id="email" defaultValue={currentUser.email} readOnly className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md cursor-not-allowed" />
                        </div>
                         <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1">Bio/Deskripsi</label>
                            <textarea id="description" rows={3} defaultValue={currentUser.description} className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        </div>
                        <div className="pt-2">
                             <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors">Simpan Perubahan</button>
                        </div>
                    </form>
                </div>
                
                {/* Change Password Section */}
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 border-b border-slate-700 pb-2">Ganti Kata Sandi</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="current-password"  className="block text-sm font-medium text-slate-400 mb-1">Kata Sandi Saat Ini</label>
                            <input type="password" id="current-password" className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="new-password"  className="block text-sm font-medium text-slate-400 mb-1">Kata Sandi Baru</label>
                            <input type="password" id="new-password" className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                         <div className="pt-2">
                             <button type="submit" className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors">Ubah Kata Sandi</button>
                        </div>
                    </form>
                </div>
                
                {/* Account Actions Section */}
                 <div className="bg-slate-800 p-6 rounded-lg border border-red-500/30">
                    <h2 className="text-2xl font-bold mb-2 text-red-400">Zona Berbahaya</h2>
                    <p className="text-slate-400 mb-4">Tindakan ini tidak dapat diurungkan. Harap berhati-hati.</p>
                    <button className="px-5 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors">Nonaktifkan Akun</button>
                </div>

            </div>
        </div>
    );
};

export default SettingsPage;
