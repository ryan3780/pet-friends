import { useEffect, useState } from 'react';
import DivAndImg from './commonCompoents/DivAndImg'
import SearchInput from './SearchInput';
import SearchKeyWord from './SearchKeyWord';

function RightArea () {

    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        (async () => {
            const {data} =
            await fetch(
                `https://mobile.api.pet-friends.co.kr/search/word/rank/list`,
                {
                method: "POST",
                headers: {
                  'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    "mobile_device_id" : "80197bae-b5a8-4620-87c9-a1dca94a9429",
                    "mobile_os_code" : "P",
                    "product_group1_id" : "1"
                })
                })
                .then(response => response.json())
                .catch((error) => {
                    alert(error)
                  })

                  setKeywords(data.search_word_rank_list)

        })()
    },[])

    const searchKeyword = keywords.map((item, idx)=> {
                return <SearchKeyWord keyword={item.search_word} key={idx} />
            })
    

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
                child = {<div className="search-keyword">
                            {searchKeyword}
                        </div>
                 }
                />
            }

            />
            
        </div>
    )
}


export default RightArea;