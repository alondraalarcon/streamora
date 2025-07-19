import { Star } from 'lucide-react'

interface RatingProps {
    rating: string;
}
const Rating = ({rating} : RatingProps) => {
  return (
    <div className="flex flex-row gap-2">
        <div className="flex flex-row capitalize items-center text-sm gap-1"><Star className="text-yellow-500" fill="currentColor" size={15}/>{rating}</div>
    </div>
  )
}

export default Rating