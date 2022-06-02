import styled from 'styled-components';
import { useMotionValue } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: Props) {
  /*const widthWindow = typeof window !== 'undefined' && window.innerWidth;
  const x = useMotionValue(widthWindow);
  console.log(widthWindow);*/
  console.log('title');
  return <Wrapper> siema </Wrapper>;
}

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 5rem 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  position: relative;
  perspective: 1000px;
`;
