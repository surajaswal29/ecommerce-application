import React, { useState } from "react";

// component imports
import Header from "../header/header"; //page header
import MetaData from "../metaData"; //set page title
import CheckoutSteps from "./CheckoutSteps"
import Footer from "../footer/footer";
// material UI icons
// import PinDropIcon from '@mui/icons-material/PinDrop';
// import HomeIcon from '@mui/icons-material/Home';
// import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
// import LocationCityIcon from '@mui/icons-material/LocationCity';
// import PublicIcon from '@mui/icons-material/Public';
// import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Redux imports
import { useDispatch, useSelector } from "react-redux";
//Redux Cart Action
import { saveShippingInfo } from "../../../actions/cartAction";

//country-state-city package
import { Country, State } from "country-state-city";

// CSS File
import "./Shipping.css";
import { useNavigate } from "react-router";

const Shipping = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length > 10 || phoneNo.length < 10) {
      alert("Phone Number should be 10 digits long");
      return;
    }

    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));

    navigate('/order/confirm');
  }

  return (
    <>
      <MetaData title="Shipping Information" />

      <Header />

      <div className="container">
        <CheckoutSteps activeStep={0} />
        <div className="row mt-2">
          <div className="col-md-12">
            <h2 className="shippingHeading">Shipping Details</h2>
          </div>
          <div className="col-md-12 p-2 pr-center">
            <form className="shippingForm border" encType="multipart/form-data" onSubmit={shippingSubmit}>
              {/* Home */}
              <div className="row mt-2">
                <div className="col-md-12">
                  <label>Address</label>
                  <input className="form-control" type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
              </div>

              {/* location */}
              <div className="row mt-2">
                <div className="col-md-12">
                  <label>City</label>
                  <input className="form-control" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
              </div>

              {/* PinDrop */}
              <div className="row mt-2">
                <div className="col-md-6">
                  <label>Pin Code</label>
                  <input className="form-control" type="number" placeholder="Pin Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label>Phone Number</label>
                  <input className="form-control" type="number" placeholder="Phone Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} size="10" required />
                </div>
              </div>

              {/* Country */}
              <div className="row mt-2">
                <div className="col-md-6">
                  <label>Country</label>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className="form-control" required>
                    <option value="">select country</option>
                    {
                      Country && Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))
                    }
                  </select>
                </div>


                {/* Country State */}
                {
                  country && (
                    <div className="col-md-6">
                      <label className="label">State</label>
                      <select required value={state} onChange={(e) => setState(e.target.value)} className="form-control">
                        <option value="">select state</option>
                        {
                          State && State.getStatesOfCountry(country).map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))
                        }
                      </select>
                    </div>

                  )
                }
              </div>
              <div className="row mt-2 mt-3">
                <div className="col-md-12">
                  <button type="submit" className="btn btn-dark">Continue <ArrowForwardIcon /></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
