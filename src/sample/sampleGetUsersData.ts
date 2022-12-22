const sampleGetUsersDataBE = {
  Item: {
    user_info: 'test_user',
    user_list: {
      main_chaan: {
        username: 'Main Chaan',
        user_id: 1,
      },
      cafe_chaan: {
        username: 'Cafe Chaan',
        user_id: 2,
      },
      chinese_chaan: {
        username: 'Chinese Chaan',
        user_id: 3,
      },
    },
  },
};

const sampleGetUsersDataFE = {
  main_chaan: {
    username: 'Main Chaan',
    user_id: 1,
  },
  cafe_chaan: {
    username: 'Cafe Chaan',
    user_id: 2,
  },
  chinese_chaan: {
    username: 'Chinese Chaan',
    user_id: 3,
  },
};

export { sampleGetUsersDataFE, sampleGetUsersDataBE };