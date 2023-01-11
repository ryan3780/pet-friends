const SearchKeyWord = ({keyword, idx}) => {

    return(
        <div className="word" key={idx}>
            <div>{keyword}</div>
        </div>
    )
}

export default SearchKeyWord;