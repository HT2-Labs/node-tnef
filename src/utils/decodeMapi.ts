import Attribute from '../models/Attribute';
import getTypeSize from './getTypeSize';
import processBytes from './processBytes';
import processBytesToInteger from './processBytesToInteger';

const mvFlag = 0x1000; // OR with type means multiple values

export default (data: string[]): Attribute[] => {
  const attrs = [];
  const dataLen = data.length;

  const bytesBeforeNumAttrs = 0;
  const numAttrsBytes = 4;
  const numAttrs = processBytesToInteger(data, bytesBeforeNumAttrs, numAttrsBytes);

  const offset = 4;
  for (const i = 0; i < numAttrs; i++) {
    if (offset >= dataLen) {
      continue;
    }

    const attrType = processBytesToInteger(data, offset, 2);
    offset += 2;

    const attrName = processBytesToInteger(data, offset, 2);
    offset += 2;

    const guid = 0;
    if (attrName >= 0x8000 && attrName <= 0xFFFE) {
      guid = processBytesToInteger(data, offset, 16);
      offset += 16;
      const kind = processBytesToInteger(data, offset, 4);
      offset += 4;

      if (kind === 0) {
        offset += 4;
      } else if (kind === 1) {
        const iidLen = processBytesToInteger(data, offset, 4);
        offset += 4;
        offset += iidLen;
        offset += (-iidLen & 3);
      }
    }

    // Handle multi-value properties
    const isMultiValue = (attrType & mvFlag) !== 0;
    attrType &= mvFlag;

    const typeSize = getTypeSize(attrType);
    if (typeSize < 0) {
      isMultiValue = true;
    }

    const valueCount = 1;
    if (isMultiValue) {
      valueCount = processBytesToInteger(data, offset, 4);
      offset += 4;
    }

    if (valueCount > 1024 && valueCount > data.length) {
      return;
    }

    const attrData = [];

    for (const i = 0; i < valueCount; i++) {
      const length = typeSize;
      if (typeSize < 0) {
        length = processBytesToInteger(data, offset, 4);
        offset += 4;
      }

      // Read the data in
      attrData.push(processBytes(data, offset, length));

      offset += length + (length % 4);
    }

    attrs.push({ Type: attrType, Name: attrName, Data: attrData, GUID: guid });
  }

  return attrs;
};
