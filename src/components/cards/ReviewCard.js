import { Button, Card, CardActions, CardContent, Rating, Typography } from '@mui/material'
import React from 'react'
import './reviewCard.css'

const ReviewCard = ({review}) => {
  console.log(review.name)
  return (
<div className="review-card-container ">
<div className="review-card d-flex flex-wrap ">
        <div className="review-image">
            <img src={review.profile} alt="" />
        </div>
        <p className='w-100 text-center p-0 m-0'>{review.name}</p>
        <div className='w-100 d-flex justify-content-center'><Rating value={review.rating}/></div>
        <p className='m-0 h-40 p-0'>{review.comment}</p>
    </div>
</div>
);
  
}

export default ReviewCard