import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';

export const Container = styled.div`
  padding: 5rem 1rem;
  max-width: 100%;
  align-self: auto;
  @media only screen and ${device.tablet} {
    padding: 5rem 10%;
  }
`;

export const Section = styled.section`
  padding: 5rem 0;
  max-width: 100%;
`;

export const Description = styled.div`
  min-height: 100vh;
  padding: 5rem 1rem;
  display: flex;
  position: relative;
  z-index: 1;
  justify-content: space-between;
  flex-direction: column;
  h2 {
    margin: 0;
  }
  @media only screen and ${device.tablet} {
    max-width: 45%;
    padding: 5rem 0 5rem 10%;
  }
`;
