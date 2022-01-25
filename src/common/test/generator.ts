export interface IGenerated<T> {
  list?: T[];
  item?: T;
}

export class BaseGenerator {
  static generator<T>(cb: () => T, count = 1): IGenerated<T> {
    if (count > 1) {
      const list: T[] = Array.from({ length: count }, cb);
      return { list };
    }
    const item: T = cb();
    return {
      item,
    };
  }
}
