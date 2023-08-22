import React, { useEffect, useState } from 'react'
import { is_Authenticated, login_user } from '../controllers/userRoutes';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        is_Authenticated().then((res) => {
            if (res.message) window.location.href = "/"
        })
    }, [])

    const loginuser = async () => {
        await login_user({ username, password }).then((res) => {
            localStorage.setItem('token', res.token);
            console.log("saved")
            window.location.href = "/"
        })
    }
    return (
        <>
            <div style={{ height: "30%" }} className='m-auto border border-lg p-5 rounded-3 bg-gradient-to-r from-blue-100 via-white-500 to-blue-100'>
                <div className='flex justify-around items-center my-5'>
                    <h3>LOGIN PAGE</h3>
                </div>
                <div className='flex justify-around items-center my-5'>
                    <div className='mx-3'>Email</div>
                    <div>
                        <input type="text" className="border border-lg px-4 py-2 leading-tight rounded" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='mx-3'>Password</div>
                    <div>
                        <input type="text" className="border border-lg px-4 py-2 leading-tight rounded" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <hr />
                <button class="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => loginuser()}
                >
                    LOGIN
                </button>
                <Link to="/register"> Register here</Link>
                
            </div>
        </>
    )
}

export default Login
