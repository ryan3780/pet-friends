const SearchKeyWord = () => {

    fetch(
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
        .then(response => console.log(response))
        .catch((error) => {
            alert(error)
          });

}

export default SearchKeyWord;