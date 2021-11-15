import { useState } from "react";
import { Row, Col } from "antd";
import { Slide, Zoom } from "react-awesome-reveal";
import { GeneratorProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
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
  const [address, setAddress] = useState("");
  const [estabID, setEstabID] = useState("");
  const handleSubmit = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        responseType: "json",
      },
      body: JSON.stringify({
        estabName: name,
        estabAddress: address,
      }),
    };

    const response = await fetch(
      `http://localhost:8082/suresafe/api/establishment/add`,
      options
    );
    const resData = await response.json();
    setEstabID(resData.data._id);
    let node = document.getElementById("qrcode");
    await domtoimage.toPng(node).then((imgData: any) => {
      saveAs(imgData, `${name} QR Code.png`);
      openNotificationWithIcon();
    });
  };

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Success",
      description: "QR Code successfully created!",
    });
  };

  return (
    <GeneratorContainer id={id}>
      <div style={{ overflow: "hidden", height: 0 }}>
        <QRCode elementID="qrcode" name={name} id={estabID} />
      </div>
      <Row justify="space-between" align="middle">
        <Col lg={12} md={11} sm={24} xs={24}>
          <Slide direction="left">
            <Block title={title} content={content} />
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right">
            <FormGroup
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Col span={24}>
                <Input
                  type="text"
                  name="Name"
                  placeholder="Establishment Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="text"
                  name="Address"
                  placeholder="Establishment Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Col>

              <ButtonContainer>
                <Button name="submit">{"Generate"}</Button>
              </ButtonContainer>
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </GeneratorContainer>
  );
};

export default Generator;
