import React from 'react';
import { RecoilRoot } from 'recoil';
import { CharacterCounter } from './components/counter';
import { TodoList } from './components/TodoList';
import { QueryClient, QueryClientProvider } from 'react-query';
export default function App() {
	const queryClient = new QueryClient();
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<TodoList />
			</QueryClientProvider>
		</RecoilRoot>
	);
}
