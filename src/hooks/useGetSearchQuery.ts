import { useQuery } from 'react-query';
import { searchNews } from '../util/api/news';

interface news {
	abstract: string;
}

export function useGetSearchQuery(text: string) {
	const queryInfo = useQuery('news', async () => await searchNews(text));

	return { ...queryInfo };
}
