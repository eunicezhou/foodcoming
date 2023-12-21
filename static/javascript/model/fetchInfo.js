class FetchInfo{
    async authAPI(url,method){
        let authData = await fetch(url, method)
        let response = await authData.json();
        return response;
    }

    async merchantSetUp(url, method){
        let store = await fetch(url, method)
        let result = await store.json();
        return result;
    }
}
