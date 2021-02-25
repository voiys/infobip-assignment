class OffsetDate extends Date {
  constructor(offset: number = 1) {
    super();

    this.setDate(this.getDate() + offset);
  }
}

export { OffsetDate };
