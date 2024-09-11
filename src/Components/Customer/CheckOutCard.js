import { imageStorageURL } from "../../axiosConfig/API";

export default function CheckOutCard(props) {
  return (
    <>
      <div className="card mb-3 chOut" style={{ maxWidth: 350 }}>
        <div className="d-flex justify-content-center">
          <div className="bg-dark rounded-circle  px-2 h-25 align-self-center quant">
            <div className="text-white">{props.quant}</div>
          </div>

          <div className="row g-0">
            <div className="col-md-4 d-flex">
              <img
                className="rounded-start align-self-center"
                key={props.img}
                width={75}
                height={100}
                src={`${imageStorageURL}/storage/${props.img}`}
                alt=""
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <strong>
                  <p className="card-title">{props.title}</p>
                </strong>
                <p className="card-text">
                  <small className="text-body-secondary">{props.desc}</small>
                </p>
                <h6>
                  price: <strong>{props.price} OMR</strong>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
