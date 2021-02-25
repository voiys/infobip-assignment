class Format {
  static padWithZero(int: number) {
    const stringified = int.toString();
    return stringified.length === 1 ? `0${stringified}` : stringified;
  }
}

export { Format };
