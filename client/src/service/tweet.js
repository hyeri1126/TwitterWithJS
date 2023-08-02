export default class TweetService {
  // tweets = [
  //   {
  //     id: 1,
  //     text: '드림코딩에서 강의 들으면 너무 좋으다',
  //     createdAt: '2021-05-09T04:20:57.000Z',
  //     name: 'Bob',
  //     username: 'bob',
  //     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  //   },
  // ];
  // -------------------원래 코드---------------
  // async getTweets(username) {
  //   return username
  //     ? this.tweets.filter((tweet) => tweet.username === username)
  //     : this.tweets;
  // }
  // async postTweet(text) {
  //   const tweet = {
  //     id: Date.now(),
  //     createdAt: new Date(),
  //     name: 'Ellie',
  //     username: 'ellie',
  //     text,
  //   };
  //   this.tweets.push(tweet);
  //   return tweet;
  // }
  // async deleteTweet(tweetId) {
  //   this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
  // }
  // async updateTweet(tweetId, text) {
  //   const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
  //   if (!tweet) {
  //     throw new Error('tweet not found!');
  //   }
  //   tweet.text = text;
  //   return tweet;
  // }


  // ----------------- 서버(localhost:8080)에서 tweet 가져오기 --------------------
  // 서버(localhost:8080) 이용시 constructor 필요!
  constructor(baseURL){
    this.baseURL = 'http://localhost:8080'
    // this.baseURL = baseURL
  }
  
   // username(query)이 있으면 username 해당 트윗만 가져오고 아니면 전체트윗 가져오기! 
  async getTweets(username) {
    const query = username ? `?username=${username}` : '';
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method:'GET',
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    if(response.status !== 200){
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets`, {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text, username:'ellie', name:'Ellie'
      })
    });
    const data = await response.json();
    if(response.status !== 201){
      throw new Error(data.message);
    }
    return data;
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method:'DELETE',
      headers: {'Content-Type': 'application/json'},
    });
    const data = await response.json();
    if(response.status !== 204){
      throw new Error(data.message);
    }
    // return data;
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method:'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        text
      })
    });
    const data = await response.json();
    if(response.status !== 200){
      throw new Error(data.message);
    }
    return data;
  }


  // ------------------ 프론트엔드 코드 개선 재사용성을 위한 리팩토링 --------------------
  // 원하고자 하는 것 : 중복 코드 제거(fetch의 옵션, 에러를 잡는 것 등!), 바로 결과값 return하기 원함!
  // async getTweets(username) {
  //   const query = username ? `?username=${username}` : '';
  //   return this.http.fetch(`/tweets${query}`,{
  //     method:'GET', 
  //   });
  // }
  // async postTweet(text) {
  //   return this.http.fetch(`/tweets`, {
  //     method:'POST',
  //     body: JSON.stringify({
  //       text, username:'ellie', name:'Ellie'})
  //   })
  // }
  // async deleteTweet(tweetId) {
  //   return this.http.fetch(`/tweets${tweetId}`, {
  //     method:'DELETE',
  //   });
  // }
  // async updateTweet(tweetId, text) {
  //   return this.http.fetch(`/tweets/${tweetId}`, {
  //     method:'PUT',
  //     body: JSON.stringify({ text }),
  //   });
  // }

}
