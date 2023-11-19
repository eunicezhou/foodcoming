async function authAPI(url,method){
    let authData = await fetch(url, method)
    let response = await authData.json();
    return response;
}