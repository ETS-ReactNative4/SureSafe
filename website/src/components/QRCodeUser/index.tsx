import { lazy } from "react";
import { SvgIcon } from "../../common/SvgIcon";
import { Main } from "./styles";
const QRCode = require("qrcode.react");

const QrcodeUser = ({ elementID, data }: any) => {
  return (
    <div
      id={elementID}
      style={{
        width: "500px",
        height: "800px",
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
      <SvgIcon src="SureSafeLogo.png" width="200px" height="50px" />
      <p
        style={{
          color: "#223141",
          fontFamily: "Gilroy Extrabold",
          fontSize: "30px",
          margin: 0,
          padding: 0,
          marginTop: "40px",
        }}
      >
        {`${data?.firstName} ${data?.lastName}`.toUpperCase()}
      </p>
      <p
        style={{
          color: "#223141",
          fontFamily: "Gilroy Light",
          fontSize: "18px",
          margin: 0,
          padding: 0,
        }}
      >
        {`${data?.barangay}, ${data?.municipality}`}
      </p>
      <p
        style={{
          color: "#4ABEC6",
          fontFamily: "Gilroy Bold",
          fontSize: "18px",
          margin: 0,
          padding: 0,
          marginBottom: "20px",
        }}
      >
        {`+63${data?.number}`}
      </p>
      <div
        style={{
          height: "300px",
          width: "300px",
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
            value={data?._id || 0}
            size={250}
            bgColor={"#ffffff"}
            fgColor={"#223141"}
            level={"H"}
            includeMargin={false}
            renderAs={"canvas"}
            imageSettings={{
              src: "./img/svg/Logo.png",
              x: null,
              y: null,
              height: 70,
              width: 70,
            }}
          />
        </div>
      </div>

      <h1
        style={{
          marginTop: "20px",
          marginBottom: "40px",
          color: "#63C9A8",
          fontFamily: "Gilroy Extrabold",
          fontSize: "30px",
        }}
      >
        Scan Me!
      </h1>
      <p style={{ fontSize: "15px", textAlign: "center" }}>
        {`Show this ID to any establishments that using the suresafe app! `}
      </p>
    </div>
  );
};

export default QrcodeUser;
