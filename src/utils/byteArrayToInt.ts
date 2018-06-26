const decimalRadix = 10;
const byteLength = 8;

export default (bytes: string[]) => {
  return bytes.reduce((result, byte, byteIndex) => {
    // tslint:disable-next-line:no-bitwise
    return result + (parseInt(byte, decimalRadix) << (byteIndex * byteLength));
  }, 0);
};
