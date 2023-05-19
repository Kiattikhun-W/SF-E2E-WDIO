import Page from "./page.js";
import { MovieDetail, SeatDetails } from "./interface/movie.js";
import { sortSeats } from "../helper/helper.js";

class SelectSeat extends Page {
  public get cinemaName() {
    return $(`//p[@class='cinema']`);
  }

  public get movieName() {
    return $(`//h1[@class='name']`);
  }

  public get seatButton() {
    return (seatName: string) => $(`button[seatname="${seatName}"]`);
  }

  public get selectedSeat() {
    return $(`//ul[@class='selected-seat']`);
  }

  public get totalPrice() {
    return $(`//p[@class='total-price']`);
  }

  public async validateSameCinema({
    locationCinema: selectedCinema,
    movieName: selectedMovie,
  }: MovieDetail) {
    let cinemaName = await this.cinemaName.getText();
    const movieName = await this.movieName.getText();
    cinemaName = cinemaName.replace("location", "").trim();
    await expect(cinemaName).toEqual(selectedCinema);
    await expect(movieName).toEqual(selectedMovie);
  }

  public async reserveSeat(SeatDetails: SeatDetails[]) {
    const prices: number[] = [];
    for (let seatDetail of SeatDetails) {
      // if(typeof seatDetail['seatName'] === )
      const seatButton = await this.seatButton("H1");
      await seatButton.scrollIntoView({ block: "center" });
      if (await seatButton.isClickable()) {
        //use expect(button).isClickable
        await seatButton.click();
        await expect(seatButton).toHaveAttributeContaining(
          "class",
          "seat-selected"
        );
        console.log(`💯Seat ${seatDetail} selected successfully.`);
      } else {
        console.log(`😈Seat ${seatDetail} is not available.`);
      }
    }
  }
}
export default new SelectSeat();
