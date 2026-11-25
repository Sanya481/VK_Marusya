module.exports = {
  jsxRuntime: 'automatic', // ← отключает импорт React (использует новую JSX-трансформацию)
  typescript: true, // ← генерирует .tsx файлы с типами (SVGProps)
  svgo: false, // ← отключает оптимизацию SVG (иногда ломает сложные иконки)
  replaceAttrValues: {
    white: 'currentColor',
    black: 'currentColor',
    '#B4A9FF': 'currentColor',
  },
};
