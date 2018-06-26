import ParsedTnef from '../models/ParsedTnef';
import processBytes from './processBytes';
import processBytesToInteger from './processBytesToInteger';

export default (tnefBytes: string[]): ParsedTnef => {
  const bytesBeforeLevel = 0;
  const levelBytes = 1;
  const level = processBytesToInteger(tnefBytes, bytesBeforeLevel, levelBytes);

  const bytesBeforeName = 1;
  const nameBytes = 2;
  const name = processBytesToInteger(tnefBytes, bytesBeforeName, nameBytes);

  const bytesBeforeType = 3;
  const typeBytes = 2;
  const type = processBytesToInteger(tnefBytes, bytesBeforeType, typeBytes);

  const bytesBeforeAtt = 5;
  const attBytes = 4;
  const attLength = processBytesToInteger(tnefBytes, bytesBeforeAtt, attBytes);

  const bytesBeforeData = 9;
  const data = processBytes(tnefBytes, bytesBeforeData, attLength);

  const bytesAfterData = 2;
  const length = bytesBeforeData + attLength + bytesAfterData;

  return { level, name, type, data, length };
};
