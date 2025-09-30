import React from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import WatchListPage from './pages/WatchListPage';
import LoginPage from './pages/LoginPage';
import SearchUsersPage from './pages/SearchUsersPage';
import UserProfilePage from './pages/UserProfilePage';
import FriendsListPage from './pages/FriendsListPage';
import GenrePage from './pages/GenrePage';
import NewPopularPage from './pages/NewPopularPage';
import AccountInfoPage from './pages/AccountInfoPage';
import SettingsPage from './pages/SettingsPage'; // Import SettingsPage
import SearchResultsPage from './pages/SearchResultsPage'; // Import SearchResultsPage
import AllMoviesPage from './pages/AllMoviesPage'; // Import AllMoviesPage
import { WatchListProvider } from './context/WatchListContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <WatchListProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<DetailPage />} />
                <Route path="/watchlist" element={<WatchListPage />} />
                <Route path="/search-users" element={<SearchUsersPage />} />
                <Route path="/user/:username" element={<UserProfilePage />} />
                <Route path="/friends" element={<FriendsListPage />} />
                <Route path="/genres" element={<GenrePage />} />
                <Route path="/new-popular" element={<NewPopularPage />} />
                <Route path="/all-movies" element={<AllMoviesPage />} /> {/* Add All Movies route */}
                <Route path="/account" element={<AccountInfoPage />} />
                <Route path="/settings" element={<SettingsPage />} /> {/* Add Settings route */}
                <Route path="/search/:query" element={<SearchResultsPage />} /> {/* Add Search Results route */}
              </Route>
            </Route>
          </Routes>
        </HashRouter>
      </WatchListProvider>
    </AuthProvider>
  );
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  // Hide header on detail pages for a more immersive experience
  const noHeaderPaths = ['/movie/', '/user/'];
  const showHeader = !noHeaderPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen">
      {showHeader && <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;