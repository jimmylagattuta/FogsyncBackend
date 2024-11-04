import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewComponent = ({ reviews }) => {
    // Filter only 4 or 5-star reviews
    const filteredReviews = reviews.filter(review => review.rating >= 4);

    return (
        <div class="review-container">
            <div class="review-card">
                <div class="quote-icon">“</div>
                <div class="review-header">
                    <div class="review-avatar">M</div>
                    <div class="review-name">Marylou Taccola</div>
                </div>
                <p class="review-text">
                    I had a rotator cuff surgery. Dr. Erling Ho is by far the best doctor/surgeon...
                </p>
                <div class="review-footer">
                    <span class="review-rating">⭐ 5</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewComponent;
