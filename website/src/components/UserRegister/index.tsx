import { useState } from "react";
import { Row, Col } from "antd";
import { Slide, Zoom } from "react-awesome-reveal";
import FormData from "form-data";
import axios from "axios";
import { GeneratorProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";
import Block from "../Block";
import Input from "../../common/Input";
import { GeneratorContainer, FormGroup, Span, ButtonContainer } from "./styles";
import QrcodeUser from "../QRCodeUser";
import { notification } from "antd";
const saveAs = require("file-saver");
const domtoimage = require("dom-to-image");

const UserRegister = ({ title, content, id }: GeneratorProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [validId, setValidId] = useState<any | null>();
  const [picture, setPicture] = useState<any | null>("");

  const handleSubmit = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("number", number);
    form.append("municipality", municipality);
    form.append("barangay", barangay);
    form.append("validId", validId[0]);
    form.append("picture", picture[0]);

    axios({
      method: "post",
      url: `http://localhost:8082/suresafe/api/users/create`,
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
    }).then(async (resData) => {
      console.log(resData);
      setData(resData.data.data);
      let node = document.getElementById("qrcodeuser");
      await domtoimage.toBlob(node).then((blob: any) => {
        const myBlob = new Blob([blob], { type: "image/png" });

        const formnew = new FormData();
        formnew.append("qrcode", myBlob, `${resData.data.data._id}.png`);
        formnew.append("id", resData.data.data._id);
        axios({
          method: "post",
          url: `http://localhost:8082/suresafe/api/users/qrcode`,
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
      description: "Account successfully created!",
    });
  };

  return (
    <GeneratorContainer id={id}>
      <div style={{ overflow: "hidden", height: 0 }}>
        <QrcodeUser elementID="qrcodeuser" data={data} />
      </div>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
            <Col lg={15} md={11} sm={12} xs={24}>
              <SvgIcon src={"GeoTracing.png"} width="100%" height="100%" />
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
                <div style={{ display: "flex" }}>
                  <Input
                    type="text"
                    name="First Name"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    type="text"
                    name="Last Name"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                  type="file"
                  name="Valid ID"
                  placeholder="Valid ID"
                  value={validId}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    const data = target.files;
                    setValidId(data);
                  }}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="file"
                  name="Picture"
                  placeholder="Picture"
                  value={picture}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    const data = target.files;
                    setPicture(data);
                  }}
                />
              </Col>

              <ButtonContainer>
                <Button name="submit">
                  {loading ? "Loading.." : "Register Now"}
                </Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </GeneratorContainer>
  );
};

export default UserRegister;
