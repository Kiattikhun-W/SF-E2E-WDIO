import Page from "./page.js";
import { MovieDetail } from "./interface/movie.js";
class MoviePage extends Page {
  public get cinemaLocation() {
    return $$(`.showtime-cinema `);
  }

  public get inputTextSearchCinema() {
    return $(`//div[contains(@class,'input-wrapper')]/input`);
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
    const btnShowTimeActive = await this.btnShowTimeActive;
    await this.inputTextSearchCinema.setValue(selectedCinema);

    await browser.waitUntil(
      async () => {
        const cinemaNameElem = await this.cinemaName;
        const cinemaNameText = (await cinemaNameElem.getText())
          .replace("star", "")
          .trim();
        return cinemaNameText === selectedCinema;
      },
      {
        timeout: 5000,
        interval: 500,
        timeoutMsg: `a`,
      }
    );

    (await this.cinemaName).scrollIntoView({ block: "center" });

    await btnShowTimeActive.click();
  }
}

export default new MoviePage();
