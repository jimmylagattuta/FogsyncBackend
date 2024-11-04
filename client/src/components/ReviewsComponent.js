import React from 'react';

const ReviewComponent = ({ reviews }) => {
    // Filter only 4 or 5-star reviews
    const filteredReviews = reviews.filter(review => review.rating >= 4);

    return (
        <div className="review-container">
            {filteredReviews.map((review, index) => (
                <div className="review-card" key={index}>
                    <p className="review-text">{review.text}</p>
                    <div className="review-footer">
                        <span className="review-rating">⭐ {review.rating}</span>
                        <span className="review-author">- {review.user.name}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ReviewComponent;
