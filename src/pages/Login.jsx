import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { login, verify } from "../store/action/auth.action";
import { CLEAR_LOGIN_ERRORS } from "../store/constant";

function Login(props) {
  const dispatch = useDispatch();
  const [Loding, setLoding] = useState(false);
  const [isOtpSend, setisOtpSend] = useState(false);

  const [data, setData] = useState({
    email: "",
    otp: ""
  });

  const { loginerror, token } = useSelector(state => state.auth)

  useEffect(() => {
    if (loginerror.loginerror !== "") {
      toast.error(loginerror.message);
      dispatch({ type: CLEAR_LOGIN_ERRORS });
    }
    if (token) {
      window.location.href = "/dashboard";
    }
    // eslint-disable-next-line
  }, [loginerror, token]);

  const InputEvent = (event) => {
    const { name, value } = event.target;

    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!data.email) {
      toast.error("Email must be provided");
    } else {
      setLoding(true);;
      const resp = await dispatch(login(data));
      setLoding(false);
      setisOtpSend(resp);

    }
  };


  const verifyOtpnumber = async (event) => {
    event.preventDefault();
    if (!data.otp) {
      toast.error("Otp required");
    } else if (data.otp.length !== 6) {
      toast.error("Otp should be 6 digit");
    }
    else {
      dispatch(verify(data));
    }
  };


  return (
    <>
      <section id="login-page">
        <div className="login-card">
          <h1>Login here</h1>
          <form onSubmit={!isOtpSend ? onSubmit : verifyOtpnumber}>
            {
              !isOtpSend ? (
                <div className="form-group">
                  <label className="input-label" htmlFor="InputEmail">
                    Email address<span>*</span>
                  </label>
                  <div className="input-field">
                    <div className="icon">
                      <PermIdentityIcon />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={InputEvent}
                      className="form-control"
                      id="InputEmail"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label className="input-label" htmlFor="InputPassword">
                    Otp<span>*</span>
                  </label>
                  <div className="input-field">
                    <div className="icon">
                      <VpnKeyIcon />
                    </div>
                    <input
                      type="number"
                      name="otp"
                      value={data.otp}
                      onChange={InputEvent}
                      className="form-control"
                      id="InputPassword"
                      required
                    />
                  </div>
                </div>
              )
            }
            <Button type="submit" className="btn-submit" disabled={Loding}>{Loding ? "please wait..." : isOtpSend ? "Login" : "Get Otp"}</Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
