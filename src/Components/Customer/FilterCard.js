
export function FilterCard(props){
    return(
        <>
        <div className="" >
        <button className={" filter-button "} onClick={props.filterr} id={props.id}>
            <img src={props.img} height={50} width={75} className="rounded" ></img>
            <div className="card-content"><strong> <h6 className="text-wrap">{props.title}</h6></strong></div>
            
        </button>
        </div>
        </>
    )
}