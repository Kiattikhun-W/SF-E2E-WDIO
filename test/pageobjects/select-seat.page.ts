import Page from "./page.js";
import { MovieDetail } from "./interface/movie.js";
class SelectSeat extends Page {
  public get cinemaName() {
    return $(`//p[@class='cinema']`);
  }

  public get movieName() {
    return $(`//h1[@class='name']`);
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
}
export default new SelectSeat();
