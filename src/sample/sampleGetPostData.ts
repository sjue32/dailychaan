const sampleGetPostData = {
  Items:[
    {
      url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13415502_10105000518268109_2615196590672735618_o.jpeg',
      caption: '',
      user_id: 1,
      timestamp: '1663466087821',
      likes: 0
    },
    {
      url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13391551_10104998862885509_2916281007743705705_o.jpeg',
      caption: '',
      user_id: 1,
      timestamp: '1663466087822',
      likes: 0
    },
    {
      url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13391471_10105000520498639_6651838389706195689_o.jpeg',
      caption: '',
      user_id: 1,
      likes: 0,
    },
    {
      url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13329600_10104990389810619_7757854025143533726_o.jpeg',
      caption: '',
      user_id: 1,
      likes: 0,
    },
    {
      url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13329358_10104985284307089_9186752348523393200_o.jpeg',
      caption: '',
      user_id: 1,
      likes: 0,
    },
    {
      url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13323735_10104999104426459_2516400911121474739_o.jpeg',
      caption: '',
      user_id: 1,
      likes: 0,
    },
    {
      url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/13301363_10104985284945809_7979679298381378844_o.jpeg',
      caption: '',
      user_id: 1,
      likes: 0,
    },
    {
      url: 'https://dailychaan-public-photos.s3.us-east-2.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpeg',
      caption: 'Yummo!',
      user_id: 1,
      likes: 0,
    }
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

export default sampleGetPostData;
export { sampleAddUserPostData, sampleUpdateUserPostData, sampleAddUserPostResponse, 
  sampleUpdateUserPostResponse, sampleDeleteUserPostData, sampleDeleteUserPostResponse };