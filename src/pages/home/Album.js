import React, {useState, useEffect} from "react";
import {ref, uploadBytes, getDownloadURL, listAll} from "firebase/storage";
import {storage} from "./firebase";
import {v4} from "uuid";
import axios from "axios";
import {useParams} from "react-router";
import ShowImages from "../profile/ShowImages";
import ShowImageAlbumPlayer from "../profile/ShowImageAlbumPlayer";

function Album() {
    const [imageUpload, setImageUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "images/");
    const account = JSON.parse(localStorage.getItem('account'));
    const id = JSON.parse(localStorage.getItem("account")).id;
    const album = {
        img: imageUrls,
        accountCCDV: {
            id: account.id
        },
        isActive: 'true'
    }

    function ok() {
        if (imageUpload == null) return;
        for (let i = 0; i < imageUpload.length; i++) {
            console.log(imageUpload[i])
            const imageRef = ref(storage, `images/${imageUpload[i].name + v4()}`);
            uploadBytes(imageRef, imageUpload[i]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    let data1 = {...album, img: [url]}
                    console.log(data1)
                    axios.post("http://localhost:8080/images/album", data1)
                        .then(response => {
                            setImageUrls(response.data.img);
                            load()
                        })
                        .catch(error => {
                            console.log(error);
                        })
                });
            });
        }
    }

    const load = () => {
        axios.get("http://localhost:8080/images/" + id)
            .then(response => {
                setImageUrls(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        // listAll(imagesListRef).then((response) => {
        //     response.items.forEach((item) => {
        //         getDownloadURL(item).then((url) => {
        //             setImageUrls((prev) => [...prev, url]);
        //         });
        //     });
        // });
    }

    useEffect(() => {
        load()
    }, []);
    return (
        <>
            <h3>Albums Player</h3>
            <div className="player-albums">
                <div className="col-md-12" style={{padding:"0px"}}>
                    <div>
                        <input name="album" type="file" accept="image/png, image/jpeg, image/jpg"
                               multiple='multiple'
                               onChange={(event) => {
                                   setImageUpload(event.target.files);
                               }}/>
                        <div className="btn-upload"><i className="fas fa-images"></i>Thêm ảnh</div>
                        <button type="submit" onClick={ok} className="btn-upload">Enter
                        </button>
                    </div>
                </div>
                <div className="album-of-player">
                {imageUrls.length > 0 && <ShowImageAlbumPlayer imageAlbum={imageUrls}/>}
                {/*{imageUrls && imageUrls.map((item) => (*/}
                    {/*    <div className="col-md-3">*/}
                {/*        <p>*/}
                {/*            <img src={item.img} alt="" style={{width: "100%", height: "250px", borderRadius: "10px"}}/>*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*))}*/}
                </div>
            </div>
        </>
    )
}

export default Album;