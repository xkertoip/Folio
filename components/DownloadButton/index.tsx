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
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  :hover {
    background-color: var(--specialColor);
    transition: 0.5s;
  }
`;

const Icon = styled.div`
  position: relative;
  width: 46px;
`;
