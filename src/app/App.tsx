import './App.css'
import Todos from '../entities/Todo/ui/Todos.tsx'
import TodosFilters from '../entities/Todo/ui/TodosFilters.tsx'

function App() {
	return (
		<>
			<TodosFilters></TodosFilters>
			<Todos />
		</>
	)
}

export default App
