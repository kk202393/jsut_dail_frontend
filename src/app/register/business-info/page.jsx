"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { handleSuccess, handleError } from "../../utils/Utils";

export default function BusinessInfo() {
  const router = useRouter();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [businessData, setBusinessData] = useState({
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      geoLocation: { lat: "", lng: "" },
    },
    contact: {
      phone: "",
      email: "",
      website: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child, grandchild] = name.split(".");
      if (grandchild) {
        setBusinessData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [grandchild]: value,
            },
          },
        }));
      } else {
        setBusinessData((prev) => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value,
          },
        }));
      }
    } else {
      setBusinessData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const detectLocation = () => {
    setIsLoadingLocation(true);

    if (!navigator.geolocation) {
      handleError("Geolocation is not supported by this browser");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setBusinessData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            geoLocation: {
              lat: position.coords.latitude.toString(),
              lng: position.coords.longitude.toString(),
            },
          },
        }));
        handleSuccess("Location detected successfully!");
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        handleError("Unable to detect location. Please try again.");
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const validateForm = () => {
    // Business name validation
    if (!businessData.name.trim()) {
      handleError("Business name is required");
      return false;
    }

    // Address validation
    if (!businessData.address.street.trim()) {
      handleError("Street address is required");
      return false;
    }
    if (!businessData.address.city.trim()) {
      handleError("City is required");
      return false;
    }
    if (!businessData.address.state.trim()) {
      handleError("State is required");
      return false;
    }
    if (!/^\d{6}$/.test(businessData.address.pincode)) {
      handleError("Pincode must be exactly 6 digits");
      return false;
    }

    // Contact validation
    if (!/^\d{10}$/.test(businessData.contact.phone)) {
      handleError("Business phone number must be exactly 10 digits");
      return false;
    }
    if (!businessData.contact.email.trim()) {
      handleError("Business email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessData.contact.email)) {
      handleError("Please enter a valid business email");
      return false;
    }
    if (!businessData.contact.website.trim()) {
      handleError("Website is required");
      return false;
    }

    // Website URL validation
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    if (!urlPattern.test(businessData.contact.website)) {
      handleError("Please enter a valid website URL");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // TODO: Add API call here to save business information
      console.log("Business data to save:", businessData);

      handleSuccess("Business information saved successfully!");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error saving business information:", error);
      handleError("Error saving business information");
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url('/img/auth-bg.png')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#ffe8ee",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="authWrap">
              <div className="authhead">
                <div className="text-center mb-4">
                  <Link href="/">
                    <Image
                      className="img-fluid"
                      src="/img/icon.png"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "55px", height: "auto" }}
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="authbody d-black mb-4">
                <div className="card rounded-4 p-sm-5 p-4">
                  <div className="card-body p-0">
                    <div className="text-center">
                      <h1 className="mb-2 fs-2">Business Information</h1>
                      <p className="text-muted">
                        Complete your business profile to get started
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-5 text-start">
                      <div className="form mb-5">
                        {/* Business Name */}
                        <div className="form-group form-border">
                          <label className="form-label">Business Name</label>
                          <input
                            type="text"
                            required
                            value={businessData.name}
                            onChange={handleChange}
                            name="name"
                            className="form-control"
                            placeholder="Enter your business name"
                          />
                        </div>

                        {/* Address Section */}
                        <div className="mb-4">
                          <h5 className="mb-3">Business Address</h5>

                          <div className="form-group form-border">
                            <label className="form-label">Street Address</label>
                            <input
                              type="text"
                              required
                              value={businessData.address.street}
                              onChange={handleChange}
                              name="address.street"
                              className="form-control"
                              placeholder="Enter street address"
                            />
                          </div>

                          <div className="form-group form-border">
                            <label className="form-label">City</label>
                            <input
                              type="text"
                              required
                              value={businessData.address.city}
                              onChange={handleChange}
                              name="address.city"
                              className="form-control"
                              placeholder="Enter city"
                            />
                          </div>

                          <div className="form-group form-border">
                            <label className="form-label">State</label>
                            <input
                              type="text"
                              required
                              value={businessData.address.state}
                              onChange={handleChange}
                              name="address.state"
                              className="form-control"
                              placeholder="Enter state"
                            />
                          </div>

                          <div className="form-group form-border">
                            <label className="form-label">Pincode</label>
                            <input
                              type="text"
                              required
                              value={businessData.address.pincode}
                              onChange={handleChange}
                              name="address.pincode"
                              className="form-control"
                              placeholder="Enter 6 digit pincode"
                              maxLength="6"
                            />
                          </div>

                          {/* Geolocation */}
                          <div className="form-group form-border">
                            <label className="form-label">
                              Location Coordinates
                            </label>
                            <div className="d-flex gap-2 align-items-end">
                              <div className="flex-fill">
                                <input
                                  type="text"
                                  value={businessData.address.geoLocation.lat}
                                  onChange={handleChange}
                                  name="address.geoLocation.lat"
                                  className="form-control"
                                  placeholder="Latitude"
                                  readOnly
                                />
                              </div>
                              <div className="flex-fill">
                                <input
                                  type="text"
                                  value={businessData.address.geoLocation.lng}
                                  onChange={handleChange}
                                  name="address.geoLocation.lng"
                                  className="form-control"
                                  placeholder="Longitude"
                                  readOnly
                                />
                              </div>
                              <button
                                type="button"
                                onClick={detectLocation}
                                disabled={isLoadingLocation}
                                className="btn btn-outline-primary"
                                title="Detect Location"
                              >
                                {isLoadingLocation ? (
                                  <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                ) : (
                                  <FaLocationDot />
                                )}
                              </button>
                            </div>
                            <small className="text-muted">
                              Click the location button to auto-detect your
                              coordinates
                            </small>
                          </div>
                        </div>

                        {/* Contact Section */}
                        <div className="mb-4">
                          <h5 className="mb-3">Contact Information</h5>

                          <div className="form-group form-border">
                            <label className="form-label">Business Phone</label>
                            <input
                              type="tel"
                              required
                              value={businessData.contact.phone}
                              onChange={handleChange}
                              name="contact.phone"
                              className="form-control"
                              placeholder="Enter 10 digit phone number"
                              maxLength="10"
                            />
                          </div>

                          <div className="form-group form-border">
                            <label className="form-label">Business Email</label>
                            <input
                              type="email"
                              required
                              value={businessData.contact.email}
                              onChange={handleChange}
                              name="contact.email"
                              className="form-control"
                              placeholder="business@example.com"
                            />
                          </div>

                          <div className="form-group form-border">
                            <label className="form-label">Website</label>
                            <input
                              type="text"
                              required
                              value={businessData.contact.website}
                              onChange={handleChange}
                              name="contact.website"
                              className="form-control"
                              placeholder="https://www.yourbusiness.com"
                            />
                          </div>
                        </div>

                        <div className="form-group mb-4">
                          <button
                            type="submit"
                            className="btn btn-primary full-width fw-medium"
                          >
                            Complete Setup
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="authfooter">
                <div className="text-center">
                  <p className="text-dark mb-0">
                    Need help?{" "}
                    <Link href="/contact-us" className="fw-medium text-primary">
                      Contact Support
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
