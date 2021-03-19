import * as React from 'react'
import ReactDOM from 'react-dom'

import ThemeProviderApp from './theme-provider'
import CSSVarsApp from './css-vars'
import BothApp from './both'

function App() {
  return (
    <div>
      <div>
        <h1>ThemeProvider Version</h1>
        <ThemeProviderApp />
      </div>
      <hr />
      <div>
        <h1>CSS Variables Version</h1>
        <CSSVarsApp />
      </div>
      <hr />
      <div>
        <h1>Both</h1>
        <BothApp />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
