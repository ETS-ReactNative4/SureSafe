import { useState } from "react";
import { Row, Col } from "antd";
import { Slide, Zoom } from "react-awesome-reveal";
import { GeneratorProps, ValidationTypeProps } from "./types";
import FormData from "form-data";
import axios from "axios";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";
import Block from "../Block";
import Input from "../../common/Input";
import { GeneratorContainer, FormGroup, Span, ButtonContainer } from "./styles";
import QRCode from "../Qrcode";
import { notification } from "antd";
const saveAs = require("file-saver");
const domtoimage = require("dom-to-image");

const Generator = ({ title, content, id }: GeneratorProps) => {
  // const { values, errors, handleChange, handleSubmit } = useForm(
  //   validate
  // ) as any;

  // const ValidationType = ({ type }: ValidationTypeProps) => {
  //   const ErrorMessage = errors[type];
  //   return (
  //     <Zoom direction="left">
  //       <Span erros={errors[type]}>{ErrorMessage}</Span>
  //     </Zoom>
  //   );
  // };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);

    axios({
      method: "post",
      url: `http://localhost:8082/suresafe/api/establishment/add`,
      data: JSON.stringify({
        email,
        password,
        name,
        number,
        municipality,
        barangay,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(async (resData: any) => {
      console.log(resData);
      setData(resData.data.data);
      let node = document.getElementById("qrcode");
      await domtoimage.toBlob(node).then((blob: any) => {
        const myBlob = new Blob([blob], { type: "image/png" });

        const formnew = new FormData();
        formnew.append("qrcode", myBlob, `${resData.data.data._id}.png`);
        formnew.append("id", resData.data.data._id);
        formnew.append("number", resData.data.data.number);
        axios({
          method: "post",
          url: `http://localhost:8082/suresafe/api/establishment/qrcode`,
          data: formnew,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(async (data) => {
          console.log(data);
          openNotificationWithIcon();
        });
      });
      setLoading(false);
    });
  };

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Success",
      description: "Account successfully created.",
    });
  };

  return (
    <GeneratorContainer id={id}>
      <div style={{ overflow: "hidden", height: 0 }}>
        <QRCode elementID="qrcode" data={data} />
      </div>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
            <Col lg={15} md={11} sm={12} xs={24}>
              <SvgIcon src={"Visits.png"} width="100%" height="100%" />
            </Col>
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="left">
            <FormGroup
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Col span={24}>
                <Input
                  type="email"
                  name="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="password"
                  name="Password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="Establishment Name"
                  placeholder="Establishment Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <Input
                    type="text"
                    name="Municipality"
                    placeholder="Municipality"
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                  />
                  <Input
                    type="text"
                    name="Barangay"
                    placeholder="Barangay"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                  />
                </div>
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="Number"
                  placeholder="Contact Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Col>

              <ButtonContainer>
                <Button name="submit">
                  {loading ? "Loading.." : "Create Now"}
                </Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </GeneratorContainer>
  );
};

export default Generator;
