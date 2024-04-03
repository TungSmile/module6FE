import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCCDVsBySupplies} from "../../service/CCDVsService";
import {setChosenSupplies} from "../../service/SupplyService";

const SidebarSupplies = () => {
    const dispatch = useDispatch();

    const supplies = useSelector(state => {
        return state.supplies.supplies.all;
    })
    const chosenSupplies = useSelector(state => {
        return state.supplies.supplies.chosen;
    });

    useEffect(() => {
        dispatch(getCCDVsBySupplies(chosenSupplies));
    }, [chosenSupplies])

    // Start js functions
    const updateChosenSupplies = (e, item) => {
        const li = e.target.closest("li");
        li.classList.toggle("active");

        let supply = {"id" : item.id}
        let index = chosenSupplies.map(e => (e.id)).indexOf(item.id)
        if (index > -1) {
            let newSupplies = chosenSupplies.filter((e, idx) => {
                if (idx != index) {
                    return e;
                }
            })
            dispatch(setChosenSupplies(newSupplies));
        } else {
            dispatch(setChosenSupplies([...chosenSupplies, supply]));
        }
    }

    // End js functions

    return (
        <>
            <div className="home-flex-category">
                <div className="fixed-cate"><p><span>Danh sách dịch vụ</span></p>
                    <ul className="list-group">
                        {supplies && supplies.map((item, key) => (
                            <li className="list-item " key={key} style={{marginBottom: "10px"}} onClick={(e) => {updateChosenSupplies(e, item)}}>
                                <div className="media">
                                    <div className="media-body media-middle"><p className="media-heading" style={{fontSize: "13px"}}>{item.nameSupply}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );

};

export default SidebarSupplies;