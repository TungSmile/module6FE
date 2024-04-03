import React, {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../home/firebase";
import {v4} from "uuid";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {checkToken} from "../../service/UserService";

function UploadAvatar() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [scale, setScale] = useState(0);
    const dispatch = useDispatch()
    const storeUser = useSelector(state => {
        return state.user.user.current;
    })
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Khi load lại trang thì luôn hiện trên cùng
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // sự kiện kéo thả làm thay đổi kích thước của ảnh trên thẻ canvas
    const handleScaleChange = (event) => {
        const newScale = parseFloat(event.target.value);
        setScale(newScale);

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.onload = () => {
            const canvasCenterX = canvas.width / 2;
            const canvasCenterY = canvas.height / 2;

            const imageWidth = img.width * newScale;
            const imageHeight = img.height * newScale;

            const imageX = canvasCenterX - imageWidth / 2;
            const imageY = canvasCenterY - imageHeight / 2;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, imageX, imageY, canvas.width * newScale, canvas.height * newScale);
        };
        img.src = imageURL;
    };

    // bắt sự kiện khi bấm chọn ảnh ở ô Input thì ảnh hiển thị trên thẻ canvas
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImageURL(imageURL);

            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0., canvas.width, canvas.height);
            };
            img.src = imageURL;
        }
    };


    // Lưu chuỗi ảnh từ firebase vào database
    const [avatarUpload, setAvatarUpload] = useState([]);
    const id = JSON.parse(localStorage.getItem("account")).id;
    const avatars = {
        avatar: avatarUpload[0],
        id: id
    }

    function SaveAvatar() {
        if (avatarUpload == null) return;
        console.log(avatarUpload)
        for (let i = 0; i < avatarUpload.length; i++) {
            console.log(avatarUpload[i])
            const imageRef = ref(storage, `Avatar/${avatarUpload[i].name + v4()}`);
            uploadBytes(imageRef, avatarUpload[i]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    let data1 = {...avatars, avatar: url}
                    console.log(data1)
                    axios.post("http://localhost:8080/accounts/avatar/" + id, data1)
                        .then(response => {
                            setAvatarUpload(response.data.avatar);
                            closeModal();
                            console.log("---------------")
                            dispatch(checkToken());
                        })
                        .catch(error => {
                            console.log(error);
                        })
                });
            });
        }
    }

    return (
        <>

            <div className="d-flex img-avatar">
                <img src={storeUser ? storeUser.account.avatar : "../resources/raw/avatar6.png"} style={{objectFit: "cover"}} className alt="avatar"
                     sizes="sm"/>

                <div className="cropimg-avatar">
                    <button type="button" onClick={openModal}><span> Thay Đổi<p>JPG, GIF or PNG, &lt;5 MB. </p></span>
                    </button>
                </div>

            </div>

            {modalIsOpen && (
                <>
                    <div className="editor-avatar-section">
                        <div>
                            <canvas
                                id="canvas"
                                width={620} height={620} className="editor-canvas"
                                style={{
                                    width: '310px',
                                    height: '310px',
                                    cursor: 'grab',
                                    touchAction: 'none',
                                    backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHTGAvqKDq1H9_KxmVPnJ2fJxzPmBYujyHA&usqp=CAU")',
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    borderRadius:'5px'

                                }}/>
                        </div>
                        <br/>
                        <div className="box">
                            {/*<input onChange={handleImageChange} className="input-file-1" name="newImage"*/}
                            {/*       type="file" accept="image/png, image/jpeg, image/jpg"/>*/}
                            <input name="newImage" type="file" accept="image/png, image/jpeg, image/jpg"
                                   multiple='multiple'
                                   onChange={(event) => {
                                       handleImageChange(event)
                                       setAvatarUpload(event.target.files);
                                   }}/>
                        </div>
                        <br/>
                        <input name="scale" type="range" min={1} max={3} step="0.01" defaultValue={-0.2}
                               onChange={handleScaleChange}
                               value={scale}
                               style={{width: '20%', margin: '0px auto', borderRadius:'5px'}}/>
                        <br/>
                        <button type="submit" onChange={(event) => {
                            setAvatarUpload(event.target.files)
                        }} onClick={() => {
                            SaveAvatar()
                        }}> Lưu
                        </button>
                        <button onClick={() => {
                            closeModal()
                        }}>Huỷ bỏ
                        </button>
                    </div>
                </>
            )}

        </>
    )
}

export default UploadAvatar;