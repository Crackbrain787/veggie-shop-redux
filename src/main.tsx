import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { MantineProvider, createTheme } from '@mantine/core'
import { store } from './store'
import './styles/global.css'
import './index.css'
import App from './App.tsx'

const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  colors: {
    green: [
      '#EAFBEE',
      '#DBF2E0', 
      '#B9E1C2',
      '#94D0A1',
      '#74C286',
      '#5FB974', 
      '#54B46A',
      '#439E58',
      '#388D4D',
      '#2A7A3F'
    ],
  },
  primaryColor: 'green',
  primaryShade: 6,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>,
)