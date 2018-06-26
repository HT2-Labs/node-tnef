import Attachment from './Attachment';
import Attribute from './Attribute';

export default interface DecodedTnef {
  readonly body: string[];
  readonly attachments: Attachment[];
  // tslint:disable-next-line:readonly-keyword
  attributes: Attribute[];
}
