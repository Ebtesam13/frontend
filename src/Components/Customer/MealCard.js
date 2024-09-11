import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartCard } from "./CartCard";
import { SizeCard } from "./SizeCard";
import { useSelector } from "react-redux";
export function MealCard(props) {
  const itemQuant = useSelector((state) => state.itemQuant);

  return (
    <>
      <img
        key={props.image}
        src={`http://127.0.0.1:8000/storage/${props.image}`}
      />

      <div className="pokemon-details">
        <h5>{props.name}</h5>
        <p className="text-black-50 para">{props.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="price"> OMR {props.cost}</p>
          <button
            className="button"
            data-bs-toggle="modal"
            data-bs-target={`#staticBackdrop-${props.id}`}
            onClick={() => {
              console.log(props);
            }}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ marginRight: "5px" }}
            />
            <span>Add</span>
          </button>
          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id={`staticBackdrop-${props.id}`}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby={`staticBackdropLabel-${props.id}`}
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={props.handleCancel}
                  ></button>
                </div>
                <div className="modal-body">
                  <CartCard
                    src={props.image}
                    title={props.name}
                    price={props.cost}
                    quant={itemQuant}
                    increase={props.increaseItems}
                    decrease={props.decreaseItems}
                  />
                  <strong>Size</strong>
                  <div className="d-flex ">
                    <SizeCard size="medium" />
                    <SizeCard size="Large" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={props.handleCancel}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn primary"
                    onClick={props.handleAddToCart}
                    data-bs-dismiss="modal"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal */}
        </div>
      </div>
    </>
  );
}
