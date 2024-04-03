import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import axios from "axios";

function SearchByFilter() {
    const [userProfileFilterDTO, setUserProfileFilterDTO] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.post("http://localhost:8080/userDetail/filter")
            .then(response => {
                setUserProfileFilterDTO(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <>
            <div className="filter-player  hidden">
                <select className="form-control gender " id="gender">
                    <option value selected="selected">Giới tính</option>
                    <option value="female">Nữ</option>
                    <option value="male">Nam</option>
                </select>
                <select className="form-control type " id="address">
                    <option value selected="selected">Địa Chỉ</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hochiminh">Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="khac">Khác</option>
                </select>
                <select className="form-control gender "id="views">
                    <option value selected="selected">Lượt views</option>
                    <option value="maxViews">Views Cao Nhất</option>
                    <option value="minViews">Views Thấp Nhất</option>
                </select>
                <select className="form-control gender "id="bills">
                    <option value selected="selected">Lượt Thuê</option>
                    <option value="maxBill">Lượt Thuê Cao Nhất</option>
                    <option value="minBill">Lượt Thuê Thấp Nhất</option>
                </select>
                <button type="button" className="form-control price false btn btn-default"id="age">Độ Tuổi</button>
                <input style={{
                    width: "450px",
                    borderRadius: "25px",
                    fontSize: "11px",
                    padding: "5px",
                    height: "32px",
                    marginRight: "3px",
                    marginBottom: "5px",
                    maxWidth: "500px",
                    float: "left",
                    cursor: "pointer",
                    fontWeight: "600"
                }} type="text" placeholder="Nhập Tên Bạn Muốn Tìm..." autoComplete="off" id="search"/>
                <button type="button" className="form-control btn-filter btn btn-default">
                    <i className="fa fa-search"/>Tìm kiếm
                </button>
            </div>
        </>
    )
}

export default SearchByFilter;