import Header from '../components/header.jsx';
import { fetchPromises, deletePromise, updatePromise } from '../api/index.mjs';
import { useState, useEffect } from 'react';
import ChangePopup from './change-popup';

import './promises.css';

export default function PromisesPage() {
    const [proms, setProms] = useState([]);
    const [editingPromise, setEditingPromise] = useState(null);
    
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
        <div>
            <Header />
            <div>
                <h1>Promises Page</h1>
                <p>This is where you can view and manage promises.</p>
                <div className='promises-list'>
                    {proms.map((promise, index) => (
                        <div key={index} className="promise">
                            <h2>{promise.politician}</h2>
                            <p>{promise.promise_text}</p>
                            <p>Source: <a href={promise.source_url}>{promise.source_url}</a></p>
                            <p>Date Given: {new Date(promise.date_given).toLocaleDateString()}</p>
                            <p>Deadline: {new Date(promise.deadline).toLocaleDateString()}</p>
                            <p>Status: {promise.status}</p>
                            <p>Tags: {promise.tags.join(', ')}</p>
                            <div className="button-container">
                                <button 
                                    onClick={() => handleEdit(promise)}
                                    className="edit-button"
                                >
                                    Edit Promise
                                </button>
                                <button 
                                    onClick={() => handleDelete(promise._id)}
                                    className="delete-button"
                                >
                                    Delete Promise
                                </button>
                            </div>
                        </div>
                    ))
                    }
                </div>
                {editingPromise && (
                    <ChangePopup 
                        promise={editingPromise}
                        onClose={() => setEditingPromise(null)}
                        onSave={handleSave}
                    />
                )}
            </div>
        </div>
    );
}