import axios from 'axios';

import * as c from './constants';

export async function getHeadlines(country = "us"){
    try{
        let requests:Object[] = [];
        c.CATEGORIES.map((category:string) => {
            let url =  `${c.HEADLINES}&country=${country}&category=${category.toLowerCase()}`;
            requests.push(axios.get(url))
        });

        let response = await Promise.all(requests);
        response.map((resp:any, idx:number) => {
            let {articles, totalResults} = resp.data;

            response[idx] = {articles, totalResults};
        });

        let [business, entertainment, general, health, science, sports, technology] = response;

        return {business, entertainment, general, health, science, sports, technology};

    }catch (e) {
        throw new Error(e);
    }
}

export async function getHeadlinesByCategory(category:string, page=1, country = "us"){
    try{
        const url = `${c.HEADLINES}&category=${category}&page=${page}&country=${country}`;
        let res = await axios.get(url);

        return res.data;
    }catch (e) {
        throw new Error(e);
    }
}

export async function search(query:string, cancelToken:{token:any}){
    try{
        const url = `${c.SEARCH}&q=${query.toLowerCase()}`;
        let res = await axios.get(url, {
            cancelToken: cancelToken.token,
        });

        return res.data;

    }catch (error) {
        let err:any = new Error(error.message);
        err.isCancel = (axios.isCancel(error));

        throw err;
    }
}