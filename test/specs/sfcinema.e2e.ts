import dayjs from "dayjs";
import { MovieDetail } from "../pageobjects/interface/movie.js";

import landingPage from "../pageobjects/landing.page.js";
import MoviePage from "../pageobjects/movie.page.js";
import SelectSeat from "../pageobjects/select-seat.page.js";
import Page from "../pageobjects/page.js";

describe("Movie should be selected", () => {
  beforeEach(async () => {
    await browser.url("/");
    await browser.maximizeWindow();
  });
  it("landingpage can be select Seat", async () => {
    const movieDetail: MovieDetail = {
      movieName: "Fast & Furious X",
      // locationCinema: "SF CINEMA Robinson Lifestyle Buriram",
      locationCinema: "SF CINEMA Robinson Lifestyle Surin",
    };

    await landingPage.ajsModal.waitForExist({ timeout: 5000 });
    await landingPage.ajsModalButton.click();

    await browser.waitUntil(
      async () => await new Page().jhopeBtn.isDisplayed(),
      {
        timeout: 5000,
        timeoutMsg: "Expected element #jhopeBtn to display but not display",
        interval: 500, // Check every 500ms
      }
    );

    await new Page().jhopeBtn.click();

    await landingPage.switchLanguage();
    await landingPage.selectMovieFromLists(movieDetail);

    await expect(browser).toHaveUrlContaining("showtime/movie/");
    await browser.waitUntil(
      async () => (await new Page().loadingElem.isDisplayed()) === false,
      {
        timeout: 5000,
        timeoutMsg: "Expected element #loading to be hidden after 5s",
        interval: 500, // Check every 500ms
      }
    );
    await MoviePage.selectCinema(movieDetail);
    await MoviePage.SelectFirstTheater();

    await expect(browser).toHaveUrlContaining("select-seat");
    await SelectSeat.validateSameCinema(movieDetail);
    await SelectSeat.reserveSeat2("N2", "N3");
    await browser.pause(2000);
  });

  // it("Select Movie from movie lists", async () => {});
});
