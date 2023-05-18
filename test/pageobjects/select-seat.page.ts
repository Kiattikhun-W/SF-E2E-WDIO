import Page from "./page.js";
import { MovieDetail } from "./interface/movie.js";
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

  public async reserveSeat2(...seatNames: string[]) {
    for (let seatName of seatNames) {
      const seatButton = await this.seatButton(seatName);
      await seatButton.scrollIntoView({ block: "center" });
      if (await seatButton.isClickable()) {
        //use expect(button).isClickable
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
export default new SelectSeat();
