import React, { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import PromiseCard from '../components/PromiseCard';
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
                <section className="about-section">
                    <h1>Добро пожаловать в PeaceDeal</h1>
                    <p>
                        PeaceDeal - это уникальная платформа для отслеживания обещаний политиков и общественных деятелей. 
                        Мы помогаем гражданам быть в курсе того, какие обещания были даны, какие из них выполнены, 
                        а какие остаются невыполненными.
                    </p>
                    <p>
                        Наша миссия - повышение прозрачности и ответственности в политической сфере через 
                        документирование и мониторинг публичных обещаний. Присоединяйтесь к нам в создании 
                        более открытого и ответственного общества.
                    </p>
                </section>

                <section className="upcoming-deadlines">
                    <h2>Ближайшие дедлайны</h2>
                    <div className="upcoming-promises">
                        {upcomingPromises.map((promise) => (
                            <PromiseCard
                                key={promise._id}
                                promise={promise}
                                formatDate={formatDate}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </React.StrictMode>
    )
}
