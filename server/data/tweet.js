// db가 없어서 메모리에 tweet data 저장! 
let tweets = [
    {
        id:'1',
        text:'express api 활용 twitter',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'Bob',
        // url: ''
    },
    {
        id: '2',
        text:"안뇽!",
        createdAt: Date.now().toString(),
        name: 'hyeri',
        username: 'hyeri',
    },
    {
        id:'3',
        text:"i'm ellie",
        createdAt: Date.now().toString(),
        name: 'Ellie',
        username: 'Ellie'
    }
];


export async function getAll() {
    return tweets;
}

export async function getAllByUsername(username) {
    return tweets.filter((tweet) => tweet.username === username);
}

export async function getById(id){
    return  tweets.find((tweet) => tweet.id === id);
}

export async function create(text, name, username) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt : new Date(),
        name,
        username,
    };
    tweets = [tweet, ...tweets]
    // return 은 새로 만든 tweet만! 
    return tweet;
}

export async function update(id, text){
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet) {
        tweet.text = text;
    }
    return tweet;
}

export async function deleteTweet(id){
    tweets = tweets.filter((tweet) => tweet.id !== id)  
    // return tweets.filter((tweet) => tweet.id !== id) 
}