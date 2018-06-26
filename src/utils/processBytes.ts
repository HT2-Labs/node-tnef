export default (data: string[], offset: number, length: number) => {
  return data.slice(offset, offset + length);
};
