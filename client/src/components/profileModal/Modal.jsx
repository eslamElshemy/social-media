import "./Modal.scss";
import { Link } from "react-router-dom";

const Modal = ({ fdata, floading, type, c }) => {
  return (
    <>
      <div className="profileModal">
        <div
          className="modal fade"
          id={`${c ? "staticBackdropp":"staticBackdrop"}`}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          {floading ? (
            "loading"
          ) : (
            <>
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      style={{ textAlign: "center" }}
                      id="staticBackdropLabel"
                    >
                      {type === "mutual" ? (
                        `${fdata.length > 0 ? fdata.length : "No"}
                      ${fdata.length > 1 ? "Mutual Friends" : "Mutual Friend"}`
                      ) : type === "follower" ? (
                        <>
                          <b>{fdata.length}</b> Follower
                        </>
                      ) : (
                        <>
                          <b>{fdata.length}</b> Following
                        </>
                      )}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mutual">
                      {fdata.length > 0 && (
                        <div className="containermFriendsd">
                          {fdata.map((el) => (
                            <div className="mFriends">
                              <img src={el.ProfilePic} alt="" />
                              <Link to={`/profile/${el.id}`}>
                                <span data-bs-dismiss="modal">{el.name}</span>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
