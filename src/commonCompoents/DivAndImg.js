const divAndimg = ({cla, src, alt, element}) =>{
    return(
        <div className = {cla}>
            <img src = {src} alt = {alt} lazy = "loaded" />
            {element}
        </div>
    )
}

export default divAndimg