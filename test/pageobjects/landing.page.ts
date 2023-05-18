import Page from "./page.js";
import { MovieDetail } from "./interface/movie.js";
/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingPage extends Page {
  /**
   * define selectors using getter methods
   */
  public get movieLists() {
    return $$(`//*[@class='release-date']/following-sibling::*[@class='name']`);
  }

  public get btnLangSwitcher() {
    return $$(`.lang-switcher li`);
  }

  public get topNavigation() {
    return $(`.signin>a`);
  }

  public get ajsModal() {
    return $(`//div[@class='ajs-modal']`);
  }
  public get ajsModalButton() {
    return $(`//button[@class='ajs-button ajs-ok']`);
  }

  public async switchLanguage() {
    const langLists = await this.btnLangSwitcher;

    for (const langList of langLists) {
      if ((await langList.getText()) === "ENG") {
        await langList.click();
        break;
      }
    }
    await this.topNavigation.waitForDisplayed();
    await expect(this.topNavigation).toHaveTextContaining("Login/Sign up");
  }

  public async selectMovieFromLists({ movieName: selectedMovie }: MovieDetail) {
    const movieLists = await this.movieLists;
    for (const element of movieLists) {
      const movieName = await element.getText();
      if (selectedMovie === movieName) {
        await element.scrollIntoView();
        await element.click();
        break;
      }
    }
  }

  /**
   * overwrite specific options to adapt it to page object
   */
}

export default new LandingPage();
