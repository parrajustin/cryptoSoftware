
/**
 * Pads a number so the string representation is a certain length with leading characters
 *
 * @export
 * @param num the input characters
 * @param width the width of the output string
 * @param [filler='0'] the leading filler characthers
 * @returns the string
 */
export function pad(num: string | number, width: number, filler: string = '0'): string {
  if (typeof (num) === 'undefined') {
    num = '';
  }

  const n: string = String(num);
  return n.length >= width ? n : new Array(width - n.length + 1).join(filler) + n;
}
