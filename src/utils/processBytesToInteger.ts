import byteArrayToInt from './byteArrayToInt';
import processBytes from './processBytes';

export default (data: string[], offset: number, length: number) => {
  const bytesToProcess = processBytes(data, offset, length);
  return byteArrayToInt(bytesToProcess);
};
