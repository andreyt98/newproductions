const ReviewCard = ({ result }) => {
  return (
    <>
      <span className="fixed flex justify-between items-center bg-neutral-900">
        <span id="author">
          {result.author_details.username}
          <p className="text-[85%] text-white/50 font-normal">{result.created_at.slice(0, 10)}</p>
        </span>
        <p className="text-[85%] ">Rating: {result.author_details.rating}</p>
      </span>

      <p className="review-text max-md:text-[85%] text-[90%] pb-4" >
        {result.content}
      </p>
    </>
  );
};

export default ReviewCard;
