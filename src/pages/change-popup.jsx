import React, { useState, useEffect } from 'react';
import { fetchTags } from '../api/index.mjs';
import './change-popup.css';

export default function ChangePopup({ promise, onClose, onSave }) {
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({
        politician: promise.politician,
        promise_text: promise.promise_text,
        source_url: promise.source_url,
        date_given: promise.date_given.split('T')[0], // Format date for input
        deadline: promise.deadline.split('T')[0],
        status: promise.status,
        tags: promise.tags // Keep as array
    });

    useEffect(() => {
        fetchTags()
            .then(response => {
                console.log('Fetched tags:', response.data);
                setTags(response.data);
            })
            .catch(error => {
                console.error('Error fetching tags:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'tags' && type === 'checkbox') {
            setFormData(prev => {
                if (checked) {
                    // Add tag
                    return { ...prev, tags: [...prev.tags, value] };
                } else {
                    // Remove tag
                    return { ...prev, tags: prev.tags.filter(tag => tag !== value) };
                }
            });
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Edit Promise</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="politician">Politician:</label>
                        <input
                            type="text"
                            id="politician"
                            name="politician"
                            value={formData.politician}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="promise_text">Promise Text:</label>
                        <textarea
                            id="promise_text"
                            name="promise_text"
                            value={formData.promise_text}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="source_url">Source URL:</label>
                        <input
                            type="url"
                            id="source_url"
                            name="source_url"
                            value={formData.source_url}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date_given">Date Given:</label>
                        <input
                            type="date"
                            id="date_given"
                            name="date_given"
                            value={formData.date_given}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="deadline">Deadline:</label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="pending">Pending</option>
                            <option value="fulfilled">Fulfilled</option>
                            <option value="broken">Broken</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Теги:</label>
                        <div className="tags-container">
                            {tags && tags.length > 0 ? (
                                tags.map(tag => (
                                    <div key={tag._id} className="tag-checkbox">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="tags"
                                                value={tag._id}
                                                checked={formData.tags.includes(tag._id)}
                                                onChange={handleChange}
                                            />
                                            {tag.name}
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <div>Нет доступных тегов</div>
                            )}
                        </div>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="save-button">Save Changes</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
