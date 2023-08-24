import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCollectionForm = () => {
  const [name, setName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('coverImage', coverImage);
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/pinCollection',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response.data);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        if (err.response.data.message) {
          setErrors({ ...errors, name: err.response.data.message });
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
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create Pin Collection</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Collection Name</label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">Cover Image</label>
          <input
            type="file"
            className="border rounded w-full py-2 px-3"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCollectionForm;


