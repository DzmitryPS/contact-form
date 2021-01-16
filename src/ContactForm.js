import React, { useState } from "react";
import styled from "styled-components";

/* here i play with styled components */
/* SYNTAX: const SomeName = styled.something`some css bullshit` */
/* step 1: i want all divs that are red */
/* const StyledDiv = styled.div `
background-color: red;` */
/* step 2: i want red-green-red */
/* const StyledDivRed = styled.div`
  background-color: red;
`;
const StyledDivGreen = styled.div`
  background-color: green;
`; */
/* step 3: i dont like writing 2 components just for a stupid background. i want a component that is sometimes red and sometimes green */
const StyledDiv = styled.div`
  /* explanation */
  /* background-color: sometimes red and sometimes green; */
  /* part 1 */
  /* background-color: $props => props.color === "red" && "red"};
  background-color: $props => props.color === "green" && "green"}; */
  /* final part */ /* my default color is yellow. but i sometimes want red or blue */

  /* nested teiko version  */

  /*   background-color: $p =>
    p.color === "red" 
        ? "red" 
        : p.color === "green" 
            ? "green" 
            : "yellow"}; */

  /* if you have 1000colors and dont like nesting stuff teiko style do this */
  background-color: ${p => {
    switch (p.color) {
      case "red":
        return "red";
        break;
      case "green":
        return "green";
        break;
      default:
        return "yellow";
    }
  }};
`;
/* yuri exercise */
/* i want you to style me some text. what i want:
name label       text shoud look good in aqua   i want this text to be 24px  
email label      text shoud look good in red    this should be 24 px         
message label    text shoud look good in blue   this should be 24        
button text      text should be black           i want super big text. 50px
*/

const MyTeacherIsBeautiful = styled.p`
  color: ${p => {
    switch (p.color) {
      case "red":
        return "red";
        break;
      case "blue":
        return "blue";
        break;
      case "black":
        return "black";
        break;
      default:
        return "aqua";
    }
  }};
  font-size: ${p => (p.size === "SUPERBIG" ? "50px" : "24px")};
  /* extra: if i have a big text i think it is important. so i want it to be bold */
  font-weight: ${p => p.size === "SUPERBIG" && "bold"};
`;

const ContactForm = () => {
  const [status, setStatus] = useState("Submit"); //this is the initial text of the button
  const handleSubmit = async e => {
    //what happens if i cick on the button
    e.preventDefault(); //no refresh
    setStatus("Sending..."); //change the thext (line4) to sending
    const { name, email, message } = e.target.elements;
    let details = {
      //put what user wrote inside an object called details
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:5000/contact", {
      //after i got some data send them to the backend (but backend is not ready yet. we will work on it later)
      //localhost5000 will store our backend. here we are just saying to send some stuff to back end. but back end DOES NOT KNOW what to do with those stuff for now
      method: "POST", // i am sending some stuff to be
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details), //im sending details as a json.stringify
    });
    setStatus("Submit");
    let result = await response.json(); //backend is sending something back to me. i want to look at it
    alert(result.status); //and i want to alert something that is inside .status of it (i still need to write it in the backend part, but it will be the message of me saying "message sent :D")
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledDiv color="red">
        {/* i dont neet this div but i like it and copypasted it. lets keep it for now */}
        <label htmlFor="name">
          <MyTeacherIsBeautiful>Name:</MyTeacherIsBeautiful>
        </label>
        <input type="text" id="name" required />
      </StyledDiv>
      <StyledDiv color="green">
        <label htmlFor="email">
          <MyTeacherIsBeautiful color="red">Email:</MyTeacherIsBeautiful>
        </label>
        <input type="email" id="email" required />
      </StyledDiv>
      <StyledDiv>
        <label htmlFor="message">
          <MyTeacherIsBeautiful color="blue">Message:</MyTeacherIsBeautiful>
        </label>
        <textarea id="message" required />
      </StyledDiv>
      <button type="submit">
        <MyTeacherIsBeautiful color="black" size="SUPERBIG">
          {status}
        </MyTeacherIsBeautiful>
      </button>
    </form>
  );
};

export default ContactForm;
