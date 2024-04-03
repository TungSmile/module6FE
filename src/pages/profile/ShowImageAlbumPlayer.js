import React, {useEffect, useState} from 'react';
import "../../custom-css/cssShowImages.css"
import "../../custom-css/bootstrap.min.css"

const ShowImageAlbumPlayer = ({imageAlbum}) => {
        const [slideIndex, setSlideIndex] = useState(1);
        const [modalState, setModalState] = useState(false);
        const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
        const [showHiddenImages, setShowHiddenImages] = useState(false);

        const toggleModal = (index) => {
            setModalState(!modalState);
            setSelectedImageIndex(index);
            if (index === 13) {
                setShowHiddenImages(!showHiddenImages);
            } else {
                setSelectedImageIndex(index);
            }
            console.log(modalState)
        }

        const backdropCloseModal = (e) => {
            let check = e.target.closest(".modal-content");
            console.log(e.target)
            console.log(check)
            if (!check) {
                setModalState(false);
            }

        }

        function plusSlides(n) {
            setSlideIndex(slideIndex + n);
            let newIndex = selectedImageIndex + n;
            if (newIndex < 0) {
                newIndex = imageAlbum.length - 1;
            } else if (newIndex >= imageAlbum.length) {
                newIndex = 0;
            }
            setSelectedImageIndex(newIndex);
        }


        function showSlides(n) {
            let slideIndex2 = slideIndex;
            let i;
            let slides = document.getElementsByClassName("mySlides-showImages");
            console.log(slides);
            let dots = document.getElementsByClassName("demo-showImages");
            let captionText = document.getElementById("caption");
            if (n > slides.length) {
                slideIndex2 = 1
                setSlideIndex(1);
            }
            if (n < 1) {
                slideIndex2 = slides.length
                setSlideIndex(slides.length);
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }

            slides[slideIndex2 - 1].style.display = "flex";
            dots[slideIndex2 - 1].className += " active";
        }

        useEffect(() => {
            try {
                showSlides(slideIndex)
            } catch (e) {
            }
        }, [slideIndex, modalState])

        return (
            <>
                <div>
                    <title>ALbum Player</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <div className="content-player-profile">
                        <div className="album-of-player">
                            {
                                imageAlbum && imageAlbum.map((item, key) => {
                                    if (key < 15) {
                                        return (
                                            <div className="col-md-3" style={{
                                                padding: "0px 5px", position: "relative",
                                                overflow: 'hidden'
                                            }} key={key}>
                                                <a style={{display: 'block'}} key={key} onClick={() => toggleModal(key)}>
                                                    <img style={{
                                                        // width: "100%",
                                                        height: "250px",
                                                        objectFit: "cover",
                                                        marginTop: "10px",
                                                        borderRadius: "10px"
                                                    }}
                                                         src={item.img} className alt=""/>
                                                    <span onClick={() => toggleModal(key)}></span>
                                                </a>
                                            </div>
                                        )
                                    }
                                    if (key == 15) {
                                        return (
                                            <>
                                                <div className="col-md-3" style={{padding: "0px 5px"}} key={key}>
                                                    <a onClick={() => toggleModal(key)}>
                                                        <div className="fadeDiv" style={{fontFamily: "Arial"}}>
                                                            <img style={{
                                                                objectFit: "cover",
                                                                height: "250px",
                                                                marginTop: "10px",
                                                                borderRadius: "10px",
                                                                zIndex: '-1',
                                                                position: "relative"
                                                            }} src={item.img} className alt=""/>
                                                            <div style={{

                                                                height: "250px",
                                                                objectFit: "cover",
                                                                marginTop: "-250px",
                                                                padding: '50% 40%',
                                                                borderRadius: "10px",
                                                                position: "relative",
                                                                background: 'rgba(0,0,0,0.6)',
                                                                zIndex: '1',
                                                                color: 'white',
                                                                fontSize: '30px'
                                                            }}>
                                                                +{imageAlbum.length - 15}
                                                            </div>
                                                        </div>
                                                        <span onClick={() => toggleModal(key)}></span>
                                                    </a>
                                                    <div className="clearfix"/>
                                                </div>

                                            </>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                    {/*The Modal*/}
                    {modalState ?
                        <div className="modal show" id="myModal" aria-modal="true" role="dialog" style={{display: 'block'}}
                             onClick={(e) => {
                                 backdropCloseModal(e)
                             }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <>
                                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                                        <style
                                            dangerouslySetInnerHTML={{__html: "\nbody {\n  font-family: Arial;\n  margin: 0;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nimg {\n  vertical-align: middle;\n}\n\n/* Position the image container-showImages2 (needed to position the left and right arrow-showImagess) */\n.container-showImages2 {\n  position: relative;\n}\n\n/* Hide the images by default */\n.mySlides-showImages {\n  display: none;\n}\n\n/* Add a pointer when hovering over the thumbnail images */\n.cursor-showImages {\n  cursor-showImages: pointer;\n}\n\n/* Next & previous buttons */\n.prev,\n.next {\n  cursor: pointer;\n  position: absolute;\n  top: 40%;\n  width: auto;\n  padding: 16px;\n  color: white;\n  font-weight: bold;\n  font-size: 20px;\n  border-radius: 0 3px 3px 0;\n  user-select: none;\n  -webkit-user-select: none;\n}\n\n/* Position the \"next button\" to the right */\n.next {\n  right: 0;\n  border-radius: 3px 0 0 3px;\n}\n\n/* On hover, add a black background color with a little bit see-through */\n.prev:hover,\n.next:hover {\n  background-color: rgba(0, 0, 0, 0.8);\n}\n\n/* Number text (1/3 etc) */\n.numbertext-showImages {\n  color: #f2f2f2;\n  font-size: 12px;\n  padding: 8px 12px;\n  position: absolute;\n  top: 0;\n}\n\n/* container-showImages2 for image text */\n.caption-container {\n  text-align: center;\n  background-color: #222;\n  padding: 2px 16px;\n  color: white;\n}\n\n.row-showImages:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n/* Six column-showImagess side by side */\n.column-showImages {\n  float: left;\n  width: 100%;\n}\n\n/* Add a transparency effect for thumnbail images */\n.demo-showImages {\n  opacity: 0.6;\n}\n\n.active,\n.demo-showImages:hover {\n  opacity: 1;\n}\n"}}/>
                                        <div className="container-showImages2"
                                             style={{border: "10px", borderRadius: '10px',height:'600px', width:'initial'}}>
                                            {selectedImageIndex !== -1 && (
                                                <div
                                                    className="mySlides-showImages"
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        margin: "auto",
                                                        height: '600px',
                                                    }}
                                                >
                                                    <img src={imageAlbum[selectedImageIndex].img} style={{height:'600px', width:'500px', objectFit:'cover'}}/>
                                                </div>
                                            )}
                                            <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
                                            <a className="next" onClick={() => plusSlides(1)}>❯</a>

                                        </div>
                                    </>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    {modalState ?
                        <div className="modal-backdrop show"></div>
                        :
                        <></>
                    }
                </div>

            </>
        );
    }
;

export default ShowImageAlbumPlayer;