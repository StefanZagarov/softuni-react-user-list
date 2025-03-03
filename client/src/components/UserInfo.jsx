import userService from "../services/userService";
import { useState, useEffect } from "react";
import { formatIsoDate } from "../utils/dateTimeUtil";

export default function UserInfo({ userId, onClose }) {

    // Save the user in a state - begin with an empty object
    const [user, setUser] = useState({});

    // Get the user - since we depend on the userInfo state, we need to add it as a dependency: If the userId changes, then we need to re-fetch the user and re-render the shown data
    useEffect(() => {
        userService.getOne(userId)
            .then(result => setUser(result))
            .catch(err => console.log(err));
    }, [userId]);

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modal">
                <div className="detail-container">
                    <header className="headers">
                        <h2>User Detail</h2>
                        <button className="btn close" onClick={onClose}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                                className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                                </path>
                            </svg>
                        </button>
                    </header>
                    <div className="content">
                        <div className="image-container">
                            <img src={user.img} alt=""
                                className="image" />
                        </div>
                        <div className="user-details">
                            <p>User Id: <strong>{user._id}</strong></p>
                            <p>
                                Full Name:
                                <strong> {user.firstName} {user.lastName} </strong>
                            </p>
                            <p>Email: <strong>{user.email}</strong></p>
                            <p>Phone Number: <strong>{user.phoneNumber}</strong></p>
                            <p>
                                Address:
                                <strong>
                                    {/* {user.address.country} {user.address.city} {user.address.street} {user.address.streetNumber} */}
                                </strong>
                            </p>

                            <p>Created on: <strong>{formatIsoDate(user.createdAt)}</strong></p>
                            <p>Modified on: <strong>{formatIsoDate(user.updatedAt)}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
