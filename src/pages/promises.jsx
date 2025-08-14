import Header from '../components/header.jsx';
import SearchBar from '../components/SearchBar';
import { fetchPromises, deletePromise, updatePromise } from '../api/index.mjs';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChangePopup from './change-popup';

import './promises.css';

export default function PromisesPage() {
    const [proms, setProms] = useState([]);
    const [editingPromise, setEditingPromise] = useState(null);
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');
    
    const handleEdit = (promise) => {
        setEditingPromise(promise);
    };

    const handleSave = (updatedData) => {
        updatePromise(editingPromise._id, updatedData)
            .then(response => {
                // Update the promise in the local state
                setProms(proms.map(p => 
                    p._id === editingPromise._id ? { ...p, ...updatedData } : p
                ));
                setEditingPromise(null); // Close the popup
            })
            .catch(error => {
                console.error('Error updating promise:', error);
                alert('Failed to update the promise. Please try again.');
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this promise?')) {
            deletePromise(id)
                .then(() => {
                    // Remove the deleted promise from the state
                    setProms(proms.filter(promise => promise._id !== id));
                })
                .catch(error => {
                    console.error('Error deleting promise:', error);
                    alert('Failed to delete the promise. Please try again.');
                });
        }
    };

    useEffect(() => {
            fetchPromises()
                .then(response => {
                    console.log('Fetched promises:', response.data);
                    setProms(response.data);
                })
                .catch(error => {
                    console.error('Error fetching promises:', error);
                });
        }, []);
    return (
        <div className="app-container">
            <Header />
            <div className="promises-page">
                <h1>Обещания политиков</h1>
                <SearchBar />
                <div className='promises-list'>
                    {proms.map((promise, index) => (
                        <div key={index} className={`promise promise-${promise.status}`}>
                            <h2>{promise.politician}</h2>
                            <p>{promise.promise_text}</p>
                            <p>Source: <a href={promise.source_url}>{promise.source_url}</a></p>
                            <p>Date Given: {new Date(promise.date_given).toLocaleDateString()}</p>
                            <p>Deadline: {new Date(promise.deadline).toLocaleDateString()}</p>
                            <p className="status">
                                {promise.status === 'fulfilled' && 'Выполнено'}
                                {promise.status === 'broken' && 'Провалено'}
                                {promise.status === 'in_progress' && 'В процессе'}
                            </p>
                            <p>Tags: {promise.tags.map(tag => tag.name).join(', ')}</p>
                            {isAuthenticated && (
                                <div className="button-container">
                                    <button 
                                        onClick={() => handleEdit(promise)}
                                        className="edit-button"
                                    >
                                        Редактировать
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(promise._id)}
                                        className="delete-button"
                                    >
                                        Удалить
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}