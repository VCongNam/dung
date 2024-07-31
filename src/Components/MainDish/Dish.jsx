import React from 'react';
import './Dish.css';

const Dish = () => {
    return (
        <div className='card'>
            <div class="card-body">
                <div class="text">123.000 VND/ Người</div>
                <p className='sub-text'>Lựa chọn loại giẩm bạn thích: </p>
                <ul className='sub-text'>
                    <li>Giấm vải thiều <span className="dot"></span></li>
                    <li>Giấm táo mèo</li>
                    <li>Giấm táo xanh</li>
                    <li>Giấm mơ <span className="dot"></span></li>
                    <li>Giấm trà xanh (+50k/nồi) <span className="dot"></span></li>
                </ul>
                <p className='sub-text'>Món nhúng đi kèm: Bắp bò tươi, gầu bò chín, rau nhúng, rau cuốn</p>
            </div>
        </div>
    );
};

export default Dish;