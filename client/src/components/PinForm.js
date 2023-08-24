import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PinForm = () => {
    const { id: pinCollectionId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        movie: '',
        description: '',
        condition: 'New',
        images: [],
        isDuplicate: false
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevState => ({
            ...prevState,
            images: files.slice(0, 3)
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === "images") {
                formData.images.forEach((image, index) => {
                    data.append(`images`, image);
                });
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post(`http://localhost:8000/api/pinCollection/${pinCollectionId}/pin`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            navigate("/dashboard");
        } catch (err) {
            if (err.response) {
                if (err.response.data.message) {
                    setErrors({ ...errors, general: err.response.data.message });
                } else if (err.response.data.errors) {
                    const validationErrors = {};
                    for (let key in err.response.data.errors) {
                        validationErrors[key] = err.response.data.errors[key].properties.message;
                    }
                    setErrors(validationErrors);
                }
            } else {
                console.error(err);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl mb-6 font-semibold text-blue-600">Create Your Pin</h1>
            
            <div className="bg-white p-8 rounded shadow-md w-96">
                <form onSubmit={onSubmitHandler} className="space-y-4">
                    {errors.general && <div className="bg-red-300 p-2 rounded mb-4">{errors.general}</div>}

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="border p-2 rounded" />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Movie:</label>
                        <input type="text" name="movie" value={formData.movie} onChange={handleChange} required className="border p-2 rounded" />
                        {errors.movie && <p className="text-red-500 text-xs mt-1">{errors.movie}</p>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Description:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded" />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Condition:</label>
                        <select name="condition" value={formData.condition} onChange={handleChange} className="border p-2 rounded">
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                        </select>
                        {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition}</p>}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="font-medium">Upload Images (Max 3):</label>
                        <input type="file" name="images" multiple onChange={handleImageChange} className="border p-2 rounded" accept="image/*" />
                        {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="font-medium">Duplicate:</label>
                        <input type="checkbox" name="isDuplicate" checked={formData.isDuplicate} onChange={e => setFormData({ ...formData, isDuplicate: e.target.checked })} />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Pin</button>
                </form>
            </div>
        </div>
    );
}

export default PinForm;


