export const loginSuccess = {
  verified: true,
  message: 'user is verified',
  user_posts: [
    {
      url_large: 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/11802736_10104167012944459_5302688321690486926_o.jpg',
      caption: 'homemade pancakes',
      user_id: 1,
      timestamp: '1663466087821',
      likes: 0
    },
    {
      url_large: 'https://dailychaan-public.s3.amazonaws.com/13301363_10104985284945809_7979679298381378844_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/13301363_10104985284945809_7979679298381378844_o.jpg',
      caption: 'spain churro',
      user_id: 1,
      timestamp: '1663466087822',
      likes: 0
    },
    {
      url_large: 'https://dailychaan-public.s3.amazonaws.com/13323735_10104999104426459_2516400911121474739_o_large.jpg',
      url_small: 'https://dailychaan-public.s3.amazonaws.com/13323735_10104999104426459_2516400911121474739_o.jpg',
      caption: 'sausage sandwich',
      user_id: 1,
      likes: 0,
    },
  ],
  username: 'username1',
  fav_users: {},
};

export const loginFail = {
  verified: false,
  message: 'username / password does not match',
};