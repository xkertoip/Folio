import Hamburger from './Hamburger';
import Wrapper from './Wrapper';
import Content from './Content';

export default function Menu() {
  return (
    <>
      <Hamburger />
      <Wrapper>
        <Content />
      </Wrapper>
    </>
  );
}
