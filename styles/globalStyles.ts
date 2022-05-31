import { createGlobalStyle } from 'styled-components';
import { device } from './mediaQuery';

const GlobalStyles = createGlobalStyle`
  * {
    margin:0;
    font-family: RedHatText, serif;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    
  }
  :root {
    /* Your default theme */
    --background: #C7B9B5;
    --main: rgba(39, 32, 30, .3);
    --mainColor: #27201e;
    --secondary: #cfcdcc;
    --secondaryColor: #27201e;
  }

  [data-theme='dark'] {
    --background: #27201e;
    --main: rgba(255, 255, 255, .3);
    --mainColor: #fff;
    --secondary: #363434;
    --secondaryColor: #27201e;
  }
  html {
    
  }
  body {
    color: var(--mainColor);
    overflow-x: hidden;
    scroll-behavior: smooth;
    background-color: var(--background);
    cursor: none;
  }
  main {
  }
  a {
    color: var(--mainColor);
    text-decoration: none;
  }
  h1 {
    font-size: 16vw;
    font-weight: normal;
    line-height: 1;
    margin: 0;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.25rem;
  }
  h1, h2, h3, h4 {
    font-family: BodoniModa, serif;
  }
  @media only screen and ${device.tablet} {
    h1 {
      font-size: 8vw;
    }
    h2 {
      font-size: 2.5rem;
    }
    h3 {
      font-size: 2.25rem;
    }
    h4 {
      font-size: 2rem;
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
  button, a, input {
    cursor: pointer;
  }
  code {
    color: #fff;
  }
  p, button, a, input {
    font-family: BodoniModa, serif;
    color: var(--mainColor)
  }
  ul {
    list-style: none;
    padding: 0;
  }
  section{
    overflow: hidden;
    @media only screen and ${device.tablet} {
      margin:auto;
    }
  }
  

  ::-webkit-scrollbar {
    width: 7px;
    margin:33px;
    padding:30px;
    position:absolute;
    transform: translateX(-10px);
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    display: none;
    margin:15px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
    margin:15px;
    padding:10px;
    position: absolute;
    transform: translateX(10px);
    left:-10px;
    right:10px;

  }
`;

export default GlobalStyles;