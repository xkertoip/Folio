import styled from 'styled-components';
import Image from 'next/image';
type Props = {
  array: [];
  key: [name: string, id: number];
};

export default function Slider({ array }: Props) {
  return (
    <Wrapper>
      <Container>
        {array.map((element, i) => {
          <Item key={i}>
            <Image src={element.src} />
            <h4>{element.type}</h4>
            <h3>{element.Title}</h3>
          </Item>;
        })}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 1rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
