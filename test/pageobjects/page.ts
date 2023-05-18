/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  public get loadingElem() {
    return $(`#loading`);
  }

  public get jhopeBtn() {
    return $(`//button[@class='button button-enter-site']`);
  }

  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  public open(path: string) {
    return browser.url(`https://www.sfcinemacity.com/${path}`);
  }
}
