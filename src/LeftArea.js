import SelectArea from './commonCompoents/SelectArea'
import { useSelector } from 'react-redux'
import { useState } from 'react';


const LeftArea = () =>{

    const [isClicked, setIsClicked] = useState(false);

    const animal = useSelector((state) => state.pickAnimal.value)

    const handleClicked = () => {
        setIsClicked(!isClicked)
    }

    return (
        <div className="pf-responsive-container">
             <div className="select-area">
            <SelectArea 
            animal={animal.text}
            btn = {false}
            isClicked = {isClicked}
            toggle = {handleClicked}
            />

            <SelectArea 
            animal="배송지 입력"
            btn = {true} 
            />

            </div>
        </div>
    )
}

export default LeftArea;