import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

export default function useFetchLicenses(q, page, perPage, handleSetTotal) {
  const getLicenses = async ({pageParam = 0}) => {
    console.log('pages', pageParam);
    const res = await axios.get('/rrhh/boletas', {
      params: {
        q,
        page,
        perPage: perPage,
      },
    });
    handleSetTotal(res.data.total);
    return {
      data: res.data.data,
      nextPage: page + 1,
      total: res.data.total,
    };
  };
  return useInfiniteQuery(['personas'], getLicenses, {
    enabled: Boolean(q),
    keepPreviousData: true,
    getNextPageParam: lastPage => {
      if (lastPage.data.length < 10) return undefined;
      return lastPage.nextPage;
    },
  });
}
