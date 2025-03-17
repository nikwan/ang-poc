/** @typedef { import('tailwindcss/defaultTheme') } DefaultTheme */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', 
     "./node_modules/flowbite/**/*.js",
    './src/styles.scss'],
  
  theme: {
    screens: {
      xs: '475px',
      'h-xs': { raw: '(min-height: 576px)' },
      'h-sm': { raw: '(min-height: 640px)' },
      'h-xmd': { raw: '(min-height: 694px)' },
      'h-md': { raw: '(min-height: 768px)' },
      'h-lg': { raw: '(min-height: 1024px)' },
      ...defaultTheme.screens,
    },
    plugins: [
      require('flowbite/plugin')
  ],
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
        xl: '3.5rem',
        '2xl': '5rem',
      },
      zIndex: {
        header: 30,
        drawer: 40,
        modal: 50,
        snackbar: 60,
        tooltip: 70,
      },
    },
    listStyleType: {
      disc: 'disc',
      decimal: 'decimal',
      alpha: 'lower-alpha',
    },
    extend: {
      height: {
        128: '32rem',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--primary-color))',
          10: 'rgba(var(--primary-color) , 0.01)',
          30: 'rgba(var(--primary-color) ,0.03)',
          50: 'rgba(var(--primary-color) , 0.05)',
          100: 'rgba(var(--primary-color) , 0.1)',
          200: 'rgba(var(--primary-color) , 0.2)',
          300: 'rgba(var(--primary-color) , 0.3)',
          400: 'rgba(var(--primary-color) , 0.4)',
          500: 'rgba(var(--primary-color) , 0.5)',
          600: 'rgba(var(--primary-color) , 0.6)',
          700: 'rgba(var(--primary-color) , 0.7)',
          800: 'rgba(var(--primary-color) , 0.8)',
          900: 'rgba(var(--primary-color) , 0.9)',
        },
        secondary: 'var(--secondary-color)',
        grey: {
          DEFAULT: 'rgb(240, 240, 240)',
          30: 'rgb(240, 240, 240) / 0.03)',
          50: 'rgb(240, 240, 240) / 0.05)',
          100: 'rgb(240, 240, 240) / 0.1)',
        },
        white:{
          DEFAULT: 'rgb(255, 255, 255)',
          30: 'rgb(255, 255, 255) / 0.03)',
          50: 'rgb(255, 255, 255) / 0.05)',
          100: 'rgb(255, 255, 255) / 0.1)',
        },
        // paper: '#F4FAFF',
        paper: '#F5F5F5',
        body: '#1C1C1C',
        white: '#FFFFFF',
        disabled: '#DBE0EE',
        error: '#BB161F',
        danger: '#d9534f',
        warning: '#cb9a07',
        success: '#45a95c',
        exit: '#9ccba9',
        'primary-text': '#1C1C1C',
        'secondary-text': '#808080',
        'light-grey': '#D2D2D2',

        bor: '#CCCCCC',
        horline: 'rgba(93, 109, 134, 0.08)',
        digioBlue: 'rgb(41, 121, 191)',
      },
      fontSize: {
        xxs: '0.625rem',
        md: '1rem',
        // '1xl': '1rem',
        // sm: '0.625rem',
    
      },
      margin: {
        '0.25em': '0.25em',
        '0.5em': '0.5em',
        '1em': '1em',
      },
      fontFamily: {
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
        // sans: ['Helvetica', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        '4xl': '1.75rem',
        '5xl': '2rem',
      },
      boxShadow: {
        // card: '25px 26px 106px 9px rgba(15, 99, 174, 0.1)',
        // card: '0px 10px 40px 16px rgb(90 82 128 / 10%)',
        card: '0px 16px 32px rgba(65, 152, 255, 0.2)',
        bar: '-2px -4px 8px rgba(0, 0, 0, 0.08)',
        button: '16px 15px 30px rgba(15, 99, 174, 0.05)',
        component: '0 1px 14px rgb(132, 132, 132, 0.20)',
        // light: '0 1px 12px rgb(0, 0, 0, 0.05)',
        light: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -2px',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #5830B4 0%, #3F529E 100%)',
        'header-texture': 'linear-gradient(90deg, #5830B4 0%, #3F529E 100%)',
        'button-gradient-primary':
          'linear-gradient(90deg, #5733B4 0%, #424FA1 100.11%)',
        'button-gradient-secondary':
          'linear-gradient(270deg, #40519F 0%, #5831B4 100%)',
      },
      maxWidth: {
        'max-w-screen-xs': '384px',
      },
      minWidth: {
        md: '500px',
      },
      screens: {
        tall: { raw: '(min-height: 732px)' },
        mobile: { max: '768px' },
      },
      backgroundOpacity: ['active'],
    },
  }

 
};
