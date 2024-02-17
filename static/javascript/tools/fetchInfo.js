class FetchInfo{
    async api(url,method){
        let authData = await fetch(url, method)
        let response = await authData.json();
        return response;
    }
}

class Cookie{
    calculateExpireDate(days){
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + days);
        return expiration.toUTCString();
    }

    setCookie(value, days){
        let expiration = this.calculateExpireDate(days);
        document.cookie = "foodcoming-search-history=" + value + ";expires=" + expiration;
    }

    showCookie(){
        return document.cookie;
    }
}