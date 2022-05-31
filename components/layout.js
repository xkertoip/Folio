import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <>
      <nav>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          zmien theme
        </button>{' '}
        <Link href="/" locale={router.locale === 'en' ? 'pl' : 'en'}>
          translation page
        </Link>
        <Link href="/about">another page</Link>
      </nav>
      <main>{children}</main>
      <footer>siema futter</footer>
    </>
  );
}
