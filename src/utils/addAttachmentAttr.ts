import * as convertString from 'convert-string';
import Attachment from '../models/Attachment';
import ParsedTnef from '../models/ParsedTnef';
import replaceAll from './replaceAll';

const ATTATTACHDATA = 0x800F; // Attachment Data
const ATTATTACHTITLE = 0x8010; // Attachment File Name

// Right now, adds just the attachment title and data
export default ((tnef: ParsedTnef, attachment: Attachment): Attachment => {
  switch (tnef.name) {
    case ATTATTACHTITLE: {
      const byteString = convertString.bytesToString(tnef.data);
      const title = replaceAll(byteString, '\x00', '');
      return { ...attachment, title };
    }
    case ATTATTACHDATA: {
      const data = tnef.data;
      return { ...attachment, data };
    }
    default: {
      return attachment;
    }
  }
});
