import UnderArrow from './UnderArrow';

const SelectArea = ({animal, btn}) =>{

    const handleSelectClick = () => {
        console.log("cat and dog")
    }

    return(
       <>
        {btn ? 
        <div>
            <button>배송지 입력
                <UnderArrow />
            </button>
        </div> : 
        <>
        <div className="mr-10" onClick={handleSelectClick}>
            <div className="product-group1-selector">
                <div className="clickable"> {animal}
                        <UnderArrow />
                </div>
            </div>
        </div>
        <div className="select-contents">
            <div className="clickable select-item clicked"> 강아지 </div>
            <div className="clickable select-item unclicked"> 고양이 </div>
        </div>
        </> 
            }
         </>
        
    )
}

export default SelectArea;