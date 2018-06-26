import SignatureMismatchError from './errors/SignatureMismatchError';
import Attachment from './models/Attachment';
import Attribute from './models/Attribute';
import DecodedTnef from './models/DecodedTnef';
import addAttachmentAttr from './utils/addAttachmentAttr';
import decodeMapi from './utils/decodeMapi';
import getTnefBody from './utils/getTnefBody';
import parseTnefBytes from './utils/parseTnefBytes';
import processBytes from './utils/processBytes';
import processBytesToInteger from './utils/processBytesToInteger';

const tnefSignature = 0x223E9F78;
const lvlAttachment = 0x02;

const ATTATTACHRENDDATA = 0x9002; // Attachment Rendering Data
const ATTMAPIPROPS = 0x9003; // MAPI Properties

export default (tnefString: string): DecodedTnef => {
  const tnefData = tnefString.split('');
  const bytesBeforeSignature = 0;
  const signatureBytes = 4;
  const signature = processBytesToInteger(tnefData, bytesBeforeSignature, signatureBytes);

  // If the signature we get doesn't match the TNEF signature, exit
  if (signature !== tnefSignature) {
    throw new SignatureMismatchError(signature, tnefSignature);
  }

  // Set the starting offset past the signature
  let offset = 6; // tslint:disable-line:no-let
  let attributes: Attribute[] = []; // tslint:disable-line:no-let
  const attachments: Attachment[] = [];

  // Iterate through the data
  while (offset < tnefData.length) {
    const tempData = processBytes(tnefData, offset, tnefData.length);
    const parsedTnef = parseTnefBytes(tempData);

    // Increment offset based on the returned object's length
    offset += parsedTnef.length;

    // Append attributes and attachments
    if (parsedTnef.name === ATTATTACHRENDDATA) {
      attachments.push({ title: '', data: [] });
    } else if (parsedTnef.level === lvlAttachment) {
      const currentAttachment = attachments[attachments.length - 1];
      const modifiedAttachment = addAttachmentAttr(parsedTnef, currentAttachment);
      attachments.pop();
      attachments.push(modifiedAttachment);
    } else if (parsedTnef.name === ATTMAPIPROPS) {
      attributes = decodeMapi(parsedTnef.data);
    }
  }

  const body = getTnefBody(attributes);
  return { body, attributes, attachments };
};
