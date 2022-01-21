const $$ = document.querySelector.bind(document);

const loginBtn = $$("#btnLogin")
loginBtn.addEventListener("click", login)

async function login(e) {
    try {
        const email = $$("#email").value
        const password = $$("#password").value

        if (!email || !password)
            return alert("Username or password is not exsit")

        const res = await axios({
            method: "post",
            url: "/users/login",
            data: {
                username: email,
                password: password,
            },
        })

        location.href = '/';
    } catch (error) {
        console.log(error);
    }
}