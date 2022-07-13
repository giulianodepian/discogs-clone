const checkLogin = async () => {
    const isLogged = await fetch('http://localhost:8080/account/checkuser', {
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => { return data.logged});
    return isLogged;
}

export default checkLogin;