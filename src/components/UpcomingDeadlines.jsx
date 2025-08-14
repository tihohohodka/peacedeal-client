import React from 'react';
import PropTypes from 'prop-types';
import PromiseCard from './PromiseCard';
import './UpcomingDeadlines.css';

const UpcomingDeadlines = ({ promises, formatDate }) => {
    return (
        <section className="upcoming-deadlines">
            <h2>Ближайшие дедлайны</h2>
            <div className="upcoming-promises">
                {promises.map((promise) => (
                    <PromiseCard
                        key={promise._id}
                        promise={promise}
                        formatDate={formatDate}
                    />
                ))}
            </div>
        </section>
    );
};

UpcomingDeadlines.propTypes = {
    promises: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            politician: PropTypes.string.isRequired,
            promise_text: PropTypes.string.isRequired,
            deadline: PropTypes.string.isRequired,
            status: PropTypes.oneOf(['fulfilled', 'broken', 'in_progress']).isRequired
        })
    ).isRequired,
    formatDate: PropTypes.func.isRequired
};

export default UpcomingDeadlines;
