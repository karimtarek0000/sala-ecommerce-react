import Cookies, { CookieSetOptions } from "universal-cookie";
const cookies = new Cookies({});

// Format for EXPIRES cookie
const date = new Date();
const IN_DAYS = 2;
const EXPIRES = 1000 * 60 * 60 * 24 * IN_DAYS;
date.setTime(date.getTime() + EXPIRES);

class CookieServices {
  setCookie(name: string, value: string, options: CookieSetOptions) {
    cookies.set(name, value, { path: "/", expires: date, ...options });
  }
  getCookie(name: string) {
    return cookies.get(name);
  }
  removeCookie(name: string) {
    cookies.remove(name);
  }
}

export default new CookieServices();
