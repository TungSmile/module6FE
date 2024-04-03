import {Bar, Line} from "react-chartjs-2";
import {Chart, registerables} from 'chart.js';
import React, {useEffect, useState} from "react";
import axios from "axios";

Chart.register(...registerables);

function Revenue() {
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();
    const [chartData, setChartData] = useState({});
    const [totalRevenue, setTotalRevenue] = useState(0);
    const id = JSON.parse(localStorage.getItem("account")).id;
    let currentDate = new Date();
    currentDate.setDate(1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    const fetchData = async () => {
        try{
            const {data} = await axios.post("http://localhost:8080/revenues/totalRevenueByDay/" + id + "/" + dateStart + "/" + dateEnd);
            setChartData({
                labels: data.map((item) => {
                    let date = new Date(item.day);
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    return day + '-' + (month < 10 ? '0' : '') + month + '-' + year;
                }),
                datasets: [
                    {
                        label: "Revenue",
                        data: data.map((item) => item.revenue),
                        fill: true,
                        borderColor: "rgb(241,86,74)",
                        backgroundColor: "rgb(241,86,74)"
                    },
                ],
            })
            calculateTotalRevenue(data);
        }catch (e){}

    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function handleChaneOption(value) {
        try{
            let currentDate = new Date();
            if (value == 0) {
                setDateStart("")
                setDateEnd("")
            } else if (value == 1) {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                setDateStart(year + '-' + (month < 10 ? '0' : '') + month + '-' + day);
                setDateEnd(year + '-' + (month < 10 ? '0' : '') + month + '-' + day);
            } else if (value == 2) {
                let year = currentDate.getFullYear();
                let month = currentDate.getMonth() + 1;
                setDateStart(year + "-" + (month < 10 ? '0' : '') + month + "-01");
                let lastDayOfMonth = new Date(year, month, 0).getDate();
                setDateEnd(year + "-" + (month < 10 ? '0' : '') + month + "-" + lastDayOfMonth);
            }
        }catch (e){

        }

    }
    const calculateTotalRevenue = (data) => {
        const total = data.reduce((sum, item) => sum + item.revenue, 0);
        setTotalRevenue(total);
    }

    return (
        <>
            <h2> Doanh Thu</h2>

            <table>
                <tr>
                    <td>Từ ngày:</td>
                    <td style={{padding: "10px"}}>Đến ngày:</td>
                    <td style={{padding: "10px"}}>Lọc theo:</td>
                </tr>
                <tr>
                    <td><input style={{borderRadius: "5px"}} type="date" value={dateStart}
                               onChange={event => setDateStart(event.target.value)}/>
                    </td>
                    <td style={{padding: "10px"}}>
                        <input style={{borderRadius: "5px"}} type="date" value={dateEnd}
                               onChange={event => setDateEnd(event.target.value)}/>
                    </td>
                    <td className="">
                        <select onChange={(event) => handleChaneOption(event.target.value)}
                                style={{height: "26px", borderRadius: "5px", margin: "5px"}}>
                            <option value={0}>Tùy Chọn</option>
                            <option value={1}>Ngày hôm nay</option>
                            <option value={2}>Tháng này</option>
                        </select>
                    </td>
                    <td style={{padding: "20px"}}>
                        <button onClick={fetchData}
                                style={{
                                    height: "53px",
                                    borderRadius: "5px",
                                    width: "100px",
                                    backgroundColor: "#f1564a",
                                    fontSize: "20px",
                                    color: "black"
                                }}>Enter
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>Tổng Doanh Thu:</td>
                    <td>{totalRevenue}VND</td>
                </tr>
            </table>
            <div>{chartData && chartData.datasets && (
                <Bar data={chartData}
                     options={{
                         responsive: true,
                         plugins: {legend: {position: "top"}},
                         title: {display: true, text: "Revenue"},
                     }}/>
            )}

                {/*{chartData && chartData.datasets && (*/}
                {/*    <Line data={chartData} options={{*/}
                {/*        responsive: true,*/}
                {/*        plugins: {legend: {position: "top"}},*/}
                {/*        title: {display: true, text: "Revenue"},*/}
                {/*    }}/>*/}
                {/*)}*/}

            </div>
            {/*{modal && (*/}
            {/*    <>*/}
            {/*        <link href="../resources/8.97b85fe3.chunk.css" rel="stylesheet"/>*/}
            {/*        <link href="../resources/main.3e229f12.chunk.css" rel="stylesheet"/>*/}
            {/*        */}
            {/*    </>*/}
            {/*)}*/}
        </>
    )
}

export default Revenue;