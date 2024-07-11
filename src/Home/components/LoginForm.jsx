import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setError('');

    try {
      // const response = await axios.post('/login', data);
      // const { token } = response.data;
      
      // 儲存 JWT token
      // localStorage.setItem('token', token);
      
      // 登入成功，可以在這裡進行頁面跳轉
      alert('登入成功')
      console.log('登入成功');
    } catch (err) {
      setError('使用者名稱或密碼錯誤');
    }
  };

  return (
    <div className="app">
      <h2>登入</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", { 
            required: "使用者名稱為必填", 
            minLength: { value: 3, message: "使用者名稱至少需要3個字" }
          })}
          placeholder="使用者名稱"
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
        
        <input
          type="password"
          {...register("password", { 
            required: "密碼為必填",
            minLength: { value: 6, message: "密碼至少需要6個字" },
            validate: {
              hasUppercase: (value) => /[A-Z]/.test(value) || "密碼必須包含至少一個大寫字母",
              hasLowercase: (value) => /[a-z]/.test(value) || "密碼必須包含至少一個小寫字母",
              hasSpecialChar: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "密碼必須包含至少一個特殊符號",
              hasNumber: (value) => /\d/.test(value) || "密碼必須包含至少一個數字",
            }
          })}
          placeholder="密碼"
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        
        <br />
        <button type="submit" className='login_btn'>登入</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginForm;