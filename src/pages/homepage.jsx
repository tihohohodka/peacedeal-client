import React, { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import HomeIntro from '../components/HomeIntro';
import UpcomingDeadlines from '../components/UpcomingDeadlines';
import { fetchPromises } from '../api/index.mjs';
import './homepage.css';

export default function Homepage() {
    const [upcomingPromises, setUpcomingPromises] = useState([]);

    useEffect(() => {
        fetchPromises()
            .then(response => {
                // Sort promises by deadline and take first 3
                const sorted = response.data
                    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                    .filter(promise => new Date(promise.deadline) > new Date()) // Only future deadlines
                    .slice(0, 3);
                setUpcomingPromises(sorted);
            })
            .catch(error => {
                console.error('Error fetching promises:', error);
            });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <React.StrictMode>
            <Header />
            <div className="homepage">
                <HomeIntro />
                <UpcomingDeadlines 
                    promises={upcomingPromises}
                    formatDate={formatDate}
                />
            </div>
        </React.StrictMode>
    )
}
