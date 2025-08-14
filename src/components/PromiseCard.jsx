import React from 'react';
import PropTypes from 'prop-types';
import './PromiseCard.css';

const PromiseCard = ({ promise, formatDate }) => {
    const getStatusText = (status) => {
        switch (status) {
            case 'fulfilled':
                return 'Выполнено';
            case 'broken':
                return 'Не выполнено';
            case 'in_progress':
                return 'В процессе';
            default:
                return status;
        }
    };

    return (
        <div className={`promise-card promise-${promise.status}`}>
            <h3>{promise.politician}</h3>
            <p className="promise-text">{promise.promise_text}</p>
            <div className="promise-info">
                <span className="deadline">
                    Дедлайн: {formatDate(promise.deadline)}
                </span>
                <span className={`status status-${promise.status}`}>
                    {getStatusText(promise.status)}
                </span>
            </div>
        </div>
    );
};

PromiseCard.propTypes = {
    promise: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        politician: PropTypes.string.isRequired,
        promise_text: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['fulfilled', 'broken', 'in_progress']).isRequired
    }).isRequired,
    formatDate: PropTypes.func.isRequired
};

export default PromiseCard;
