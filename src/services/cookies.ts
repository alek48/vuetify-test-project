export default {
  set(name: string, value: string) {
    document.cookie = name + "=" + value;
  },
  get(name: string) {
    const searchString = name + "=";
    const cookie = decodeURIComponent(document.cookie).split(";");
    for (const elem of cookie) {
      if (elem.trimStart().startsWith(searchString)) {
        return elem.trimStart().substring(searchString.length);
      }
    }
    return "";
  },
};
