import {
  Cookie as cookie,
  getCookies as getcookies,
  setCookie as setcookie,
} from "https://deno.land/std@0.105.0/http/cookie.ts";
import {XapiRequest, XapiResponse} from "../http/mod.ts";
export class HttpCookie implements cookie {
  name: string;
  /** Value of the cookie. */
  value: string;
  /** Expiration date of the cookie. */
  expires?: Date;
  /** Max-Age of the Cookie. Max-Age must be an integer superior or equal to 0. */
  maxAge?: number;
  /** Specifies those hosts to which the cookie will be sent. */
  domain?: string;
  /** Indicates a URL path that must exist in the request. */
  path?: string;
  /** Indicates if the cookie is made using SSL & HTTPS. */
  secure?: boolean;
  /** Indicates that cookie is not accessible via JavaScript. **/
  httpOnly?: boolean;
  /** Allows servers to assert that a cookie ought not to
   * be sent along with cross-site requests. */
  sameSite?: "Strict" | "Lax" | "None";
  /** Additional key value pairs with the form "key=value" */
  unparsed?: string[];
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export function getCookies(request: XapiRequest) {
  return getcookies(request);
}

export function setCookie(response: XapiResponse, cookie: HttpCookie) {
  const resInit = {headers: new Headers()};
  setcookie(resInit, cookie);
  response.setHeaders({"set-cookie": resInit.headers.get("set-cookie")});
}
