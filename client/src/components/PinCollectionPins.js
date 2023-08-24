import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const PinCollectionPins = () => {
  const { id } = useParams();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pinCollection/${id}/pins`)
      .then((res) => {
        setPins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleDelete = (pinId) => {
    axios.delete(`http://localhost:8000/api/pin/${pinId}`)
      .then(() => {
        // Remove the deleted pin from the state
        setPins(prevPins => prevPins.filter(pin => pin._id !== pinId));
      })
      .catch(err => {
        console.log(err);
      });
  }

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pins</h1>
      <div className="grid grid-cols-3 gap-4">
        {pins.map((pin) => (
          <div key={pin._id} className="border rounded p-4 relative">
            <h2 className="absolute top-0 left-0 bg-white px-2">{pin.name}</h2>
            {pin.images && pin.images[0] && pin.images[0].data &&
              <img
                src={`data:${pin.images[0].contentType};base64,${arrayBufferToBase64(pin.images[0].data.data)}`}
                alt={pin.name}
                className="w-full h-64 object-cover mb-4 rounded"
              />
            }
            <div className="absolute bottom-0 left-0 space-x-2">
                <Link 
                  to={`/pinCollection/${id}/pin/${pin._id}`} 
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
                    View
                </Link>
                <Link 
                  to={`/pinCollection/${id}/edit-pin/${pin._id}`} 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                    Edit
                </Link>
                <button 
                  onClick={() => handleDelete(pin._id)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                    Delete
                </button>
            </div>
          </div>
        ))}
        {/* Link to the add pin route for the current collection */}
        <Link to={`/pinCollection/${id}/add-pin`} className="flex justify-center items-center border-2 p-8">
          + Create New Pin
        </Link>
      </div>
    </div>
  );
};

export default PinCollectionPins;
