import React from 'react';
import Header from'../components/header.jsx';
import '../App.css';
import { fetchTags, postPromises } from '../api/index.mjs';
import { useState, useEffect } from 'react';

export default function Creation() {
    const [tags, setTags] = useState([]);
    const [inputs, setInputs] = useState({
        politician: '',
        promise_text: '',
        source_url: '',
        date_given: '',
        deadline: '',
        status: '',
        tags: []
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'tags' && type === 'checkbox') {
            setInputs(prev => {
                if (checked) {
                    // Add tag
                    return { ...prev, tags: [...prev.tags, value] };
                } else {
                    // Remove tag
                    return { ...prev, tags: prev.tags.filter(tag => tag !== value) };
                }
            });
        } else {
            setInputs(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postPromises(inputs);
    };

    return (
        <React.StrictMode>
            <Header />
            <div className="creation-page">
                <h2>Создать новое обещание</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="politician"
                        placeholder="Политик"
                        value={inputs.politician}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="promise_text"
                        placeholder="Обещание"
                        value={inputs.promise_text}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="source_url"
                        placeholder="Источник"
                        value={inputs.source_url}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        name="date_given"
                        placeholder="Дата"
                        value={inputs.date_given}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        name="deadline"
                        placeholder="Срок исполнения"
                        value={inputs.deadline}
                        onChange={handleInputChange}
                    />
                    <select
                        name="status"
                        value={inputs.status}
                        onChange={handleInputChange}
                    >
                        <option value="">Статус</option>
                        <option value="fulfilled">выполнено</option>
                        <option value="broken">провалено</option>
                        <option value="in_progress">в процессе</option>
                    </select>
                    <div style={{ margin: '10px 0' }}>
                        <label>Теги:</label>
                        {tags && tags.length > 0 ? (
                            tags.map(tag => (
                                <div key={tag._id}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="tags"
                                            value={tag._id}
                                            checked={inputs.tags.includes(tag._id)}
                                            onChange={handleInputChange}
                                        />
                                        {tag.name}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <div>Нет доступных тегов</div>
                        )}
                    </div>
                    <button type="submit">Сохранить</button>
                </form>
            </div>
        </React.StrictMode>
    );
}
