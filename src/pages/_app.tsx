// _app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { store } from '../store/store';
import ThemeProvider from '../providers/ThemeProvider';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
