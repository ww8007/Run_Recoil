import { atom } from 'recoil';
import { TodoList } from 'src/components/TodoList';

interface atomState<T> {
	key: string;
	default: T;
}

export interface todoList {
	id: number;
	text: string;
	isComplete: boolean;
}

let todoListState = atom<todoList[]>({
	key: 'todoList',
	default: []
});

const todoListFilterState = atom({
	key: 'todoListFilterState',
	default: 'Show All'
});

export { todoListState, todoListFilterState };
