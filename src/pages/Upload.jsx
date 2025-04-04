import React, { useState } from 'react';
import api from '../services/api';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [labels, setLabels] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); 
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file); 

        try {
            const response = await api.post('/images/upload', formData);
            setLabels(response.data); 
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {labels.length > 0 && (
                <div>
                    <h3>Labels:</h3>
                    <ul>
                        {labels.map((label, index) => (
                            <li key={index}>{label}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Upload;