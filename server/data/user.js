// password: abcd1234
let users = [
    {
        id: '1',
        username: 'hyeri',
        password:'$2b$10$CCHsKx0nHmg7u3SSKJjMduZd8fDTsS.tdaydSigeLHfbuMBfkZuNe',
        name:'hyeri',
        email:'hyeri1126@ewhain.net',
        url:'www.naver.com'
    },
]

export async function findByUsername (username) {
    return users.find((user)=> user.username === username)
}

export async function createUser(user) {
    const created = {...user, id:Date.now().toString()}
    users.push(created)
    return created.id
}

export async function findById(id) {
    return users.find((user) => user.id === id)
}
