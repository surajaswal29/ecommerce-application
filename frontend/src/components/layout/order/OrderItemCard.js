import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ConfirmItemCard = ({ item }) => {

  const {user} = useSelector((state)=>state.user);

  return (
    <>
    <div className="order-card-wrapper mb-5">
      <div className="order-header-wrap">
          <div className="row">
              <div className="col-md-2">
                  <p className="od-text">ORDER PLACED</p>
                  <p className="od-text">{String(item.createdAt).split("T")[0]}</p>
              </div>
              <div className="col-md-2">
                  <p className="od-text">Total</p>
                  <p className="od-text">₹ {item.totalPrice.toFixed(2)}</p>
              </div>
              <div className="col-md-2">
                  <p className="od-text">SHIP TO</p>
                  <p className="od-text"><strong>{user.name}</strong></p>
              </div>
              <div className="col-md-6">
                  <p className="od-text text-end">ORDER ID: <strong>{item._id}</strong></p>
                  <p className="od-text text-end">
                    <Link to={`/order/${item._id}`}>View  Order details</Link> | &nbsp;
                    <Link to={`/order/invoice`}>Invoice</Link>
                  </p>
              </div>
          </div>
      </div>
      <div className="item-wrapper">
      {
        item.orderItems.map((productItems)=>(
          <div className="item-wrapper item-wrapper-inner d-flex" key={productItems._id}>
              <div className="item-img">
                <img src={productItems.images} alt="product" />
              </div>
              <div className="item-name">
                <span>{productItems.name}</span>
                <br />
                <span>
                  Product ID{" "}
                  <Link to={`/product/${productItems.product}`}>{productItems.product}</Link>
                </span>
              </div>
              <div className="item-quantity-price d-flex justify-content-between">
                <span>Quantity: {productItems.quantity}</span>
                <span>
                  <strong>
                    {(productItems.quantity * productItems.price).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </strong>
                </span>
              </div>
          </div>
        ))
      }
      <h5 className="text-success">Order Status: {item.orderStatus}</h5>
      </div>
    </div>
    </>
  );
};

export default ConfirmItemCard;
