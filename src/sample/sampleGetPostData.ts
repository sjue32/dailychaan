const sampleGetPostData = {
  Items:[
    {
      url_large: 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpg',
      caption: 'homemade pancakes',
      user_id: 1,
      timestamp: '1663466087821',
      likes: 0,
      username: 'sample Chaan',
    },
    {
      url_large: 'https://dailychaan-public.s3.amazonaws.com/13301363_10104985284945809_7979679298381378844_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/13301363_10104985284945809_7979679298381378844_o.jpg',
      caption: 'spain churro',
      user_id: 1,
      timestamp: '1663466087822',
      likes: 0,
      username: 'sample Chaan',
    },
    {
      url_large: 'https://dailychaan-public.s3.amazonaws.com/13323735_10104999104426459_2516400911121474739_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/13323735_10104999104426459_2516400911121474739_o.jpg',
      caption: 'sausage sandwich',
      user_id: 1,
      likes: 0,
      username: 'sample Chaan',
    },
    {
      url_large: 'https://dailychaan-public.s3.amazonaws.com/13329358_10104985284307089_9186752348523393200_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/13329358_10104985284307089_9186752348523393200_o.jpg',
      caption: 'croquetta',
      user_id: 1,
      likes: 0,
      username: 'sample Chaan',
    },
    {
      url_large: 'https://dailychaan-public.s3.amazonaws.com/13329600_10104990389810619_7757854025143533726_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/13329600_10104990389810619_7757854025143533726_o.jpg',
      caption: 'salmorejo',
      user_id: 1,
      likes: 0,
      username: 'sample Chaan',
    },
  ]
};

const sampleAddUserPostData = {
  Attributes: [
    {
      url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpeg',
      caption: 'Awesomeness!',
      user_id: 2,
      likes: 0
    }
  ]
};

const sampleAddUserPostResponse: Record<string, undefined> = {
  Attributes: undefined,
};



const sampleUpdateUserPostData = {
  user_id: 3,
  timestamp: '123',
  url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpeg',
  caption: 'Old caption!',
  likes: 1
};

const sampleUpdateUserPostResponse = {
  Attributes: {
    user_id: 3,
    timestamp: '123',
    url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpeg',
    caption: 'NEW UPDATED CAPTION!!!',
    likes: 1
  }
};

const sampleDeleteUserPostData = {
  user_id: 3,
  timestamp: '123456',
};

const sampleDeleteUserPostResponse = {
  '$metadata': {
    httpStatusCode: 200,
  },
  Attributes: {
    user_id: 3,
    timestamp: '123456',
    url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpeg',
    caption: 'Delete this post',
    likes: 5,
  }
};

const newSampleGetPostData = {
  Items:[
    {
      username: 'user1',
      url_large: 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpg',
      caption: 'homemade pancakes',
      user_id: 1,
      timestamp: '1663466087821',
      likes: 0,
      likesData: {}
    },
    {
      username: 'user1',
      url_large: 'https://dailychaan-public.s3.amazonaws.com/13301363_10104985284945809_7979679298381378844_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/13301363_10104985284945809_7979679298381378844_o.jpg',
      caption: 'spain churro',
      user_id: 1,
      timestamp: '1663466087822',
      likes: 0,
      likesData: {},
    },
    {
      username: 'user1',
      url_large: 'https://dailychaan-public.s3.amazonaws.com/13323735_10104999104426459_2516400911121474739_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/13323735_10104999104426459_2516400911121474739_o.jpg',
      caption: 'sausage sandwich',
      timestamp: '1663466087900',
      user_id: 1,
      likes: 0,
      likesData: {},
    },
  ],
};


export default sampleGetPostData;
export { newSampleGetPostData, sampleAddUserPostData, sampleUpdateUserPostData, sampleAddUserPostResponse, 
  sampleUpdateUserPostResponse, sampleDeleteUserPostData, sampleDeleteUserPostResponse };