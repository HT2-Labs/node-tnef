export default (originalText: string, search: string, replacement: string) => {
  return originalText.replace(new RegExp(search, 'g'), replacement);
};
