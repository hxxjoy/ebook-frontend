import React from 'react';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
}) => {
    // 生成页码数组
    const getPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // 确保始终显示5个页码（如果有）
        if (endPage - startPage < 4) {
            if (startPage === 1) {
                endPage = Math.min(5, totalPages);
            } else {
                startPage = Math.max(1, endPage - 4);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    // 处理页码输入
    const handleInputChange = (e) => {
        if (e.key === 'Enter') {
            const page = Math.max(1, Math.min(totalPages, parseInt(e.target.value)));
            if (!isNaN(page)) {
                onPageChange(page);
                e.target.value = '';
            }
        }
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-20 mb-4">
            {/* 首页按钮 */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                    currentPage === 1 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                First
            </button>

            {/* 上一页按钮 */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                    currentPage === 1 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                Prev
            </button>

            {/* 页码按钮 */}
            {getPageNumbers().map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-3 py-1 rounded ${
                        currentPage === number
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                >
                    {number}
                </button>
            ))}

            {/* 下一页按钮 */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                    currentPage === totalPages 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                Next
            </button>

            {/* 末页按钮 */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                    currentPage === totalPages 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                Last
            </button>

            {/* 页码输入框 */}
            <div className="flex items-center ml-4">
                <span className="mr-2">Go to</span>
                <input
                    type="number"
                    min="1"
                    max={totalPages}
                    className="w-16 px-2 py-1 border rounded"
                    onKeyPress={handleInputChange}
                />
                <span className="ml-2">/ {totalPages}</span>
            </div>
        </div>
    );
};

export default Pagination;