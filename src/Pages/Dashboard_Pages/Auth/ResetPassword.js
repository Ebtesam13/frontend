export default function ResetPassword() {
  return (
    <div className="formUser">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form className="card-body p-lg-5">
                <div className="mb-3">
                  <label htmlFor="email">email</label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-2 w-100"
                  >
                    send code verify
                  </button>
                  <span className="text-danger ml-5">Check your email</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
