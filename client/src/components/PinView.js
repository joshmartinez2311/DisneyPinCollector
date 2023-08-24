import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PinView = () => {
    const { pinId, collectionId } = useParams();
    
    const [pinData, setPinData] = useState({
        name: '',
        movie: '',
        description: '',
        condition: '',
        isDuplicate: false,
        images: []
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pin/${pinId}`)
        .then((res) => {
            setPinData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [pinId]);

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Pin Details</h1>
            <div className="space-y-4">
                <h2 className="text-xl">{pinData.name}</h2>
                <p><strong>Movie:</strong> {pinData.movie}</p>
                <p><strong>Description:</strong> {pinData.description}</p>
                <p><strong>Condition:</strong> {pinData.condition}</p>
                <p><strong>Duplicate:</strong> {pinData.isDuplicate ? "Yes" : "No"}</p>
                <div>
                    <strong>Images:</strong>
                    <div className="space-y-2">
                        {pinData.images && pinData.images.map((image, index) => (
                            <img 
                                key={index} 
                                src={`data:${image.contentType};base64,${arrayBufferToBase64(image.data.data)}`} 
                                alt={pinData.name} 
                                className="w-full max-w-sm rounded" 
                            />
                        ))}
                    </div>
                </div>
                <Link to={`/pinCollection/${pinId}/edit-pin`} className="text-blue-500 hover:underline">Edit Pin</Link>
            </div>
        </div>
    );
};

export default PinView;

