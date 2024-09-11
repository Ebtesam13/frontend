export function CartCard(props) {
  return (
    <>
      <div className="cart-card d-flex ">
        {props.src ? (
          <img
            key={props.src}
            src={`http://127.0.0.1:8000/storage/${props.src}`}
            width={100}
          />
        ) : (
          <></>
        )}

        {/* <img src={props.src} alt={props.pokemon}  width={100}/> */}
        <div className="cart-details">
          <h5>{props.title}</h5>
          <p className="text-black-50 para">{props.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p className="price"> OMR {props.price}</p>
            <span>
              <button className="btn inc" onClick={props.increase}>
                <i className="bi bi-plus-circle"></i>
              </button>
              {props.quant}
              <button className="btn dec" onClick={props.decrease}>
                <i className="bi bi-dash-circle"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
