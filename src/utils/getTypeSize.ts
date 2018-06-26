const szmapiShort = 0x0002; // # MAPI short (signed 16 bits)
const szmapiInt = 0x0003; // # MAPI integer (signed 32 bits)
const szmapiFloat = 0x0004; // # MAPI float (4 bytes)
const szmapiDouble = 0x0005; // # MAPI double
const szmapiCurrency = 0x0006; // # MAPI currency (64 bits)
const szmapiApptime = 0x0007; // # MAPI application time
const szmapiError = 0x000A; // # MAPI error (32 bits)
const szmapiBoolean = 0x000B; // # MAPI boolean (16 bits)
const szmapiObject = 0x000D; // # MAPI embedded object
const szmapiInt8byte = 0x0014; // # MAPI 8 byte signed int
const szmapiString = 0x001E; // # MAPI string
const szmapiUnicodeString = 0x001F; // # MAPI unicode-string (null terminated)
const szmapiSystime = 0x0040; // # MAPI time (64 bits)
const szmapiCLSID = 0x0048; // # MAPI OLE GUID
const szmapiBinary = 0x0102; // # MAPI binary

// tslint:disable:no-magic-numbers
export default (attrType: number) => {
  switch (attrType) {
    case szmapiShort:
    case szmapiBoolean:
      return 2;
    case szmapiInt:
    case szmapiFloat:
    case szmapiError:
      return 4;
    case szmapiDouble:
    case szmapiApptime:
    case szmapiCurrency:
    case szmapiInt8byte:
    case szmapiSystime:
      return 8;
    case szmapiCLSID:
      return 16;
    case szmapiString:
    case szmapiUnicodeString:
    case szmapiObject:
    case szmapiBinary:
      return -1;
    default:
      return 0;
  }
};
// tslint:enable:no-magic-numbers
