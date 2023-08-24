import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPinForm = () => {
    const { pinId } = useParams();
    const navigate = useNavigate();

    const [pinData, setPinData] = useState({
        name: '',
        movie: '',
        description: '',
        condition: '',
        isDuplicate: false,
        images: []
    });
    const [errors, setErrors] = useState({});
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pin/${pinId}`)
        .then((res) => {
            setPinData(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [pinId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPinData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFiles(e.target.files);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(pinData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        Array.from(imageFiles).forEach(file => {
            formData.append('images', file);
        });

        axios.put(`http://localhost:8000/api/pin/${pinId}`, formData)
        .then(() => {
            navigate('/dashboard');
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl mb-6 font-semibold text-blue-600">Edit Pin</h1>

            <div className="bg-white p-8 rounded shadow-md w-96">
                <form onSubmit={onSubmitHandler} className="space-y-4">
                    {errors.general && <div className="bg-red-300 p-2 rounded mb-4">{errors.general}</div>}
                    
                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Name:</label>
                        <input type="text" name="name" value={pinData.name} onChange={handleChange} required className="border p-2 rounded" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Movie:</label>
                        <input type="text" name="movie" value={pinData.movie} onChange={handleChange} required className="border p-2 rounded" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Description:</label>
                        <textarea name="description" value={pinData.description} onChange={handleChange} className="border p-2 rounded" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Condition:</label>
                        <select name="condition" value={pinData.condition} onChange={handleChange} className="border p-2 rounded">
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                        </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Upload Images (Max 3):</label>
                        <input type="file" name="images" multiple onChange={handleImageChange} className="border p-2 rounded" accept="image/*" />
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="font-medium">Duplicate:</label>
                        <input type="checkbox" name="isDuplicate" checked={pinData.isDuplicate} onChange={e => setPinData({ ...pinData, isDuplicate: e.target.checked })} />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Update Pin</button>
                </form>
            </div>
        </div>
    );
};

export default EditPinForm;



