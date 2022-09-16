import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';

export const Container = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  @media only screen and ${device.tablet} {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

export const TitleContainer = styled.div`
  align-self: auto;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and ${device.tablet} {
  }
`;

export const Section = styled.section`
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

export const Introduce = styled(Container)`
  min-height: 100vh;
  display: flex;
  position: relative;
  z-index: 1;
  justify-content: space-between;
  flex-direction: column;
  h2 {
    margin: 0;
  }
`;
