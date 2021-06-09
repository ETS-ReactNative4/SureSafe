import { lazy } from "react";
import { SvgIcon } from "../../common/SvgIcon";
import { Main } from "./styles";
const QRCode = require("qrcode.react");

const Qrcode = ({ elementID, name, id }: any) => {
  return (
    <div
      id={elementID}
      style={{
        width: "1000px",
        height: "1300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EFF3FA",
        padding: "50px",
        paddingLeft: "110px",
        paddingRight: "110px",
        paddingBottom: "80px",
        flexDirection: "column",
      }}
    >
      <SvgIcon src="SureSafeLogo.png" width="400px" height="100px" />
      <h1
        style={{
          marginTop: "120px",
          marginBottom: "80px",
          color: "#223141",
          fontFamily: "Gilroy Extrabold",
          fontSize: "70px",
        }}
      >
        {name}
      </h1>
      <div
        style={{
          height: "450px",
          width: "450px",
          backgroundColor: "#4ABEC6",
          borderRadius: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: 30,
            borderRadius: "20px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode
            value={id}
            size={300}
            bgColor={"#ffffff"}
            fgColor={"#223141"}
            level={"H"}
            includeMargin={false}
            renderAs={"canvas"}
            imageSettings={{
              src: "./img/svg/Logo.png",
              x: null,
              y: null,
              height: 100,
              width: 100,
            }}
          />
        </div>
      </div>

      <h1
        style={{
          marginTop: "20px",
          marginBottom: "80px",
          color: "#63C9A8",
          fontFamily: "Gilroy Extrabold",
          fontSize: "50px",
        }}
      >
        Scan Me!
      </h1>
      <p style={{ fontSize: "25px" }}>
        {`${name} is supporting SureSafe in preventing COVID-19 from
          spreading. Please Scan the QR Code above to log your visit Thank You!
          Stay Safe!`}
      </p>
    </div>
  );
};

export default Qrcode;
