import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_USERS } from '../constants/users';
import { User } from '../types';

const SearchUsersPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }
    const filteredUsers = MOCK_USERS.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filteredUsers);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Cari Pengguna</h1>
      <div className="max-w-xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Cari berdasarkan username..."
          className="w-full p-4 bg-slate-800 border-2 border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white text-lg"
        />
        <div className="mt-6 space-y-4">
          {results.length > 0 ? (
            results.map(user => (
              <Link to={`/user/${user.username}`} key={user.id}>
                <div className="flex items-center p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                  <img src={user.profilePictureUrl} alt={user.username} className="w-12 h-12 rounded-full mr-4" />
                  <span className="text-lg font-bold">{user.username}</span>
                </div>
              </Link>
            ))
          ) : (
            query.trim() && <p className="text-center text-slate-400">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUsersPage;