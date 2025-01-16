import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useResponsive from "../../hook/useResponsive";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "./SearchBar";
import AuthModal from "./AuthModal";

// 导入 React Icons
import { 
  FaHome, 
  FaUser, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaBookOpen, 
  FaBars, 
  FaTimes 
} from "react-icons/fa";

const Navigation = () => {
  const { isMobile } = useResponsive();
  const { user, logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const openAuthModal = (mode) => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  // 处理点击外部关闭移动菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 处理登出
  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="md:text-2xl font-bold text-blue-600 hover:text-blue-700 transition duration-300">
            opus
          </Link>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <div className="flex items-center space-x-6">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
              >
                <FaHome className="text-lg" /> 
                <span>Home</span>
              </Link>
              <Link 
                to="/category" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
              >
                <FaBookOpen className="text-lg" /> 
                <span>Category</span>
              </Link>
            </div>
          )}

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>

          {/* Desktop Auth Buttons */}
          {!isMobile && (
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/user/dashboard" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                      />
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                    <span>{user?.nickname || user?.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-300"
                  >
                    <FaSignOutAlt />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-blue-600 hover:text-blue-700 flex items-center space-x-2 transition duration-300"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-300"
                  >
                    <FaUser />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition duration-300"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg mt-0 border-t"
          >
            <div className="p-4 space-y-4">
              <Link 
                to="/" 
                className="block py-2 flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaHome /> <span>Home</span>
              </Link>
              <Link 
                to="/category" 
                className="block py-2 flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaBookOpen /> <span>Category</span>
              </Link>
              
              <div className="border-t pt-4">
                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/user/dashboard" 
                      className="block py-2 flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="avatar"
                          className="w-8 h-8 rounded-full border-2 border-gray-200"
                        />
                      ) : (
                        <FaUser />
                      )}
                      <span>{user?.nickname || user?.email}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-300"
                    >
                      <FaSignOutAlt /> <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => openAuthModal('login')}
                      className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center space-x-2 transition duration-300"
                    >
                      <FaSignInAlt /> <span>Login</span>
                    </button>
                    <button
                      onClick={() => openAuthModal('register')}
                      className="w-full py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center space-x-2 transition duration-300"
                    >
                      <FaUser /> <span>Sign Up</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </nav>
  );
};

export default Navigation;