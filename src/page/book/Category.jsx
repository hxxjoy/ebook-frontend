import React, { useState, useEffect } from "react";
import { bookApi } from '../../service/api';
import CategoryBooks from "../../component/book/CategoryBooks";
import "./Category.css";

const Category = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const data = await bookApi.getCategories();
        setCategories(data.data);
        if (data.data.length > 0) {
          setActiveCategory(data.data[0]);
          // 设置默认的分类ID
          setCategoryId(data.data[0].slug);
        }
      } catch (error) {
        console.error('Failed to load book categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadData();
  }, []);

  // 处理一级分类点击
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveSubCategory(null); // 清除二级分类选择
    setCategoryId(category.slug); // 更新分类ID
    setSidebarOpen(false); // 关闭菜单
  };

  // 处理二级分类点击
  const handleSubCategoryClick = (subCategory) => {
    setActiveSubCategory(subCategory);
    setCategoryId(subCategory.slug); // 更新为二级分类ID
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (!categories.length) return <div>No categories found</div>;

  return (
    <div className="main-container">
      {/* 汉堡菜单按钮 */}
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      {/* 左侧主分类栏 */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <ul>
          {categories.map((category) => (
            <li
              key={category.slug}
              className={activeCategory?.slug === category.slug ? "active" : ""}
              onClick={() => handleCategoryClick(category)}
            >
              {category.title}
            </li>
          ))}
        </ul>
      </div>

      {/* 右侧内容 */}
      <div className="content">
        {activeCategory?.sub_categories?.length > 0 && (
          <div className="subcategories">
            {activeCategory.sub_categories.map((sub) => (
              <button
                key={sub.slug}
                className={`subcategory-btn ${activeSubCategory?.slug === sub.slug ? 'active' : ''}`}
                onClick={() => handleSubCategoryClick(sub)}
              >
                {sub.title}
              </button>
            ))}
          </div>
        )}

        <div className="books mb-20">
          <CategoryBooks categoryId={categoryId} />
        </div>
      </div>
    </div>
  );
};

export default Category;