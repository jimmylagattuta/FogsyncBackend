import React from 'react';

const ReviewComponent = ({ reviews }) => {
    // Filter only 4 or 5-star reviews
    const filteredReviews = reviews.filter(review => review.rating >= 4);

    return (
        <div className="review-container">
            {filteredReviews.map((review, index) => (
                <div className="review-card" key={index}>
                    <div className="review-header">
                        <span className="review-author">- {review.user.name}</span>
                        <span className="review-rating">⭐ {review.rating}</span>
                    </div>
                    <p className="review-text">{review.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewComponent;
