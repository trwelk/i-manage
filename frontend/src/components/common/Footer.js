import React from "react";
import {
Box
} from "./FooterStyles";

const Footer = () => {
return (
    <Box>
      <h3 style={{ color: "#ff8b80", 
                   textAlign: "center", 
                   marginTop: "-10px" }}>
        Shan.eryn_ Sewing Room
      </h3>
      <footer
       style={{ color: "#fff", 
       textAlign: "center", 
       marginTop: "-10px" }}>
           &copy; Copyright 2021 Shan.eryn_ Sewing Room
        </footer>
    </Box>
);
};
export default Footer;
