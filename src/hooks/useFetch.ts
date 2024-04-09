import { useEffect, useState, useMemo } from 'react';
import { BodyRequest, Quiz } from '../helpers/types';

const token = import.meta.env.VITE_QUIZ_TOKEN as string;
const baseUrl = import.meta.env.VITE_BASE_URL as string;

function useFetch(body: BodyRequest) {
  const [data, setData] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = useMemo(() => {
    // Construct the query parameters
    const queryParams: Record<string, string> = {
      apiKey: token,
      limit: body.limit.toString(),
      category: body.category,
      tags: body.tags.join(','),
      difficulty: body.difficulty,
    };

    // Construct the query string
    const queryString = new URLSearchParams(queryParams).toString();

    // Construct and return the full URL
    return `${baseUrl}?${queryString}`;
  }, [body]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
