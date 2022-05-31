import { useTheme } from 'next-themes';

export default function Layout({ children }) {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <nav>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          zmien theme
        </button>{' '}
      </nav>
      <main>{children}</main>
      <footer>siema futter</footer>
    </>
  );
}
