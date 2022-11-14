import React from "react";
import { Button } from '@mui/material';
import { useFormikContext } from "formik";

function ButtonWrapper({children,...otherProps}){

  const { submitForm }=useFormikContext()

  function handleSubmit(){
    submitForm()
  }

  const configButton ={
    ...otherProps,
    onClick: handleSubmit,
    color: "primary",
    variant: "contained",
  }

  return(
    <Button {...configButton}>{children}</Button>
  )
}
export default ButtonWrapper