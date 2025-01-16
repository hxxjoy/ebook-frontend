import axios from 'axios';
import { API_ENDPOINTS } from '../config/config';
import { useAuth } from '../context/AuthContext';

const api = axios.create({
  baseURL: process.env.REACT_APP_BOOK_API_URL,
  timeout: 10000,
});

// 请求拦截器
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// service/api.js

api.interceptors.response.use(
  async (response) => {
      const res = response.data;
      
      // 如果是未登录或token失效
      if (res.code === -1) {
          const originalRequest = response.config;
          
          // 如果不是刷新token的请求，并且没有重试过，则尝试刷新token
          if (!originalRequest.url.includes('/refresh-token') && !originalRequest._retry) {
              originalRequest._retry = true;
              
              try {
                  const auth = useAuth();
                  const newToken = await auth.refreshToken();
                  
                  if (newToken) {
                      // 更新原始请求的token
                      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                      // 重试原始请求
                      return api(originalRequest);
                  }
              } catch (refreshError) {
                  console.error('Token refresh failed:', refreshError);
                  // 刷新token失败，清除用户信息并跳转到登录页
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                  return Promise.reject(refreshError);
              }
          } else {
              // 如果是刷新token的请求失败，或者已经重试过，则清除用户信息并跳转到登录页
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
              return Promise.reject(new Error(res.message || 'Please Sign In'));
          }
      }
      
      // 正常响应
      return response.data;
  },
  (error) => {
      // 处理网络错误等其他错误
      console.error('Request Error:', error);
      return Promise.reject(error);
  }
);
// Book相关API
export const bookApi = {
  getBooks: (params) => api.get(API_ENDPOINTS.BOOKS, { params }),
  getBook: (id) => api.get(`${API_ENDPOINTS.BOOK}/${id}`),
  getChapters: (id) => api.get(`${API_ENDPOINTS.BOOK}/chapters/${id}`),
  getCategories: () => api.get(`${API_ENDPOINTS.CATEGORIES}`),
  getChapter: (id) => api.get(`${API_ENDPOINTS.BOOK}/chapter/${id}`),
  createBook: (data) => api.post(API_ENDPOINTS.BOOK, data),
  updateBook: (id, data) => api.put(`${API_ENDPOINTS.BOOK}/${id}`, data),
  deleteBook: (id) => api.delete(`${API_ENDPOINTS.BOOK}/${id}`),
  
  // 添加一些业务方法
  getFeaturedBooks: (page = 1, pageSize = 20) => {
    return api.get(API_ENDPOINTS.BOOKS, {
      params: {
        page,
        page_size: pageSize,
        is_recommended: 1
      }
    });
  },
  getSearchBooks: (word,page = 1, pageSize = 20) => {
    return api.get(API_ENDPOINTS.BOOKS, {
      params: {
        page,
        page_size: pageSize,
        search: word
      }
    });
  },
  getCategoryBooks: (category_id,page=1) => {
    return api.get(`${API_ENDPOINTS.CATEGORY_BOOKS}${category_id}/${page}`);
  },
  getPopularBooks: (page = 1, pageSize = 20) => {
    return api.get(API_ENDPOINTS.BOOKS, {
      params: {
        page,
        page_size: pageSize,
        order_by: "view,1"
      }
    });
  },

};

// Auth相关API
export const authApi = {
  emailCode: (email) => api.post(API_ENDPOINTS.AUTH.EMAIL_CODE, { email }),
  
  login: async (credentials) => {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      return {
          user: response.data.user,
          token: response.data.access_token
      };
  },
  
  register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  
  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
  
  refreshToken: () => api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN)
};

/*export const authApi = {
  email_code: (email) => api.post(API_ENDPOINTS.AUTH.EMAIL_CODE,{ email }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials, {
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData, {
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
};*/