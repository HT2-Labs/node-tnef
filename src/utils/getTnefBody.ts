import Attribute from '../models/Attribute';

const MAPI_BODY = 0x1000;
const MAPI_BODY_HTML = 0x1013;

export default (attrs: Attribute[]): string[] => {
  const bodyAttrs = attrs.filter((attr) => {
    return attr.name === MAPI_BODY || attr.name === MAPI_BODY_HTML;
  });
  if (bodyAttrs.length === 0) {
    return [];
  }
  return bodyAttrs[bodyAttrs.length - 1].data;
};
