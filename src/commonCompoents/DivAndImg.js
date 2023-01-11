const divAndimg = ({cla, src, alt, element, child}) =>{
    return(
        <>
        <div className = {cla}>
            <img src = {src} alt = {alt} lazy = "loaded" />
            {element}
        </div>
        {child}
        </>
    )
}

export default divAndimg