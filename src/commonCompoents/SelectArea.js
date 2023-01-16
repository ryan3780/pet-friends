import { useRef } from 'react';
import UnderArrow from './UnderArrow';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { pickAnimal } from '../redux/pickAnimal';


const SelectArea = ({animal, btn, isClicked, toggle}) =>{

    const pickRef = useRef([]);

    const dispatch = useDispatch()

    const pick = useSelector((state) => state.pickAnimal.value)

    const handleSelectClick = (idx) => {

        if(idx !== 0){
            let beforeSelectedAnimal = pick.text[0]
            dispatch(pickAnimal({text : [pickRef.current[idx].innerText, beforeSelectedAnimal]}))
        }
        
        toggle()
        
    }

    const handleSendValue = () => {
        toggle()
    }
 
    return(
       <>
        {btn ? 
        <div>
            <button>배송지 입력
                <UnderArrow />
            </button>
        </div> : 

        <div className="mr-10">
            <div className="product-group1-selector" onClick={handleSendValue}>
                <div className="clickable select-btn"> {animal}
                        <UnderArrow />
                </div>
            </div>
            {isClicked ? <div className="select-contents">
                <div className="clickable select-item clicked" ref={(el) => (pickRef.current[0] = el)}
                 onClick={() => handleSelectClick(0)}> {pick.text[0] === '강아지' ? '강아지' : '고양이'} </div>
                <div className="clickable select-item unclicked" ref={(el) => (pickRef.current[1] = el)} 
                onClick={() => handleSelectClick(1)}> {pick.text[0] === '강아지' ? '고양이' : '강아지'} </div>
            </div> : 
                null
            }
            
        </div>}
         </>
        
    )
}

export default SelectArea;