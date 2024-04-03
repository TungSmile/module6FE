import React, {useMemo, useState} from 'react';
import Pagination from "../components/common/Pagination";

let PageSize = 10;

const Test = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [list, setList] = useState(
        [
            {"id": 1,
            "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
            {"id": 1,
                "name": "test"},
        ]
    )

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return list.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <>
            <style dangerouslySetInnerHTML={{__html: "\n.pagination-container {\n  display: flex;\n  list-style-type: none;\n}\n.pagination-container .pagination-item {\n  padding: 0 12px;\n  height: 32px;\n  text-align: center;\n  margin: auto 4px;\n  color: rgba(0, 0, 0, 0.87);\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  letter-spacing: 0.01071em;\n  border-radius: 16px;\n  line-height: 1.43;\n  font-size: 13px;\n  min-width: 32px;\n}\n.pagination-container .pagination-item.dots:hover {\n  background-color: transparent;\n  cursor: default;\n}\n.pagination-container .pagination-item:hover {\n  background-color: rgba(0, 0, 0, 0.04);\n  cursor: pointer;\n}\n.pagination-container .pagination-item.selected {\n  background-color: rgba(0, 0, 0, 0.08);\n}\n.pagination-container .pagination-item .arrow::before {\n  position: relative;\n  /* top: 3pt; Uncomment this to lower the icons as requested in comments*/\n  content: '';\n  /* By using an em scale, the arrows will size with the font */\n  display: inline-block;\n  width: 0.4em;\n  height: 0.4em;\n  border-right: 0.12em solid rgba(0, 0, 0, 0.87);\n  border-top: 0.12em solid rgba(0, 0, 0, 0.87);\n}\n.pagination-container .pagination-item .arrow.left {\n  transform: rotate(-135deg) translate(-50%);\n}\n.pagination-container .pagination-item .arrow.right {\n  transform: rotate(45deg);\n}\n.pagination-container .pagination-item.disabled {\n  pointer-events: none;\n}\n.pagination-container .pagination-item.disabled .arrow::before {\n  border-right: 0.12em solid rgba(0, 0, 0, 0.43);\n  border-top: 0.12em solid rgba(0, 0, 0, 0.43);\n}\n.pagination-container .pagination-item.disabled:hover {\n  background-color: transparent;\n  cursor: default;\n}\n" }} />
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                </tr>
                </thead>
                <tbody>
                {currentTableData.map(item => {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={list.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    );
};

export default Test;