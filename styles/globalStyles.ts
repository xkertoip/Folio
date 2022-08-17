import { createGlobalStyle } from 'styled-components';
import { device } from './mediaQuery';

const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    font-family: RedHatText, sans-serif;;
    cursor: none;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    cursor: none
    
  }
  :root {
    --background: #C7B9B5;
    --main: rgba(39, 32, 30, .3);
    --mainColor: #27201e;
    --secondary: #cfcdcc;
    --secondaryColor: #27201e;
    --specialColor: #2596be;


    
  }

  [data-theme='dark'] {
    --background: #27201e;
    --main: rgba(255, 255, 255, .3);
    --mainColor: #fff;
    --secondary: #363434;
    --secondaryColor: #000;
    --specialColor: #2596be;
  }
  html {

  }
  body {
    color: var(--mainColor);
    scroll-behavior: smooth;
    background-color: var(--background);
  }
  main {
  }
  a {
    color: var(--mainColor);
    text-decoration: none;
  }
  h1 {
    font-size: 14vw;
  }
  h2 {
    font-size: 3rem;
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-size: 1.5rem;
  }  
  h1, h2, h3, h4 {
    font-weight: normal;
    margin: 0.5rem 0;
    font-family: BodoniModa, sans-serif;
  }
  p {
    margin: 1rem 0;
    @media only screen and ${device.tablet} {
      font-size: 1.25rem;
    }
  }
  @media only screen and ${device.tablet} {
    h1 {
      font-size: 5rem;
    }
    h2, h3, h4 {
      margin: 1rem 0;
    }
    
  }
  button {
    border:none;
    padding: 0;
    font-size: 1.25rem;
    background-color: transparent;
    
    @media only screen and ${device.tablet} {
      font-size: 2rem;
    }
  }
  code {
    color: #fff;
  }
  p, button, input {
    font-family: RedHatText, sans-serif;;
    color: var(--mainColor);
    
  }
  ul {
    list-style: none;
    padding: 0;
  }
  


`;

export default GlobalStyles;
