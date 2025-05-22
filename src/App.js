import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/home/Home';
import OpenRoute from './routes/OpenRoute';
import PrivateRoute from './routes/PrivateRoute';
import Header from './components/common/Header';
import CreateEvent from './pages/events/CreateEvent';
import MyEvents from './pages/events/MyEvents';
import UpdateEvent from './pages/events/UpdateEvent';
import Events from './pages/events/Events';
import UserEvents from './pages/events/UserEvents';
import AdminEventDetails from './pages/events/AdminEventDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route 
              path="/login" 
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              } 
            />
            <Route 
              path="/create-event" 
              element={
                <PrivateRoute>
                  <CreateEvent />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/my-events" 
              element={
                <PrivateRoute>
                  <MyEvents />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/update-event/:id" 
              element={
                <PrivateRoute>
                  <UpdateEvent />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/user-events" 
              element={
                <PrivateRoute>
                  <UserEvents />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/events/:eventId" 
              element={
                <PrivateRoute>
                  <AdminEventDetails />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

