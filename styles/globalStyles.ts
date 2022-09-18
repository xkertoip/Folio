import { createGlobalStyle } from 'styled-components';
import { device } from './mediaQuery';

const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    font-size: 1.1rem;
    font-family: RedHatText, sans-serif;
    cursor: none;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    cursor: none;
    font-size: 1.1rem;
    
  }
  :root {
    --background: #929ea8;
    --main: rgba(39, 32, 30);
    --mainColor: #fff;
    --secondary: #cfcdcc;
    --secondaryColor: #27201e;
    --specialColor: #363434;


    
  }

  [data-theme='dark'] {
    --background: #27201e;
    --main: #cfcdcc;
    --mainColor: #fff;
    --secondary: #363434;
    --secondaryColor: #000;
    --specialColor: #2596be;
  }
  html {

  }
  body {
    color: var(--main);
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
    font-size: 3rem;
  }
  h2 {
    font-size: 20vw;
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-size: 1rem;
    font-family: CaudexItalic, sans-serif;
  }  
  h1, h2, h3 {
    font-weight: normal;
    margin: 0.5rem 0;
    font-family: Candal, sans-serif;
  }
  p {
    margin: 1rem 0;
    @media only screen and ${device.tablet} {
      
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
  p,  input {
    font-family: RedHatText, sans-serif;
    color: var(--secondary);
    
  }
  ul, menu {
    list-style: none;
    padding: 0;
  }
  


`;

export default GlobalStyles;
