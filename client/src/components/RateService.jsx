import React, { useState, useEffect } from "react";
import { LiaStarSolid } from "react-icons/lia";

function RateService({ serviceId, initialRating, onUpdateRating }) {
  const [totalRating, setTotalRating] = useState(initialRating || 0);
  const [hasRated, setHasRated] = useState(
    localStorage.getItem(`hasRated_${serviceId}`) === "true"
  );

  useEffect(() => {
    const storedRating = localStorage.getItem(`serviceRating_${serviceId}`);
    if (storedRating) {
      setTotalRating(parseInt(storedRating, 10));
    }
  }, [serviceId]);

  const handleRateService = async () => {
    if (!hasRated) {
      const newRating = totalRating + 1;
      setTotalRating(newRating);
      localStorage.setItem(`serviceRating_${serviceId}`, newRating);
      onUpdateRating(serviceId, newRating);
      setHasRated(true);
      localStorage.setItem(`hasRated_${serviceId}`, "true");
    }
  };

  return (
    <div>
      <p className="flex justify-end" onClick={handleRateService}>
        <LiaStarSolid className="items-center" size={25} />
        {totalRating}
      </p>
    </div>
  );
}

export default RateService;