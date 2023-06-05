import React from "react"

export class UserDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        _id: "",
        username: "Bang",
        role: "Barista",
        fullName: "Mach Dieu Bang",
        email: "machdieubang2110@gmail.com",
        phone: "090",
        address: "TPHCM",
        picture: "",
      },
      isEditing: false,
      isEmailEditable: false,
    }
  }
  componentDidMount() {
    fetch("https://unacoffeeshopbe.onrender.com/api/data/getProfileData")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          profileData: data.find((profile) => profile.ProfileID === 1),
          isLoading: false,
        })
      })
      .catch((error) => {
        this.setState({
          error: "Error occurred while fetching profile data",
          isLoading: false,
        })
      })
  }

  handleInputChange = (event) => {
    const { name, value } = event.target
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }))
  }

  handleEdit = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }))
  }
  validateInputs = () => {
    const { phone, email, fullName, address } = this.state.user
    let isValid = true

    if (phone !== "" && !/^\d+$/.test(phone)) {
      isValid = false
      window.alert("error", "Invalid phone number")
    }

    if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false
      window.alert("error", "Invalid email address")
    }

    if (fullName === "" && fullName.trim() === "") {
      isValid = false
      window.alert("error", "Full name cannot be empty")
    }

    if (fullName === "" && address.trim() === "") {
      isValid = false
      window.alert("error", "Address cannot be empty")
    }

    return isValid
  }

  handleSave = async () => {
    if (this.validateInputs()) {
      const { user } = this.profileData[1]
      const { Type, Name, email, phone, Address } = user
      const updatedUser = {
        ProfileID: "3", // Generate a random profile ID
        Type,
        Name,
        ImageURL: "", // You can modify this if needed
        Password: "", // You can modify this if needed
        Address,
        Rating: 0, // You can modify this if needed
      }
      fetch(
        `https://unacoffeeshopbe.onrender.com/api/data/addProfileData${updatedUser.ProfileID}/${updatedUser.Type}/${updatedUser.Name}/${updatedUser.ImageURL}/${updatedUser.Password}/${updatedUser.Address}/${updatedUser.Rating}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Content-Security-Policy":
              "default-src 'self'; script-src 'self'; object-src 'none'; style-src 'self'; img-src 'self'; media-src 'self'; frame-src 'none'; font-src 'self'; connect-src 'self'",
          },
          body: JSON.stringify(updatedUser),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data) {
            localStorage.setItem("user", JSON.stringify(updatedUser))
            this.setState({ isEditing: false, isEmailEditable: false })
            window.alert("Saved User Profile Successsfully.")
          } else {
            // Failed to create user
            console.log("Failed to create user")
            window.alert("Failed to create user. Please try again.")
            throw new Error("Failed to create user")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
  }

  render() {
    const { profileData, isLoading, error } = this.state
    if (isLoading) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>{error}</p>
    }
    if (!profileData) {
      return <p>Profile not found</p>
    }
    const { isEditing } = this.state
    const { picture, email, phone } = this.state.user

    const { Name, ImageURL, Address, Type } = profileData

    return (
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              {!picture || picture === "" ? (
                <img
                  src={ImageURL}
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

              <h5 className="my-3">{Name}</h5>
              <p className="text-muted mb-1">{Type}</p>
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
                  <p className="text-muted mb-0">{Name}</p>
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
                      value={Type}
                      onChange={this.handleRoleChange}
                    >
                      <option value="customer">Customer</option>
                      <option value="staff">Staff</option>
                      <option value="barista">Barista</option>
                    </select>
                  ) : (
                    <p className="text-muted mb-0">{Type}</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="row">
                {isEditing ? (
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
                      value={Name}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p className="text-muted mb-0">{Name}</p>
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
                      value={Address}
                      onChange={this.handleInputChange}
                    />
                  ) : (
                    <p className="text-muted mb-0">{Address}</p>
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
