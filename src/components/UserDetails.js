import React from "react"

export class UserDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        _id: "",
        username: "",
        role: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        picture: "",
      },
      isEditing: false,
      isEmailEditable: false,
    }
  }
  render() {
    const { username, role, fullName, email, phone, address, picture } =
      this.state.user
    const { isEditing, isEmailEditable } = this.state

    return (
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              {!picture || picture === "" ? (
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
              ) : (
                <img
                  src={picture}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
              )}

              <h5 className="my-3">{username}</h5>
              <p className="text-muted mb-1">{role}</p>
              {!isEditing && (
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleEdit}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Username</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{username}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Role</p>
                </div>
                <div className="col-sm-9">
                  {isEditing ? (
                    <select
                      className="form-select"
                      value={role}
                      onChange={this.handleRoleChange}
                    >
                      <option value="customer">Customer</option>
                      <option value="staff">Staff</option>
                      <option value="barista">Barista</option>
                    </select>
                  ) : (
                    <p className="text-muted mb-0">{role}</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                {isEditing && isEmailEditable ? (
                  <>
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{email}</p>
                    </div>
                  </>
                )}
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={fullName}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p className="text-muted mb-0">{fullName}</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={phone}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p className="text-muted mb-0">{phone}</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Address</p>
                </div>
                <div className="col-sm-9">
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={address}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p className="text-muted mb-0">{address}</p>
                  )}
                </div>
              </div>
              {isEditing ? (
                <div className="row mt-4">
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
