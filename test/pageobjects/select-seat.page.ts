import Page from "./page.js";
import { MovieDetail, SeatDetails } from "./interface/movie.js";
import { sortSeats, isSeatNameArray } from "../helper/helper.js";

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

  public async reserveSeat(seatDetails: SeatDetails[]) {
    let seatButton = await this.seatButton(null);

    for (let seatDetail of seatDetails) {
      const seatNames = isSeatNameArray(seatDetail.seatName)
        ? seatDetail.seatName
        : [seatDetail.seatName];

      for (const seatName of seatNames) {
        seatButton = await this.seatButton(seatName);
        await seatButton.scrollIntoView({ block: "center" });

        if (seatDetail.type.name.toLocaleLowerCase().includes("pair")) {
          if (await seatButton.isClickable()) {
            await seatButton.click();
            await expect(seatButton).toHaveAttributeContaining(
              "class",
              "seat-selected"
            );
            console.log(`💯Seat ${seatName} selected successfully.`);
          } else {
            console.log(`😈Seat ${seatName} is not available.`);
          }
          break; // Exit the loop after the first click
        }

        if (await seatButton.isClickable()) {
          await seatButton.click();
          await expect(seatButton).toHaveAttributeContaining(
            "class",
            "seat-selected"
          );
          console.log(`💯Seat ${seatName} selected successfully.`);
        } else {
          console.log(`😈Seat ${seatName} is not available.`);
        }
      }
    }
  }
}
export default new SelectSeat();
