import Title from './Title';
import PerspectiveContainer from './PerspectiveContainer';

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
    <PerspectiveContainer>
      <Title title={title} />
      <Title title={subtitle} content={content} />
    </PerspectiveContainer>
  );
}
