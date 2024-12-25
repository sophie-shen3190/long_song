import baseConfig from 'tailwind-config'
import type { Config } from 'tailwindcss'

const colors = {
  primary: {
    light: '#a855f7', // 亮紫色
    DEFAULT: '#9333ea', // 主紫色
    dark: '#7e22ce' // 深紫色
  },
  secondary: {
    light: '#ec4899', // 亮粉色
    DEFAULT: '#db2777', // 主粉色
    dark: '#be185d' // 深粉色
  },
  background: {
    primary: '#0f111a', // 主背景色（深黑色）
    secondary: '#1e2028', // 次级背景色（稍浅黑色）
    card: 'rgba(35, 37, 45, 0.5)', // 卡片背景色
    input: 'rgba(45, 47, 55, 0.5)' // 输入框背景色
  },
  text: {
    primary: '#ffffff',
    secondary: '#9ca3af',
    disabled: '#6b7280'
  },
  border: {
    DEFAULT: '#2e313a',
    light: '#3e414a'
  },
  'gradient-purple-pink': {
    DEFAULT: 'linear-gradient(to right, #9f7aea, #ed64a6)', // 主色值
    bg: 'bg-gradient-to-r from-purple-500 to-pink-500' // 背景渐变
  }
}

export default {
  theme: {
    extend: {
      colors,
      backgroundColor: colors,
      borderColor: colors,
      textColor: colors,
      backgroundImage: {
        'custom-gradient': 'linear-gradient(208deg, rgba(134,235,140,1) 0%, rgba(138,240,110,1) 35%, rgba(161,250,92,1) 100%)',
        'gradient-purple-pink': 'linear-gradient(to right, #9f7aea, #ed64a6)'
      },
      transitionProperty: {
        default: 'color, background-color, border-color, text-decoration-color, fill, stroke'
      },
      transitionDuration: {
        default: '300ms',
        slow: '500ms'
      },
      transitionTimingFunction: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'spin-slow': 'rotate 20s linear infinite'
      }
    }
  },
  presets: [baseConfig],
  content: ['./app/**/*.tsx', './modules/**/*.tsx'],
  safelist: ['ml-2', 'ml-4', 'ml-6', 'ml-8', 'ml-10']
} satisfies Config
