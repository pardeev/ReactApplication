import React from "react";

let Login = function login() {
    return (
        <>
            <header>
                <h1>BACA Login</h1>
            </header>
            <main>
                <h2>Login</h2>
                <form action="" method="get" class="form-example">
                    <label>Email:</label>
                    <input type="text" id="email" name="email" />
                    <label>Password:</label>
                    <input type="password" id="pass" name="password" minlength="8" required />
                    <button type="button">Login</button>
                </form>
            </main>
            <footer>
                &copy; BACA 2021
            </footer>
        </>
    );

}

export default Login;