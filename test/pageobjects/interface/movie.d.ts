export interface MovieDetail {
  movieName: string;
  locationCinema: string;
}

export type SeatDetails = {
  seatName: string | string[];
  type: {
    name: string;
    price: number;
  };
};
