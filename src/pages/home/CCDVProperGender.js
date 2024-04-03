import {useSelector} from "react-redux";
import React from "react";
import {Link} from "react-router-dom";

const CCDVProperGender = () => {
    const properCCDV = useSelector(state => {
        return state.CCDVs.CCDVs.properGender;
    })

    return (<>
        <div className="box proper-CDDV">
            <header className="title-header vip"><h5 className="title-header-left">GỢI Ý PHÙ HỢP GIỚI TÍNH  </h5>
                {/*<p className="title-header-right"><span>Làm mới</span><i className="fas fa-sync false" /></p>*/}
            </header>
            <div className="card-player row">
                {properCCDV && properCCDV.map((item, key) => (
                    <Link to={"/profile/" + item.userProfile.account.username}>
                        <div className="col-md-3" key={key}>
                            <div className="player-information-card-wrap">
                                <div className="player-avatar">
                                    <a target="_blank" href={"/profile/" + item.userProfile.account.username}>
                                        <img src={item.userProfile.account.avatar} className alt="PD" id="avt-img-reponsiver" style={{objectFit: "cover"}}/>
                                    </a>
                                    <a target="_blank" className="player-price"
                                       href={"/profile/" + item.userProfile.account.username}>{item.userProfile.price} đ/h</a>
                                </div>
                                <a target="_blank" className="player-information"
                                   href={"/profile/" + item.userProfile.account.username}>
                                    <h3 className="player-name">
                                        <a target="_blank"
                                           href={"/profile/" + item.userProfile.account.username}>{item.userProfile.account.nickname}</a>
                                        {/*<i className="fas fa-check-circle kyc" aria-hidden="true" />*/}
                                        {/*<div className="player-status ready">*/}
                                        {/*</div>*/}
                                    </h3>
                                    <p className="player-title">{item.randomServices}</p>
                                    <div className="category">
                                        <div className="div--flex">
                                            <div className="rate">
                                                <i className="fas fa-star"/>
                                                <p>{item.rate == null ? 0 : item.rate.toFixed(1).replace(".", ",")}
                                                    <i>({item.countRate})</i></p>
                                            </div>
                                            <div className="rate">
                                                <i className="fas fa-eye"/>
                                                <p>{item.userProfile.views}</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </Link>
                ))}

                {/*<div className="col-md-3">*/}
                {/*    <div className="player-information-card-wrap">*/}
                {/*        <div className="player-avatar">*/}
                {/*            <a target="_blank" href="/ngocngayngohihihehe">*/}
                {/*                <img src="https://playerduo.net/api/upload-service/images/a0b07166-1e65-4e77-a651-b2fef639aa86__25eed2b0-417d-11ee-a657-a54d6be1d46a__player_avatar.jpg" className alt="PD" id="avt-img-reponsiver" style={{objectFit: "cover"}} />*/}
                {/*            </a>*/}
                {/*            <a target="_blank" className="player-price" href="/ngocngayngohihihehe">69,000 đ/h</a>*/}
                {/*        </div>*/}
                {/*        <a target="_blank" className="player-information" href="/ngocngayngohihihehe">*/}
                {/*            <h3 className="player-name">*/}
                {/*                <a target="_blank" href="/ngocngayngohihihehe">Bích Ngọc</a>*/}
                {/*                <i className="fas fa-check-circle kyc" aria-hidden="true" />*/}
                {/*                <div className="player-status ready">*/}
                {/*                </div>*/}
                {/*            </h3>*/}
                {/*            <p className="player-title">LOL,PUPG PC,TFT,CALL VIDEO</p>*/}
                {/*            <div className="category">*/}
                {/*                <div className="div--flex">*/}
                {/*                    <div className="rate">*/}
                {/*                        <i className="fas fa-star" />*/}
                {/*                        <p>4.9 <i>(164)</i></p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>
        </div>


    </>)
}
export default CCDVProperGender