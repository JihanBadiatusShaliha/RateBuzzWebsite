import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MOCK_USERS } from '../constants/users';

const FriendsListPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const friends = MOCK_USERS.filter(user => currentUser.friends.includes(user.id));

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-16 pt-24 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Daftar Teman</h1>
      {friends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map(friend => (
            <Link to={`/user/${friend.username}`} key={friend.id}>
              <div className="bg-slate-800 rounded-lg p-4 text-center hover:bg-slate-700 transition-colors">
                <img src={friend.profilePictureUrl} alt={friend.username} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <p className="text-xl font-bold">{friend.username}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
         <div className="text-center py-20">
          <p className="text-xl text-slate-400 mb-4">You haven't added any friends yet.</p>
          <Link to="/search-users" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition-colors">
            Find Users
          </Link>
        </div>
      )}
    </div>
  );
};

export default FriendsListPage;