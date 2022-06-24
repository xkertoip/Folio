import styled from 'styled-components';
import { ReactNode } from 'react';
import { device } from '../../styles/mediaQuery';
import Pdf from '/CV21.pdf';

type Props = {
  children: ReactNode;
  text: string;
};

export default function DownloadButton({ children, text }: Props) {
  return (
    <Wrapper href="/CV21.pdf" target="_blank" download="CV_Piotr_Szczypka.pdf">
      <Icon>{children}</Icon>

      <h2>{text}</h2>
    </Wrapper>
  );
}

const Wrapper = styled.a`
  border: 1px solid var(--mainColor);
  width: 100%;
  padding: 2rem;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  max-width: 300px;
  :hover {
    background-color: var(--specialColor);
    transition: 0.5s;
  }
  @media only screen and ${device.tablet} {
    max-width: unset;
  }
`;

const Icon = styled.div`
  position: relative;
  width: 46px;
`;
