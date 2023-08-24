import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateCollectionForm from './components/CreateCollectionForm';
import PinCollectionPins from './components/PinCollectionPins';
import PinForm from './components/PinForm';
import EditPinForm from './components/EditPinForm';
import PinView from './components/PinView';

function App() {
  return (
    <div className="App bg-gray-100 h-screen">
      <header className="bg-blue-500 text-white p-4 text-center text-2xl">
        Welcome to the Pin collectors app
      </header>
      
      <BrowserRouter>
        <nav className="mb-4 p-4 flex justify-end">
          <ul className="flex space-x-4">
            <li>
              <Link to="/dashboard" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Dashboard</Link>
            </li>
            <li>
              <Link to="/create-collection" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create Collection</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-collection" element={<CreateCollectionForm />} />
          <Route path="/pinCollection/:id/pins" element={<PinCollectionPins />} />
          <Route path="/pinCollection/:id/edit-pin/:pinId" element={<EditPinForm />} />
          <Route path="/pinCollection/:id/add-pin" element={<PinForm />} />
          <Route path="/pinCollection/:id/pin/:pinId" element={<PinView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
