import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import VisitsContent from "../../content/VisitsContent.json";
import ShareDataContent from "../../content/ShareDataContent.json";
import QRCodeContent from "../../content/QRCodeContent.json";
import UserContent from "../../content/UserContent.json";

const Generator = lazy(() => import("../../components/Generator"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const UserRegister = lazy(() => import("../../components/UserRegister"));

const Register = () => {
  return (
    <Container>
      <ScrollToTop />
      {/* <ContentBlock
        type="right"
        title={IntroContent.title}
        content={IntroContent.text}
        // button={IntroContent.button}
        icon="First.png"
        id="intro"
      /> */}
      <UserRegister
        title={UserContent.title}
        content={UserContent.text}
        id="register user"
      />
      {/* <Generator
        title={QRCodeContent.title}
        content={QRCodeContent.text}
        id="qrcodegenerator"
      /> */}
    </Container>
  );
};

export default Register;
