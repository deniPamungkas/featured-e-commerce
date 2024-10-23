import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

const StarRatingComponent = ({ rating, handleRatingChange }) => {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      key={star}
      className={` w-5 h-5 bg-transparent border-none ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-5 h-5 ${
          star <= rating ? "fill-yellow-500" : "fill-black"
        }`}
      />
    </Button>
  ));
};

export default StarRatingComponent;
