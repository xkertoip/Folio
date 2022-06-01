import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

const Header = (): JSX.Element => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <header>
      <nav>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          zmien theme
        </button>{' '}
        <Link
          href={router.pathname}
          locale={router.locale === 'en' ? 'pl' : 'en'}
        >
          translation page
        </Link>
        <Link href="/about">another page</Link>
      </nav>
    </header>
  );
};

export default Header;
