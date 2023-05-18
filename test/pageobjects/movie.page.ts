import Page from "./page.js";
import { MovieDetail } from "./interface/movie.js";
class MoviePage extends Page {
  public get cinemaLocation() {
    return $$(`.showtime-cinema `);
  }

  public get inputTextSearchCinema() {
    return $(`//div[@class='input-wrapper']/input`);
  }

  public get cinemaName() {
    return $(`//div[@class='showtime-cinema']`);
  }

  public get movieTimeLists() {
    return $$(`(//ul[@class='time-list'])[1]//button`);
  }

  public get btnShowTimeActive() {
    return $(`(//button[@class='button button-showtime active'])[1]`);
  }
  public async selectCinema({ locationCinema: selectedCinema }: MovieDetail) {
    const cinemas = await this.cinemaLocation;

    for (const cinema of cinemas) {
      let cinemaEachName = await cinema.getText();
      cinemaEachName = cinemaEachName.replace("star", "");

      if (cinemaEachName.trim() === selectedCinema) {
        await this.inputTextSearchCinema.setValue(selectedCinema);
      }
    }
  }
  public async SelectFirstTheater() {
    const btnShowTimeActive = await this.btnShowTimeActive;
    const cinemaName = await this.cinemaName;

    await btnShowTimeActive.scrollIntoView();

    await browser.waitUntil(
      async () => await cinemaName.isDisplayedInViewport()
    );

    await btnShowTimeActive.click();
  }
}

export default new MoviePage();
