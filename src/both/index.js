import * as React from 'react'
import styled from '@emotion/styled'
import {ThemeProvider, useTheme, variables} from './theme-provider'

const PrimaryText = styled.div({
  padding: 20,
  color: variables.colors.primary,
  backgroundColor: variables.colors.background,
})

function ThemeToggler() {
  const [theme, setTheme] = useTheme()
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <button onClick={() => setTheme(nextTheme)}>
      Change to {nextTheme} mode
    </button>
  )
}

function LightThemeComponent() {
  return <div>This renders when the theme is light</div>
}

function DarkThemeComponent() {
  return <div>This renders when the theme is dark</div>
}

// This component consumes the current theme because it uses it to
// adapt what it renders based on the theme.
function AdaptiveComponent() {
  const [theme] = useTheme()
  if (theme === 'light') return <LightThemeComponent />
  if (theme === 'dark') return <DarkThemeComponent />
  return 'The theme is not light or dark... This should be impossible'
}

function App() {
  return (
    <ThemeProvider>
      <PrimaryText>This text is the primary color</PrimaryText>
      <ThemeToggler />
      <AdaptiveComponent />
    </ThemeProvider>
  )
}

export default App
