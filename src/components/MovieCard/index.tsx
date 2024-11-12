import Image from 'next/image';
import { FaStar } from "react-icons/fa";
export default function MovieCard() {
  return (
    <div className={"flex flex-col gap-1"}>
      <button className={"flex relative hover:opacity-50 transition-3s active:opacity-100"}>
        <Image
          className={"rounded-xl"}
          src={"https://m.media-amazon.com/images/I/71OHH9HaB5S._AC_SY550_.jpg"}
          alt="Movie Poster"
          width={200}
          height={304}
        />
        <span className={"flex gap-1 rounded-full px-3 items-center absolute right-2 top-2 bg-lgBlue"}>
          <FaStar size="10px" />
          8.4
        </span>
      </button>

      <div>
        <h4>Tenet</h4>
        <h5 className={"text-gray"}>02h 30m</h5>
      </div>

    </div>
  );
}
