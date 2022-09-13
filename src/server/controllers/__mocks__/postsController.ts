import sampleGetPostData from '../../../sample/sampleGetPostData';

export const db = {
  query: jest.fn(() => {
    return sampleGetPostData;
  })
};

// export const postsController = {

// }