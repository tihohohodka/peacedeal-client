import Header from '../components/header.jsx';
import { fetchPromises } from '../api/index.mjs';
import { useState, useEffect } from 'react';

import './promises.css';

export default function PromisesPage() {
    const [proms, setProms] = useState([]);
    
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
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}