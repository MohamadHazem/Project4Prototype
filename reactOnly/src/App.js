import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from "./components/Home";
import { UserProvider, useUserHook } from './hooks/useUserHook';
import { FavProvider } from './hooks/useFavHook';
import Admin from "./components/Admin";
import Logout from './components/Logout';
import Fav from './components/Fav';
import Search from './components/Search';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <FavProvider>
          <NavBar />
          <Routes>
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/logout/:token'} element={<Logout /> } />
            <Route path={'/fav'} element={
              <ProtectedRoute>
                <Fav />
              </ProtectedRoute>
            } />
            <Route path={"/"} element={<Home />} />
            <Route path={"/search"} element={<Search />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route path={"/admin"} element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
          </Routes>
        </FavProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

function ProtectedRoute({children}) {
  const userHook = useUserHook()
  if(!userHook.getUser()) {
    return <Navigate to='/login' replace />
  }
  return children
}

export default App;
