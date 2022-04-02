import React, { useState, useTransition } from 'react';
import { jsx, css } from '@emotion/react';
import {
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState
} from 'recoil';
import {
	todoList,
	todoListFilterState,
	todoListState
} from '../atoms/todoListState';
export function TodoList() {
	const [isPending, startTransition] = useTransition();
	const [count, setCount] = useState(0);

	function handleClick() {
		startTransition(() => {
			setCount((c) => c + 1);
		});
	}
	const todoList = useRecoilValue(todoListState);
	return (
		<>
			<TodoListStats />
			<TodoListFilters />
			<TodoItemCreator />

			{todoList.map((todoItem) => (
				<TodoItem key={todoItem.id} item={todoItem} />
			))}
			{isPending && <div>hihihi</div>}
			<button onClick={handleClick}>{count}</button>
		</>
	);
}

function TodoItemCreator() {
	const [inputValue, setInputValue] = useState('');
	const setTodoList = useSetRecoilState(todoListState);

	const addItem = () => {
		setTodoList((oldTodoList) => [
			...oldTodoList,
			{
				id: getId(),
				text: inputValue,
				isComplete: false
			}
		]);
		setInputValue('');
	};

	const onChange = ({ target: { value } }) => {
		setInputValue(value);
	};

	return (
		<div>
			<input type="text" value={inputValue} onChange={onChange} />
			<button onClick={addItem}>Add</button>
		</div>
	);
}

// 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId() {
	return id++;
}

interface prop {
	item: todoList;
}

function TodoItem({ item }: prop) {
	const [todoList, setTodoList] = useRecoilState(todoListState);
	const index = todoList.findIndex((listItem) => listItem === item);
	const style = (props: string) => css`
		color: ${props};
	`;
	const editItemText = ({ target: { value } }) => {
		setTodoList(
			todoList.map((todo) => {
				if (todo.id === index) {
					console.log('hihi');
				}
				return todo.id === index ? { ...todo, text: value } : todo;
			})
		);
	};

	const onChangeText = (id: number, text: string) => {
		console.log(index, text);
		setTodoList(
			todoList.map((todo) => {
				if (todo.id === index) {
					console.log('hihi');
				}
				return todo.id === index ? { ...todo, text } : todo;
			})
		);
	};

	const toggleItemCompletion = () => {
		setTodoList(
			todoList.map((todo) => {
				console.log(index);
				return todo.id === index
					? { ...todo, isComplete: !todo.isComplete }
					: todo;
			})
		);
	};

	const deleteItem = () => {
		const newList = removeItemAtIndex(todoList, index);

		setTodoList(newList);
	};

	const inputStyle = (props) => css`
		color: ${props};
		font-size: 2rem;
	`;

	return (
		<div css={style('black')}>
			<input
				css={inputStyle('orange')}
				type="text"
				value={item.text}
				onChange={(e) => onChangeText(id, e.target.value)}
			/>
			<input
				type="checkbox"
				checked={item.isComplete}
				onChange={toggleItemCompletion}
			/>
			<button onClick={deleteItem}>X</button>
		</div>
	);
}

function replaceItemAtIndex(arr, index, newValue) {
	return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
	return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const filteredTodoListState = selector({
	key: 'filteredTodoListState',
	get: ({ get }) => {
		const filter = get(todoListFilterState);
		const list = get(todoListState);

		switch (filter) {
			case 'Show Completed':
				return list.filter((item) => item.isComplete);
			case 'Show Uncompleted':
				return list.filter((item) => !item.isComplete);
			default:
				return list;
		}
	}
});

function TodoListFilters() {
	const [filter, setFilter] = useRecoilState(todoListFilterState);

	const updateFilter = ({ target: { value } }) => {
		setFilter(value);
	};

	return (
		<>
			Filter:
			<select value={filter} onChange={updateFilter}>
				<option value="Show All">All</option>
				<option value="Show Completed">Completed</option>
				<option value="Show Uncompleted">Uncompleted</option>
			</select>
		</>
	);
}

const todoListStatsState = selector({
	key: 'todoListStatsState',
	get: ({ get }) => {
		const todoList = get(todoListState);
		const totalNum = todoList.length;
		const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
		const totalUncompletedNum = totalNum - totalCompletedNum;
		const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

		return {
			totalNum,
			totalCompletedNum,
			totalUncompletedNum,
			percentCompleted
		};
	}
});

function TodoListStats() {
	const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
		useRecoilValue(todoListStatsState);

	const formattedPercentCompleted = Math.round(percentCompleted * 100);
	const style = css`
		color: hotpink;
		background-color: black;
	`;
	return (
		<ul>
			<li css={style}>Total items: {totalNum}</li>
			<li>Items completed: {totalCompletedNum}</li>
			<li>Items not completed: {totalUncompletedNum}</li>
			<li>Percent completed: {formattedPercentCompleted}</li>
		</ul>
	);
}
