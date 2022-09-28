import React, { useState, useEffect } from "react";
import { logIn } from "../../../actions/user";
import { useNavigate } from "react-router-dom";
import { Formik,Form } from 'formik';
import { Grid,IconButton,InputAdornment } from '@mui/material';
import TextField  from '../TextField.form';
import Button from "../submit.btn";
import {Visibility,VisibilityOff} from '@mui/icons-material';
import { errToster,toster} from '../../../actions/toastAlert';
import style from './login.module.css';
import { validationSchema } from "./login.validate";

function LogIn(props){

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  useEffect(()=>console.log("login"))

  useEffect(() => {if(props.user) navigate("/")})

  async function handleClick(values){
      const res = await logIn(values)
      if(res.errMsg)return console.log("errMsg",res)
      if(res !== "err") {
        props.setUser(res);
        navigate('/')
        toster("successfully logIn")
        }
      else errToster("couldn't logIn")
  }
  return(
      <div className={style.body}>
      <div className={style.main_container}>
        <div className={style.container}>
          <h1>Login</h1>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              email: "",
              password: ""
          }}
            onSubmit={values => handleClick(values)}
          >            
            <Form>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField 
                    name="email"
                    label="email"
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField 
                    name="password"
                    label="password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button>submit</Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
          <p>still not signIn?</p>
          <p>register <a onClick={() => navigate('/signup')}>here</a></p>
        </div>
        </div>
      </div>
  )
}
export default LogIn