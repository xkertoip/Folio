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

      {text}
    </Wrapper>
  );
}

const Wrapper = styled.a`
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  background-color: var(--main);
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  font-size: 1.75rem;
  :hover {
    background-color: var(--specialColor);
    transition: 0.5s;
  }
`;

const Icon = styled.div`
  position: relative;
  width: 46px;
`;
