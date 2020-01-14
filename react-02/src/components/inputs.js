import React from "react";
const inputs = {

  Button(props) {
    const {id, name, label, callbacks, setInputs, classes} = props
    return(
      <button 
        key={id}
        name={name}
        onClick={(e) => inputs.handleClick(e, callbacks, setInputs)} 
        className={classes}
      >
        {label}
      </button>
  )},

  handleClick(e, callbacks, setState) {
    try {
      setState(
        callbacks[e.target.name].f(
          ...callbacks[e.target.name].p
        )
      );
    } catch (error) {
      console.log(error);
    };
  },

  Input(props) {
    const {id, name, type, inputs, setInputs, classes} = props
    return (
      <div>
        <span>{name}: </span>
        <input
          key={id}
          name={name}
          type={type}
          value={inputs[name]}
          onChange={(e) => inputs.handleInputChange(e, setInputs)}
          onBlur={(e) => inputs.handleInputChange(e, setInputs)}
          className={classes}
        ></input>
      </div>
    );
  },

  handleInputChange(e, setInputs) {
    setInputs(state => ({...state, [e.target.name]: e.target.value}));
  },

};

export default inputs;