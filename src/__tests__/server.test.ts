import request from 'supertest';
import { app } from '../server/test_server';
import { ddbDocClient } from '../../libs/ddbDocClient';
import { BatchWriteCommand } from '@aws-sdk/lib-dynamodb';
import { testData } from '../sample/test_user_posts_data';
// import { sampleDeleteUserPostData } from '../sample/sampleGetPostData';


// const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('*', () => {
    describe('GET', () => {
      it('responds with 404 status', () => {
        return request(app)
          .get('/test')
          .expect('Content-Type', /text\/html/)
          .expect(404);
      });
    });
  });
});

describe('Requests', () => {

  const sampleDate = new Date();
  const sampleTime = sampleDate.getTime();
  for(let i = 0; i < 25; i++) {
    const time = sampleTime + i * 10;
    const newDate = new Date(time);
    testData.timestamp.push(newDate.toISOString());
  }

  // set up array file to contain PutRequests for DDB, and for DeleteRequests
  const putRequestsArr: Record<string, unknown>[] = [];
  const deleteRequestsArr: Record<string, unknown>[] = [];

  // console.log('timeStampArr: ', testData.timestamp);

  // iterate from 0 - 24 (we're using 25 items, the max amt for each batch)
  for(let i = 0; i < testData.user_id.length; i++) {
    // create properties user_id, timestamp, caption, likes
    const samplePutRequest = {
      PutRequest: {
        Item: {
          'user_id': testData.user_id[i],
          'timestamp': testData.timestamp[i],
          url: testData.url[i],
          caption: testData.caption[i],
          likes: i,
        },
      },
    };
    const sampleDeleteRequest = {
      DeleteRequest: {
        Key: {
          user_id: testData.user_id[i],
          timestamp: testData.timestamp[i],
        },
      },
    };
    // push each new object to array
    putRequestsArr.push(samplePutRequest);
    deleteRequestsArr.push(sampleDeleteRequest);
  }

  // create separate file to use ddbDocClient, and file with test data to be loaded
  // make connection to DDB
  // add batch data to test_user_posts
  // delete all items from ddb table after all tests have been run
  beforeAll( async () => {
    const params = {
      RequestItems: {
        'test_user_posts': putRequestsArr,
      },
      ReturnConsumedCapacity: 'TOTAL',
    };
    try {
      const response = await ddbDocClient.send(new BatchWriteCommand(params));
    } catch(err) {
      console.log('ERROR in batchWrite for PutRequests: ', err);
    }
  });

  afterAll( async () => {
    const params = {
      RequestItems: {
        test_user_posts: deleteRequestsArr,
      },
      ReturnConsumedCapacity: 'TOTAL',
    };
    try {
      const response = await ddbDocClient.send(new BatchWriteCommand(params));
      // console.log('response from DeleteRequests: ', response);
    } catch(err) {
      console.log('ERROR in batchWrite for DeleteRequests: ', err);
    }
  });

  describe('GET /api/posts', () => {
    // should we be awaiting the execution of request(app)???
    it('', async () => {
      return await request(app)
        .get('/api/posts/1test')
        // .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
          const posts = res.body;
          // console.log('GET /api/posts: ', posts);
          expect(posts.length).toBe(8);
          expect(posts[0].user_id).toEqual(1);
        });
    });
  });
  describe('GET /api/posts/:user_id', () => {
    it('retrieve posts for a specific user and matches data from testData', async () => {
      return await request(app)
        .get('/api/posts/3test')
        .expect(200)
        .then(res => {
          const posts = res.body;
          // console.log('GET /api/posts/3test: ', posts);
          expect(posts.length).toEqual(8);
          expect(posts[7].caption).toBe(testData.caption[22]);
          expect(posts[0].user_id).toEqual(3);
        });
    });
  });
  describe('POST /api/posts/:user_id', () => {
    const { user_id, url, caption } = testData.sampleAddUserPostData;
    let newUserPost_user_id: number;
    let newUserPost_timestamp: string;

    describe('part 1 - add new user post', () => {
      it('adds new user post', async () => {
        return await request(app)
          .post(`/api/posts/${user_id}test`)
          .send({
            url: url,
            caption: caption,
          })
          .expect(200)
          .then(res => {
            const data = res.body;
            // console.log('test for adding user post: ', data);
            const { message, key } = data;
            expect(message).toEqual('Item added');
            // assign 
            newUserPost_user_id = key.user_id;
            newUserPost_timestamp = key.timestamp;
          });
      });
    });

    describe('part 2 - check DB to confirm that new user post exists', () => {
      test('confirmation that new user post exists at database', async () => {
        return await request(app)
          .get(`/api/posts/${newUserPost_user_id}testone`)
          .send({
            user_id: newUserPost_user_id,
            timestamp: newUserPost_timestamp,
          })
          .expect(200)
          .then(res => {
            const post = res.body;
            const returnedCaption = post.caption;
            const returnedUrl = post.url;
            // console.log('Returned Item from GET Request for newly added user post: ', post);
            expect(returnedCaption).toEqual(caption);
            expect(returnedUrl).toEqual(url); 
          });
      });
    });

    describe('part 3 - delete new user post', () => {
      test('delete new user post', async () => {
        return request(app)
          .delete(`/api/posts/${user_id}test`)
          .send({
            user_id: newUserPost_user_id,
            timestamp: newUserPost_timestamp,
          })
          .expect(200)
          .then(res => {
            const returnedCaption = res.body.caption;
            expect(returnedCaption).toEqual(caption);
          });

      });
    });
    
  });
  describe('PATCH /api/posts/:user_id', () => {
    // update the caption for user post
    const oldCaption = testData.caption[24];
    const user_id = testData.user_id[24];
    const timestamp = testData.timestamp[24];
    const newCaption = testData.sampleUpdateUserPostData.caption;

    it('updates user post caption to new caption', async () => {
      return await request(app)
        .patch(`/api/posts/${user_id}test`)
        .send({
          user_id: user_id,
          timestamp: timestamp,
          caption: newCaption,
        })
        .expect(200)
        .then(res => {
          const data = res.body;
          const returnedCaption = data.caption;
          expect(returnedCaption).toEqual(newCaption);
          // console.log('new update to user post: ', data);
          expect(oldCaption).not.toEqual(returnedCaption);
        });
    });

  });
  describe('DELETE /api/posts/user_id', () => {
    const { user_id, url, caption } = testData.sampleDeleteUserPostData;
    let timestamp: string;
    // create new post
    describe('Add new user post', () => {
      it('Adds new user post', async () => {
        return await request(app)
          .post(`/api/posts/${user_id}test`)
          .send({
            user_id: user_id,
            url: url,
            caption: caption,
          })
          .then(res => {
            const data = res.body;
            timestamp = data.key.timestamp;
            // console.log('timestamp for new post in DELETE POST test', timestamp);
          });
      });
    });
    // delete post
    describe('and then delete user post', () => {
      it('user posted is deleted with deletedItem returned', async () => {
        return await request(app)
          .delete(`/api/posts/${user_id}test`)
          .send({
            user_id: user_id,
            timestamp: timestamp,
          })
          .expect(200)
          .then(res => {
          // const data = res.body;
            const deletedCaption = res.body.caption;
            expect(caption).toEqual(deletedCaption);
            // console.log('timestamp of deleted post in DELETE POST test: ', res.body.timestamp);
          });
      });
    });
    // check that user post no longer exists
    describe('verify that user post no longer exists', () => {

      it('user post does not exist', async () => {
        return await request(app)
          .get(`/api/posts/${user_id}testone`)
          .send({
            user_id: user_id,
            timestamp: timestamp,
          })
          .expect(200)
          .then(res => {
            const data = res.body;
            expect(data).toBe('');
          });

      });
    });
  });
});

