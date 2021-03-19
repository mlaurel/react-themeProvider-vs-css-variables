import * as React from 'react'
import styled from '@emotion/styled'
import {ThemeProvider} from 'emotion-theming'

const themes = {
  light: {
    colors: {
      primary: 'deeppink',
      background: 'white',
    },
  },
  dark: {
    colors: {
      primary: 'lightpink',
      background: 'black',
    },
  },
}

const PrimaryText = styled.div(({theme}) => ({
  padding: 20,
  color: theme.colors.primary,
  backgroundColor: theme.colors.background,
}))

function ThemeToggler({theme, onClick}) {
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <button onClick={() => onClick(nextTheme)}>
      Change to {nextTheme} mode
    </button>
  )
}

function App() {
  const [theme, setTheme] = React.useState('light')
  return (
    <ThemeProvider theme={themes[theme]}>
      <PrimaryText>This text is the primary color</PrimaryText>
      <ThemeToggler
        theme={theme}
        onClick={(nextTheme) => setTheme(nextTheme)}
      />
    </ThemeProvider>
  )
}

export default App
