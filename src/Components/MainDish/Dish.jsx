import React from 'react';
import './Dish.css';

const Dish = () => {
    return (
        <div className='backCard'>
            <div class="card-body">
                <h5 class="money">123.000 VND/ Người</h5>
                <p className='sub-text'>Lựa chọn loại giấm bạn thích: </p>
                <ul className='sub-text'>
                    <li>Giấm vải thiều <span className="dot"></span></li>
                    <li>Giấm táo mèo</li>
                    <li>Giấm táo xanh</li>
                    <li>Giấm mơ <span className="dot"></span></li>
                    <li>Giấm trà xanh  <span className="dot"></span></li>
                </ul>
                <p className='sub-text'>Món nhúng đi kèm: Bắp bò tươi, gầu bò chín, rau nhúng, rau cuốn</p>
            </div>
        </div>
    );
};

export default Dish;