/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import useFetch from '../client/custom_hooks/useFetch';
import '@testing-library/jest-dom';
import '@testing-library/react';

import fetch from 'jest-fetch-mock';
global.fetch = fetch;

import { newSampleGetPostData } from '../sample/sampleGetPostData';

const mockPostsData = newSampleGetPostData;

describe('testing useFetch hook', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  const url = '';

  it('incorrect url should setError to true', () => {

    const { result } = renderHook(() => useFetch(url));

    act(() => {
      result.current.setIsError(true);
    });

    console.log('result.current: ', result.current);
    expect(result.current.isError).toEqual(true);
  });

  it('should return posts data in data prop', () => {
    // the fetch and mock itself never really gets tested or doesn't flow into the state variables
    // state variables are change or set using act method wrapper and directly invoking returned
    // state variables/functions in result.current
    // doesn't seem to be valuable test in its current shape
    // fetch.mockResponseOnce(JSON.stringify(mockPostsData));

    const { result } = renderHook(() => useFetch(url));

    act(() => {
      result.current.setData(mockPostsData.Items);
    });

    // console.log('result: ', result);
    // console.log('data: ', result.current.data);
    expect(result.current.data).toStrictEqual(mockPostsData.Items);
  });

});
