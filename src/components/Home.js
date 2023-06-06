import "./Home.css" //check style again

import React, { Component } from "react"

export class Home extends Component {
  static displayName = Home.name
  // Language
  getLocaleMessages(locale) {
    switch (locale) {
      case "vn":
        return require("../lang/vn.json")
      default:
        return require("../lang/en.json")
    }
  }
  render() {
    return (
      <div className="container">
        {/* Header */}
        <header className="hero-image">
          <div className="hero-content text-center">
            <h1>Welcome to Coffee Shop</h1>
            <p>Enjoy the finest coffee in town!</p>
            <a href="javascript:void(0)" className="btn btn-primary">
              View Menu
            </a>
          </div>
        </header>

        {/* Promoting Items */}
        <section className="mt-5">
          <h2 className="text-center">Promoting Items</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="promoting-item border p-4 rounded mb-4">
                <h3>Specialty Coffee</h3>
                <p>
                  Try our signature specialty coffee, made from the finest beans
                  and carefully crafted for perfection.
                </p>
                <a href="javascript:void(0)" className="btn btn-secondary">
                  Learn More
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="promoting-item border p-4 rounded mb-4">
                <h3>Delicious Pastries</h3>
                <p>
                  Pair your coffee with our delectable pastries, freshly baked
                  every day to satisfy your cravings.
                </p>
                <a href="javascript:void(0)" className="btn btn-secondary">
                  Learn MoreF
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <div className="promoting-item border p-4 rounded mb-4">
                <h3>Seasonal Specials</h3>
                <p>
                  Experience the flavors of the season with our handcrafted
                  seasonal specials, available for a limited time.
                </p>
                <a href="javascript:void(0)" className="btn btn-secondary">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mt-5">
          <h2 className="text-center">About Us</h2>
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://media.istockphoto.com/id/1306228354/vector/elderly-business-person-men-and-women-jumping.jpg?s=612x612&w=0&k=20&c=EXvOb5plzAwjZ5e-UHm4hYrnrGYbbiKkG2k7uqcy5hY="
                alt="Uncle and Aunt - Coffee Shop Owner"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                id consectetur elit. Curabitur lacinia magna in nisl varius, a
                tincidunt mauris efficitur. Nullam bibendum mauris a luctus
                faucibus.
              </p>
              <p>
                Phasellus malesuada, libero sit amet auctor aliquam, dolor urna
                tempus tortor, in consequat nulla eros id lectus. Vivamus nec
                elit et sapien interdum dictum a in sem.
              </p>
              <a href="javascript:void(0)" className="btn btn-secondary">
                Read More
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-5">
          <h2 className="text-center">Contact Us</h2>
          <div className="row">
            <div className="col-md-6">
              <p>
                For inquiries and reservations, please feel free to reach out to
                us. We are happy to assist you!
              </p>
              <ul>
                <li>Phone: 123-456-7890</li>
                <li>Email: info@coffeeshop.com</li>
                <li>Address: 123 Main Street, City, Country</li>
              </ul>
            </div>
            <div className="col-md-6">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-control" rows="4"></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg d-inline-block"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-5">
          <p>&copy; 2023 Coffee Shop. All rights reserved.</p>
        </footer>
      </div>
    )
  }
}
