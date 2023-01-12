import SelectArea from './commonCompoents/SelectArea'

const LeftArea = () =>{

    

    return (
        <div className="pf-responsive-container">
             <div className="select-area">
            <SelectArea 
            animal="강아지"
            btn = {false}
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