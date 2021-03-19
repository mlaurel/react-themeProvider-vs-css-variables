import * as React from 'react'

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

// converts the nested theme object with theme values into one with
// the theme variables as the value
// you can get TypeScript autocomplete with generics on this function:
// function toVarNames<T>(obj: T, prefix: string = '-'): T {
function toVarNames(obj, prefix = '-') {
  const vars = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      vars[key] = toVarNames(value, `${prefix}-${key}`)
    } else {
      vars[key] = `var(${prefix}-${key})`
    }
  }
  return vars
}
// create a variables object with any theme:
const variables = toVarNames(themes.light)

// converts the nested theme object into a flat object with `--path-to-value` keys
function toVars(obj, prefix = '-') {
  const vars = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      const nestedVars = toVars(value, `${prefix}-${key}`)
      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        vars[nestedKey] = nestedValue
      }
    } else {
      vars[`${prefix}-${key}`] = value
    }
  }
  return vars
}

const ThemeContext = React.createContext()

function ThemeProvider({children}) {
  const root = React.useRef()
  const [theme, setTheme] = React.useState('light')

  React.useLayoutEffect(() => {
    const vars = toVars(themes[theme])
    for (const [key, value] of Object.entries(vars)) {
      root.current.style.setProperty(key, value)
    }
  }, [theme])

  const value = React.useMemo(() => [theme, setTheme], [theme])

  return (
    <ThemeContext.Provider value={value}>
      <div ref={root}>{children}</div>
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export {ThemeProvider, useTheme, variables}
