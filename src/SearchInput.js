import React, { useState } from 'react';

const SearchInput = () => {
    const [text, setText] = useState("")

    const reg = /[^a-zA-Z0-9ㄱ-힣]/g;

    const regReplace = (str) => {
        return str.replace(reg, ``);
      }

    const handleText = (e) => {
        let replacedText = regReplace(e.target.value)
        setText(replacedText)
    }

    const handleResetWord = () => {
        setText("")
    }

    return(
        <>
        <div className="search-input-box">
                <input placeholder="어떤 상품을 찾으시나요?" type="text" autoComplete="off" value={text} onChange={(e) => handleText(e)}/>
                    <button 
                    className="reset-word" 
                    style={{display: text.length > 0 ? "" : "none"}} 
                    onClick={handleResetWord}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="svg_icon_v1_button-delite-large-gray" className="d-block">
                            <g fill="none" fillRule="evenodd" transform="translate(1 1)">
                            <circle cx="11" cy="11" r="11" fill="#F3F3F3"></circle>
                            <path stroke="#AAA" strokeLinecap="round" strokeWidth="2" d="M13.715 8L8 13.715M8 8l5.715 5.715">
                            </path>
                            </g>
                        </svg>
                    </button>
            </div>
            <div className="search-button"></div>
            </>
    )
}

export default SearchInput;