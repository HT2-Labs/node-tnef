import getTypeSize from './getTypeSize';
import processBytes from './processBytes';
import processBytesToInteger from './processBytesToInteger';

const intByteLength = 4;
const maxValueCount = 1024;
const mvFlag = 0x1000;

export default (data: string[], givenAttrType: number) => {
  const attrType = givenAttrType & mvFlag; // tslint:disable-line:no-bitwise
  const typeSize = getTypeSize(attrType);
  const isMultiValue = ((givenAttrType) !== 0 || typeSize < 0);
  const valueCount = isMultiValue ? processBytesToInteger(data, 0, intByteLength) : 1;

  if (valueCount > maxValueCount && valueCount > data.length) {
    throw new Error();
  }

  // tslint:disable-next-line:no-let
  let offset = isMultiValue ? intByteLength : 0;
  const attrData = [];

  // tslint:disable-next-line:no-let
  for (let i = 0; i < valueCount; i++) {
    const dataLength = typeSize < 0 ? processBytesToInteger(data, offset, intByteLength) : typeSize;
    offset += typeSize < 0 ? intByteLength : 0;

    // Read the data in
    attrData.push(processBytes(data, offset, dataLength));
    offset += dataLength + (dataLength % intByteLength);
  }

  return { attrData, offset };
};
