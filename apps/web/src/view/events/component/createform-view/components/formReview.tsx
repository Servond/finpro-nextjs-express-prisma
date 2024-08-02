import { useState, useEffect } from 'react';
import { IReview, IReviewsProps } from '@/interface/event.interface';

const Reviews = ({ eventId }: IReviewsProps) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 1,
    comment: '',
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/events/${eventId}/reviews`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [eventId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleRatingClick = (rating: number) => {
    setNewReview((prevReview) => ({
      ...prevReview,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newReview.name || !newReview.comment) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/events/${eventId}/createreviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const review = await response.json();
      setReviews((prevReviews) => [...prevReviews, review]);
      setNewReview({ name: '', rating: 1, comment: '' });
      setError(null);
    } catch (err) {
      setError('Failed to submit review');
      console.error(err);
    }
  };

  const renderStars = (rating: number, isClickable: boolean = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          onClick={() => isClickable && handleRatingClick(i)}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <div className="max-h-60 overflow-y-auto mb-4">
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className=" border-b border-gray-200">
                <p className="font-bold">{review.name}</p>
                <p>{renderStars(review.rating)}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm font-bold mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={newReview.name}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Rating:</label>
            <div className="flex space-x-1">
              {renderStars(newReview.rating, true)}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Comment:</label>
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              className="border p-2 w-full"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
