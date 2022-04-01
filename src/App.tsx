import React from 'react';
import { RecoilRoot } from 'recoil';
import { CharacterCounter } from './components/counter';
import { TodoList } from './components/TodoList';
export default function App() {
	return (
		<RecoilRoot>
			<TodoList />
		</RecoilRoot>
	);
}
