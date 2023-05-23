import Wrapper from "./components/Wrapper"

import Discover from "./views/Discover"
import Player from "./views/Player"

import { RadioProvider } from "./hooks/useRadio"
import { PlayerProvider } from "./hooks/usePlayer"

function App() {
  return (
    <RadioProvider>
    <PlayerProvider>
    <Wrapper>
      <Discover />
      <Player />
    </Wrapper>
    </PlayerProvider>
    </RadioProvider>
  )
}

export default App
