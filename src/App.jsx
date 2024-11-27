import { Home } from "./pages/Home"
import { TasksProvider } from "./context/TasksProvider"

function App() {
  return (
    <TasksProvider>
      <Home/>
    </TasksProvider>
  )
}

export default App
