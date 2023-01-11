import { useDispatch } from 'react-redux';
import { find } from './redux/search';


const SearchKeyWord = ({keyword, idx}) => {

    const dispatch = useDispatch()

    const handleWordClick = () =>{
        dispatch(find({text : keyword}))
    }

    return(
        <div className="word" key={idx} onClick={handleWordClick}>
            <div>{keyword}</div>
        </div>
    )
}

export default SearchKeyWord;