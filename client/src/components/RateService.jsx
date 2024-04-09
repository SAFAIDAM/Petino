import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; // Import star icons

function RateService({ serviceId }) {
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    fetchAverageRating();
  }, []);

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`/api/services/${serviceId}/averageRating`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const handleRateService = async (rating) => {
    try {
      const userId = ''; // You need to implement authentication to get the userId
      await axios.put(`/api/services/${serviceId}/rating`, { userId, rating });
      fetchAverageRating();
      setUserRating(rating);
    } catch (error) {
      console.error('Error rating service:', error);
    }
  };

  // Function to render star icons
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= userRating) {
        stars.push(<AiFillStar key={i} onClick={() => handleRateService(i)} />);
      } else {
        stars.push(<AiOutlineStar key={i} onClick={() => handleRateService(i)} />);
      }
    }
    return stars;
  };

  return (
    <div className=''>
      <p className='flex'>Your Rating: {renderStars()}</p>
    </div>
  );
}

export default RateService;
