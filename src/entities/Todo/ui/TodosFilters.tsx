import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import {
	selectFilters,
	selectTodos,
	setCompletedFilter,
	setLimit,
	setPage,
	setSearch,
} from '../model/store/useTodosStore.ts'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	ButtonGroup,
	Input,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { useDebouncedCallback, useThrottledCallback } from 'use-debounce'

const TodosFilters = () => {
	const filters = useAppSelector(selectFilters)
	const todosLengths = useAppSelector(selectTodos).length
	const dispatch = useAppDispatch()

	const debouncedSetSearch = useDebouncedCallback((value: string) => {
		dispatch(setSearch(value))
		dispatch(setPage(1))
	}, 300)

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSetSearch(e.target.value)
	}

	const handleFilterChange = (filter: 'true' | 'false' | 'all') => {
		dispatch(setCompletedFilter(filter))
		dispatch(setPage(1))
	}

	const handleChangeLimit = (e: SelectChangeEvent<number>) => {
		dispatch(setLimit(Number(e.target.value)))
		dispatch(setPage(1))
	}

	const throttledPrev = useThrottledCallback(() => {
		if (filters.page > 1) {
			dispatch(setPage(filters.page - 1))
		}
	}, 500)

	const throttledNext = useThrottledCallback(() => {
		if (todosLengths === filters.limit) {
			dispatch(setPage(filters.page + 1))
		}
	}, 500)

	return (
		<>
			<Accordion>
				<AccordionSummary>Filters</AccordionSummary>
				<AccordionDetails>
					<Input
						placeholder="Search…"
						defaultValue={filters.search || ''}
						onChange={handleChangeSearch}
						fullWidth
					/>
					<br />
					<ButtonGroup sx={{ mt: 1 }}>
						<Button
							onClick={() => handleFilterChange('true')}
							variant={filters.completed === 'true' ? 'contained' : 'outlined'}
						>
							Completed
						</Button>
						<Button
							onClick={() => handleFilterChange('false')}
							variant={filters.completed === 'false' ? 'contained' : 'outlined'}
						>
							In progress
						</Button>
						<Button
							onClick={() => handleFilterChange('all')}
							variant={filters.completed === 'all' ? 'contained' : 'outlined'}
						>
							Show All
						</Button>
					</ButtonGroup>
					<br />
					<br />
					<Typography>Show by:</Typography>
					<Select value={filters.limit} variant="filled" onChange={handleChangeLimit} sx={{ mt: 1 }}>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
					</Select>
				</AccordionDetails>
			</Accordion>

			<ButtonGroup sx={{ mt: 2 }}>
				<Button onClick={throttledPrev} disabled={filters.page === 1}>
					Prev
				</Button>
				<Button onClick={throttledNext} disabled={todosLengths !== filters.limit}>
					Next
				</Button>
			</ButtonGroup>
		</>
	)
}

export default TodosFilters
