import React, { useState } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import {Link, useNavigate} from "react-router-dom";

const LOGIN = gql`
  query Login($usernameOrEmail: String!, $password: String!) {
    getAccessToken(usernameOrEmail: $usernameOrEmail, password: $password) {
      accessToken
    }
  }
`;

const Login = () => {
    const [formData, setFormData] = useState({
        usernameOrEmail: '',
        password: ''
    });

    const client = useApolloClient();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await client.query({
                query: LOGIN,
                variables: formData
            });
            const accessToken = data.getAccessToken.accessToken;
            localStorage.setItem('accessToken', accessToken);
            console.log('Access token:', accessToken);
            // Очистка формы после успешного входа
            setFormData({
                usernameOrEmail: '',
                password: ''
            });
            navigate("/homePage")
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="bg-gray-900 w-screen h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-white">Your email or username</label>
                                <input
                                    type="text"
                                    name="usernameOrEmail"
                                    id="usernameOrEmail"
                                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="name@company.com"
                                    value={formData.usernameOrEmail}
                                    onChange={handleChange}
                                    required/>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-gray-50 border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                    required/>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/registration" className="font-medium hover:underline dark:text-blue-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
