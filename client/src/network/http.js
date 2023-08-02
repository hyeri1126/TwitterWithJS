export default class HttpClient {
    constructor(){
        this.baseURL = 'http://localhost:8080';
    }

    async fetch(url, options){
        const response = await fetch(`${this.baseURL}${url}`, {
            ...options,
            header:{
                'Content-Type': 'application/json',
                ...options.hedaers,
            }
        });
        let data;
        try {
            data = await response.json();
        } catch(error) {
            console.error(error);
        }

        if(response.status > 299 || response.status < 200){
            const message = data && data.message ? data.message : 'Something went wrong!'
            throw new Error(message)
        }
        return data;
    }
}