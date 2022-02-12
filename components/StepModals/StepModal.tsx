import React, { useState } from "react";
import { useForm, useStep } from "react-hooks-helper";
import  Agreement from "./Agreement";
import  Checkout from "./Checkout";

const defaultData = {
  data: ""
}

const steps:any = [
  { id: ''},
  { id: 'Agreement'},
  { id: 'Checkout'}
]

function OutputStepModels(props) {
  const [show, setShow] = useState(false);
  const [formData, setForm] = useForm(defaultData);
  const {  navigation } = useStep ({
    steps, 
    initialStep:0
  });
  props = { formData, setForm, navigation, show, setShow }
  switch (steps.id) {
    case "Agreement": 
        return <Agreement {...props} />;
    case "Checkout":
        return <Checkout {...props} />;
    default: 
        return <Agreement {...props} />;
  }
}
export default OutputStepModels;