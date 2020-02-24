import axios from 'axios';
import queryString from 'query-string';
import Cookie from "js-cookie"

export default class Connection {

    constructor(){
        this.url = "https://reviews.decathlon.com/api"
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        this.credentials = {
            '_username': 'ricardo.arellano',
            '_password': 'dkt1212'
        };
        this._data = []
    }

    connect(){
        axios.post(`${ this.url }/post/es_MX/login_check`,queryString.stringify(this.credentials),this.headers)
        .then(res => {
          const {token} = res.data;
          Cookie.set("token", token);
        })
    }

    get data(){
        return this.getInfo()
    }

    getInfo(){
        return Promise.all([this.getReviews(),this.getComments()]).then(resp=>{
            return resp
        }).catch(e=>{
            console.error(e)
            return [{
                success : false
            }]
        })
    }

    getReviews(){
        return this.fetchData(`${this.url}/es_MX/reporting/stores/1610?displays=reviewNote,criterias&hasCampaign=1&authorTypes=customer&period=rollingMonth&date_from=2019-09-07&date_to=2020-02-20`)
    }

    
    getComments(){
        return this.fetchData(`${this.url}/es_MX/v2/review/list?type=store&source=sform&nb=10&itemsOnly=1&bodyRange=30-280&date_from=2019-09-07&date_to=2020-02-20&sort=createdAt&direction=des`)
    }


    fetchData(url){
        return axios.get(url,{
            headers: {
                ...this.headers,
                Authorization: `ovbearer ${ this._getToken() }`                
            }
        }).then(function(response) {
            return {
              success: true,
              data: response.data
            };
        }).catch(function(error) {
            return { success: false };
        });
    }


    _getToken(){
        return Cookie.get("token") ? Cookie.get("token") : null;
    }



    


}
