import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="search-container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Поиск по имени политика или тексту обещания..."
                    className="search-input"
                />
                <div className="search-filters">
                    <select className="filter-select" defaultValue="">
                        <option value="">Все статусы</option>
                        <option value="in_progress">В процессе</option>
                        <option value="fulfilled">Выполнено</option>
                        <option value="broken">Не выполнено</option>
                    </select>
                    <select className="filter-select" defaultValue="">
                        <option value="">Сортировка</option>
                        <option value="deadline_asc">По дедлайну (сначала ближайшие)</option>
                        <option value="deadline_desc">По дедлайну (сначала дальние)</option>
                        <option value="date_given_desc">По дате обещания (сначала новые)</option>
                        <option value="date_given_asc">По дате обещания (сначала старые)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
