import SelectArea from './commonCompoents/SelectArea'
import { useSelector } from 'react-redux'
import { useState, useEffect, useCallback, useRef } from 'react';


const LeftArea = () =>{

    const [tabMenu, setTabMenu] = useState([])

    const [isClicked, setIsClicked] = useState(false);

    const animal = useSelector((state) => state.pickAnimal.value)

    const handleClicked = () => {
        setIsClicked(!isClicked)
    }

    const fetchData = useCallback( async () => {
       const {data} = await fetch(
            `https://mobile.api.pet-friends.co.kr/tab/menu/list`,
            {
            method: "POST",
            headers: {
              'Content-type' : 'application/json'
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
            
            if(animal.text[0] === "강아지"){
                setTabMenu(data.dog_tab_menu_list)
            }else{
                setTabMenu(data.cat_tab_menu_list)
            }
      }, [animal]);

    useEffect(() => {
        fetchData()
    },[fetchData])

    const handleMakeIsClickedFalse = () =>{
        if(isClicked){
            setIsClicked(false)
        }
    }

    const menuSelectRef = useRef([]);

    const menuSelectBarRef = useRef();

    const handleMenuClick = (idx) => {
        menuSelectRef.current[idx].className = "on"
        menuSelectRef.current.filter((item, index) => idx !== index ? item.className = 'off' : '')

        menuSelectBarRef.current.style.width = menuSelectRef.current[idx].offsetWidth + 'px'        
    }


    const swipeRef = useRef();

    const [endX, setEndX] = useState();

    const slider = swipeRef.current
    let isDown = false;
    let startX;
    let scrollLeft;
    let end;

    const mouseDown = (e) =>{
        console.log('Down endX : ' , endX)
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }
    
    const mouseLeave = () => {
        isDown = false;
        setEndX(end)
    }

    const mouseUp = () =>{
        isDown = false;
        const transLateX = swipeRef.current.style.transform;
        const range = -transLateX.replaceAll(/\D/g,'')
        
        if(range < -422){
            swipeRef.current.style.transform = `translateX(-422px)`;
            end = -422;
            return;
        }
        setEndX(end)
        
    }
   
    const mouseMove = (e) =>{
        if(!isDown) return;
        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) //scroll-fast

        slider.scrollLeft = scrollLeft - walk;
        
        if(endX !== undefined){
            swipeRef.current.style.transform = `translateX(${endX + walk}px)`
            end = endX + walk
        }else{
            swipeRef.current.style.transform = `translateX(${walk}px)`
            end = walk;
        }
        

        
        
    }
    


    return (
        <div className="pf-responsive-container" onClick={handleMakeIsClickedFalse}>
             <div className="select-area">
                <SelectArea 
                animal={animal.text[0]}
                btn = {false}
                isClicked = {isClicked}
                toggle = {handleClicked}
                />

                <SelectArea 
                animal="배송지 입력"
                btn = {true} 
                />

            </div>

            <div className="tab main-tab">
                <div className='swipe-area'>
                    <ul className='swipe' 
                    ref = {swipeRef}
                    onMouseDown={mouseDown}
                    onMouseLeave={mouseLeave}
                    onMouseUp={mouseUp}
                    onMouseMove={mouseMove}
                    >
                        <li className='bar' ref={menuSelectBarRef} style={{width : '41px'}}>Bar</li>
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
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default LeftArea;