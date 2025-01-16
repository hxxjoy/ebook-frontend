import React, { useState,useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { FaEnvelope, FaLock, FaKey } from 'react-icons/fa';
import { X } from 'lucide-react';
import { authApi } from '../../service/api';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
    const [mode, setMode] = useState(initialMode);
    
    // 添加这个 useEffect
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);
    const [loginMode, setLoginMode] = useState('password');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const { login } = useAuth();
  
    // 验证邮箱格式
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    // 验证密码格式
    const validatePassword = (password) => {
      return password.length >= 8 && password.length <= 26;
    };
  
    // 验证验证码格式
    const validateCode = (code) => {
      const codeRegex = /^\d{6}$/;
      return codeRegex.test(code);
    };
  
    const handleSendCode = async () => {
        // 清除之前的错误
        setErrors({});

        // 验证邮箱
        if (!validateEmail(email)) {
            setErrors({ email: 'Please enter a valid email address' });
            return;
        }

        try {
            setIsSending(true);
            const data = await authApi.email_code(email)
            console.log(data,"00000000000000")
            if (data.code === 1) {
                return alert('Verification code has been sent to your email');
            } else {
                alert('Failed')
            }
            
        } catch (error) {
            setErrors({ api: error.message });
        } finally {
            setIsSending(false);
        }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});

      // 验证邮箱
      if (!validateEmail(email)) {
          setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
          return;
      }

      if (mode === 'register') {
          // 注册时的验证
          if (!validatePassword(password)) {
          setErrors(prev => ({ ...prev, password: 'Password must be between 8 and 26 characters' }));
          return;
          }

          if (!validateCode(code)) {
          setErrors(prev => ({ ...prev, code: 'Please enter a valid 6-digit code' }));
          return;
          }

          try {
            setIsLoading(true);
            const params = { email: email, password: password, code: code}
            const data = await authApi.register(params)
              console.log(data,"00000000000000")
            if (data.code === 1) {
              // 注册成功后自动登录
              const loginData = await authApi.login({ email, password });
              if (loginData.code === 1) {
                  login(loginData.data.user, loginData.data.token);
                  alert('Registration successful!');
                  onClose();
              }
            } else {
                alert('Registration failed');
            }
          } catch (error) {
            setErrors({ api: error.message });
          } finally {
            setIsLoading(false);
          }
      } else {
          // 登录逻辑...
        if (!validatePassword(password)) {
            setErrors(prev => ({ ...prev, password: 'Password must be between 8 and 26 characters' }));
            return;
            }
    
        if (!validateCode(code)) {
            setErrors(prev => ({ ...prev, code: 'Please enter a valid 6-digit code' }));
            return;
        }
    
        try {
            setIsLoading(true);
            const params = { email: email, password: password}
            const data = await authApi.login(params)
            if (data.code === 1) {
              // 保存用户信息和 token
              login(data.data.user, data.data.token);
              // 不需要 alert，因为页面会刷新
              onClose();
            } else {
              alert(data.message || 'Login failed');
            }
        } catch (error) {
            setErrors({ api: error.message });
        } finally {
            setIsLoading(false);
        }
    }
};
    

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          {mode === 'login' && (
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${loginMode === 'password' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setLoginMode('password')}
              >
                Password Login
              </button>
              <button
                className={`px-4 py-2 rounded ${loginMode === 'code' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setLoginMode('code')}
              >
                Code Login
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {mode === 'login' && loginMode === 'password' && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            )}

            {(mode === 'register' || (mode === 'login' && loginMode === 'code')) && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaKey className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Verification Code"
                  className="w-full pl-10 pr-28 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Send Code
                </button>
              </div>
            )}

            {mode === 'register' && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-blue-600 hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-blue-600 hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AuthModal;