export interface IUser {
  createdAt: string;
  email: string;
  movies: Movie[];
  name: string;
  profilePhoto: string;
  updatedAt: string;
  _id: string;
};

interface Movie {
  movieId: number;
  _id: string;
};