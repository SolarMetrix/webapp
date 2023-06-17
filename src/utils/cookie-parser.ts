export default function getParsedCookies(cookies?: any) {
  let cookiesObj: any = {};
  let cookiesString: string = "";

  if (cookies) {
    cookiesString = cookies;
  } else {
    if (typeof document === "undefined") return;
    cookiesString = document.cookie;
  }

  if (cookiesString) {
    cookiesString.split("; ").map((element: string) => {
      const cookieArr = element.split("=");
      cookiesObj[cookieArr[0] as any] = cookieArr[1];
    });
  }

  return cookiesObj;
}
