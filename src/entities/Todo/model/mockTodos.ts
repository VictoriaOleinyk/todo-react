import type { TodoType } from './todoType.ts'

export const mockTodos: TodoType[] = [
	{
		_id: '1',
		title: 'Купить продукты',
		order: 1,
		completed: false,
		description: 'Купить молоко, хлеб, яйца и сыр.',
		createdAt: new Date('2025-06-25T10:00:00Z').toISOString(),
		updatedAt: new Date('2025-06-25T10:00:00Z').toISOString(),
	},
	{
		_id: '2',
		title: 'Сделать домашнее задание',
		order: 2,
		completed: false,
		description: 'Выполнить задания по математике и физике.',
		createdAt: new Date('2025-06-26T08:30:00Z').toISOString(),
		updatedAt: new Date('2025-06-26T08:30:00Z').toISOString(),
	},
	{
		_id: '3',
		title: 'Позвонить другу',
		order: 3,
		completed: true,
		description: 'Позвонить и обсудить планы на выходные.',
		createdAt: new Date('2025-06-24T14:15:00Z').toISOString(),
		updatedAt: new Date('2025-06-24T15:00:00Z').toISOString(),
	},
	{
		_id: '4',
		title: 'Убрать в комнате',
		order: 4,
		completed: false,
		description: 'Пылесос, мытьё полов и организация рабочей зоны.',
		createdAt: new Date('2025-06-26T09:00:00Z').toISOString(),
		updatedAt: new Date('2025-06-26T09:00:00Z').toISOString(),
	},
	{
		_id: '5',
		title: 'Запланировать поездку',
		order: 5,
		completed: false,
		description: 'Подготовить план путешествия и забронировать отель.',
		createdAt: new Date('2025-06-23T18:45:00Z').toISOString(),
		updatedAt: new Date('2025-06-23T18:45:00Z').toISOString(),
	},
]
