import SelectArea from './commonCompoents/SelectArea'
import { useSelector } from 'react-redux'
import { useState, useEffect, useCallback, useRef } from 'react';
import EventCarousel from './EventCarousel';
import guWal from './img/9wal.jpeg';
import grip from './img/grip.jpeg';


const LeftArea = () => {

    const [tabMenu, setTabMenu] = useState([])

    const [isClicked, setIsClicked] = useState(false);

    const animal = useSelector((state) => state.pickAnimal.value)

    const swipeRef = useRef();

    const slider = swipeRef.current;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = (e) => {

        mouseDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;

    };

    const stopDragging = (e) => {
        mouseDown = false;
        setInitPos(() => menuSelectRef.current[0].getBoundingClientRect().x)
    };

    const mouseLeave = () => {
        mouseDown = false;
        setInitPos(() => menuSelectRef.current[0].getBoundingClientRect().x)
    };

    const mouseMove = (e) => {
        e.preventDefault();

        if (!mouseDown) return;

        const x = e.pageX - slider.offsetLeft;
        const scroll = x - startX;
        slider.scrollLeft = scrollLeft - scroll;

    }

    const handleClicked = () => {
        setIsClicked(!isClicked)
    }

    const fetchData = useCallback(async () => {
        const { data } = await fetch(
            `https://mobile.api.pet-friends.co.kr/tab/menu/list`,
            {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    "product_group1_id": 1,
                    "center_id": 1,
                    "use_cache": false,
                    "session": "",
                    "request_all": true
                })
            })
            .then(response => response.json())
            .catch((error) => {
                alert(error)
            })

        if (animal.text[0] === "강아지") {
            setTabMenu(data.dog_tab_menu_list)
        } else {
            setTabMenu(data.cat_tab_menu_list)
        }

    }, [animal]);

    const sumMenuSelectWidth = (menu) => {

        if (menu) return;

        const initialValue = 0;

        const sumWidth = menu.reduce((acc, cur) => acc + cur.offsetWidth + 30, initialValue);

        return sumWidth;
    }

    const [initialPositionX, setInitialPositionX] = useState(0);

    const handleMenuClick = (idx) => {

        if (prevPosRef.current !== initialPositionX) return;

        menuSelectRef.current[idx].className = "on";
        menuSelectRef.current.filter((item, index) => idx !== index && item != null ? item.className = 'off' : '');

        menuSelectBarRef.current.style.width = menuSelectRef.current[idx].offsetWidth + 2 + 'px';

        const firstItemX = menuSelectRef.current[0].getBoundingClientRect().x

        const itemX = menuSelectRef.current[idx].getBoundingClientRect().x

        menuSelectBarRef.current.style.left = Math.ceil((itemX - firstItemX) + 41) + `px`

    }

    useEffect(() => {
        fetchData();

        if (menuSelectRef.current.length !== 0) {
            slider.scrollLeft = 0;
            swipeRef.current.lastChild.style.width = `${sumMenuSelectWidth(menuSelectRef.current)}px`;
            setInitialPositionX(menuSelectRef.current[0].getBoundingClientRect().x);
            handleMenuClick(0);
        }

        // eslint-disable-next-line 
    }, [fetchData, slider])


    const handleMakeIsClickedFalse = () => {
        if (isClicked) {
            setIsClicked(false);
        }
    }

    const menuSelectRef = useRef([]);

    const menuSelectBarRef = useRef();

    const [initPos, setInitPos] = useState(0);

    const prevPosRef = useRef();

    useEffect(() => {

        prevPosRef.current = initPos;
        setInitialPositionX(prevPosRef.current)

    }, [initPos]);

    return (
        <div className="pf-responsive-container" onClick={handleMakeIsClickedFalse}>
            <div className="select-area">
                <SelectArea
                    animal={animal.text[0]}
                    btn={false}
                    isClicked={isClicked}
                    toggle={handleClicked}
                />

                <SelectArea
                    animal="배송지 입력"
                    btn={true}
                />

            </div>

            <div className="tab main-tab">
                <div className='swipe-area'>
                    <ul className='swipe'
                        ref={swipeRef}
                        onMouseDown={startDragging}
                        onMouseLeave={mouseLeave}
                        onMouseUp={stopDragging}
                        onMouseMove={mouseMove}
                    >
                        <li className='bar' ref={menuSelectBarRef} style={{ width: '41px' }}>Bar</li>
                        <div className='list'>
                            {tabMenu.map((item, idx) => {
                                return (<li key={idx}>
                                    <div key={idx} className="tab-menu-container cursor">
                                        <span
                                            ref={(el) => menuSelectRef.current[idx] = el}
                                            onClick={() => handleMenuClick(idx)}
                                            className={idx === 0 ? 'on' : 'off'}
                                        >
                                            {item.tab_menu_name}</span>
                                    </div>
                                </li>)
                            })}
                        </div>
                    </ul>
                </div>
            </div>
            <EventCarousel />

            <div className='blog'>
                <a href="https://blog.naver.com/PostList.naver?blogId=9wal9wal" target='_blank' rel="noreferrer noopener">
                    <button className="w-btn-neon2" type="button">
                        갈색푸들 궐궐!
                    </button>
                </a>
                <a href="https://9home.tistory.com/" target='_blank' rel="noreferrer noopener">
                    <button className="w-btn-outline w-btn-indigo-outline" type="button">
                        그얼이네
                    </button>
                </a>
            </div>

            <div className='footer'>
                <img src={guWal} alt="구월이 사진" />
                <img src={grip} alt="구월이 그립톡 사진" />
            </div>
        </div>
    )
}

export default LeftArea;