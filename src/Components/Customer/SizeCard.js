

export function SizeCard(props){
  let size=''
  if(props.size===1)
    size="Small"
  else if(props.size===2)
    size="Medium"
  else if(props.size===3)
    size="Big"
  else if(props.size===4)
    size="Family"
  else
    size=''


    return(
        <>
        <div  className=" size  cart-card d-flex mx-2 "  onChange={props.changeSize}>
        
        <div className="form-check">
        <input className="form-check-input" type="radio" name="size" id={`radio-${size}`} />
        <label className="form-check-label " for={`radio-${size}`} >
          {size}
        </label>
        <br></br>
        Cost: <strong>{props.price}</strong> 
        <br></br>
        NOP:{props.nop}
      </div>
        
        
      </div>
        </>
    )
}