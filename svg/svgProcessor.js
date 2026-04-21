export const processSvgXml = (xmlString, color) => {
  if (!xmlString) return null;

  return xmlString
    .replace(/<style>.*?<\/style>/gs, '')
    .replace(/var\(--fillColor-light(?:,\s*[^)]+)?\)/g, color)
    .replace(/var\(--fillColor-dark(?:,\s*[^)]+)?\)/g, color)
    .replace(/var\(--fillColor(?:,\s*[^)]+)?\)/g, color)
    .replace(/var\(--truck-color-light(?:,\s*[^)]+)?\)/g, color)
    .replace(/var\(--truck-color(?:,\s*[^)]+)?\)/g, color)
    .replace(/style="([^"]*)"/g, (match, styleContent) => {
      let coloredStyle = styleContent
        .replace(/var\(--fillColor-light(?:,\s*[^)]+)?\)/g, color)
        .replace(/var\(--fillColor-dark(?:,\s*[^)]+)?\)/g, color)
        .replace(/var\(--fillColor(?:,\s*[^)]+)?\)/g, color)
        .replace(/var\(--truck-color-light(?:,\s*[^)]+)?\)/g, color)
        .replace(/var\(--truck-color(?:,\s*[^)]+)?\)/g, color)
        .replace(/--[^:]+:\s*[^;]+;/g, '')
        .replace(/transition:[^;]+;/g, '')
        .replace(/enable-background:[^;]+;/g, '');
      coloredStyle = coloredStyle.trim();
      if (coloredStyle === '') return '';
      return `style="${coloredStyle}"`;
    })
    .replace(/class="[^"]*"/g, '');
};
