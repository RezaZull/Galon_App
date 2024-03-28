import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    daisyui: {
        themes: [{
            mytheme: {

                "primary": "#0000ff",

                "secondary": "#00cb9e",

                "accent": "#786900",

                "neutral": "#0c0404",

                "base-100": "#f8ffff",

                "info": "#57a9ff",

                "success": "#00eab8",

                "warning": "#e48600",

                "error": "#c81e47",
            },
        }, ],
    },

    plugins: [forms, require("daisyui")],
};
