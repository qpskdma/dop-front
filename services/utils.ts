export default class Utils {
  static sortArrayByField<T>(
    array: Array<T>,
    sortField: keyof T,
    direction: boolean
  ): Array<T> {
    return array.sort((a: T, b: T) => {
      if (a[sortField] < b[sortField]) return direction ? -1 : 1;
      if (a[sortField] > b[sortField]) return direction ? 1 : -1;
      return 0;
    });
  }

  static sortArrayByNumberField<T>(
    array: Array<T>,
    sortField: keyof T
  ): Array<T> {
    return array.sort((a: T, b: T) => {
      if (Number(a[sortField]) < Number(b[sortField])) return -1;
      if (Number(a[sortField]) > Number(b[sortField])) return 1;
      return 0;
    });
  }
}
