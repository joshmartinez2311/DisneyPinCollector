import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
  const [pinCollections, setPinCollections] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/pinCollection")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setPinCollections(res.data);
        } else {
          console.error("API did not return an array. Received:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching pin collections:", err);
      });
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/pinCollection/${id}`)
      .then(() => {
        setPinCollections(prev => prev.filter(pinCollection => pinCollection._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting pin collection:", err);
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Start creating your pin collection folders!</h1>
      <div className="grid grid-cols-3 gap-4">
        {Array.isArray(pinCollections) && pinCollections.map((pinCollection) => (
          <div key={pinCollection._id} className="relative">
            <Link to={`/pinCollection/${pinCollection._id}/pins`}>
              <img src={`data:${pinCollection.coverImage.contentType};base64,${arrayBufferToBase64(pinCollection.coverImage.data.data)}`} 
              alt={pinCollection.name} 
              className="w-full h-48 object-contain hover:opacity-75"/>
            </Link>
            <button 
              className="absolute bottom-0 right-0 mb-2 mr-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"  
              onClick={() => handleDelete(pinCollection._id)}
            >
              Delete
            </button>
          </div>
        ))}
        <Link to="/create-collection" className="flex justify-center items-center border-2 p-8">
          + Create New Collection
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
