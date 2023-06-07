import "./Rating.css"

import React from "react"

const Rating = ({ value }) => {
  const maxStars = 5
  const filledStars = Math.min(value, maxStars)
  const emptyStars = maxStars - filledStars

  return (
    <div>
      {[...Array(filledStars)].map((_, index) => (
        <span key={index} className="star filled-star"></span>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="star empty-star"></span>
      ))}
    </div>
  )
}

export default Rating
