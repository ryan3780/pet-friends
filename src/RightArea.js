import { useEffect } from 'react';
import DivAndImg from './commonCompoents/DivAndImg'
import SearchInput from './SearchInput';
// import SearchKeyWord from './SearchKeyWord';


function RightArea () {

    // useEffect(() => {
    //     (async () => {
    //         const {keyWords} = 
    //     })
    // },[])

    return(
        <div className="pf-home-right-area">
            <DivAndImg 
            cla = "logo" 
            src = "https://images.pet-friends.co.kr/resource/2021/03/08/405opeipkm0d3s87/replication.png" 
            alt = "펫 프렌즈 로고"
            />

            <DivAndImg
            cla = "center-area"
            src = "https://cdn.pet-friends.co.kr/resources/pc/img/img-pet-friends-1-st%402x.png" 
            alt = "반려동물 1등 쇼핑몰 펫프렌즈"
            element={
            <DivAndImg
                cla = "search-container"
                src = "https://cdn.pet-friends.co.kr/resources/pc/img/button-search%402x.png"
                element={<SearchInput />}
                />
            }
            />
            
        </div>
    )
}


export default RightArea;