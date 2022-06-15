import Title from './Title';
import Perspective from './Perspective';

type Props = {
  title: string;
  subtitle?: string;
  content?: string;
};

export default function AnimatedTitle({
  title,
  subtitle = '',
  content = '',
}: Props) {
  return (
    <Perspective>
      <Title title={title} />
      <Title title={subtitle} content={content} />
    </Perspective>
  );
}
