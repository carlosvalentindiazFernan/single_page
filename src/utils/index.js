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

    /**
     * connect get token (login)
    * @name connect
    */            
    connect(){
        axios.post(`${ this.url }/post/es_MX/login_check`,
            queryString.stringify(this.credentials),
            this.headers)
        .then(res => {
          const {token} = res.data;
          Cookie.set("token", token);
        })
    }

    get data(){
        return this.getInfo()
    }

    /**
     * getInfo  all
    * @name getInfo
    * @returns {Promise}
    */            
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


    /**
     * getReviews from API
    * @name getReviews
    * @returns {Promise}
    */            
    getReviews(){
        return this.fetchData(`${this.url}/es_MX/reporting/stores/1610?displays=reviewNote,criterias&hasCampaign=1&authorTypes=customer&period=rollingMonth&date_from=2019-09-07&date_to=2020-02-20`)
    }


    /**
     * getComments from API
    * @name getComments
    * @returns {Promise}
    */        
    getComments(){
        return this.fetchData(`${this.url}/es_MX/v2/review/list?type=store&source=sform&nb=10&itemsOnly=1&bodyRange=30-280&date_from=2019-09-07&date_to=2020-02-20&sort=createdAt&direction=des`)
    }


    /**
     * fetchData TO API
    * @name fetchData
    * @param {url} String
    * @returns {Promise}
    */        
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

    /**
     * Get token from cookies
    * @name _getToken
    * @return {Cookie} String or NULL
    */    
    _getToken(){
        return Cookie.get("token") ? Cookie.get("token") : null;
    }


    /**
     * Check if connection is success
    * @name isSuccess
    * @param {..args} Array
    * @return {boolean} 
    */    
    static isSuccess(args){
        if(args.success == false){
            return false
        }
        return true
    }

    /**
     * Return format date as yyy-mm-dd
    * @name parseDate
    * @param {dateInput} date 
    * @return {date} String 
    */    
    static parseDate(dateInput){
        const format = (d) => (d < 10 ? '0' : '') + d;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // parse date string (lazy since time parts not used)
        let [day, m, d, yyyy, ...time] = dateInput.split(' ');

        // two digit format for month and date
        let mm = format(months.indexOf(m) + 1);
        let dd = format(d);

        // format date as yyyy-mm-dd
        let date = yyyy + '-' + mm + '-' + dd;
        return date
    }


    /**
     * Get a ramdom comment from api
    * @name getRamdomComment
    * @param {dateInput} Array
    * @return {comment} Object
    */    
    static getRamdomComment(comments){
        return comments[Math.floor(Math.random() * comments.length)];
    }
}
