import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import VisitsContent from "../../content/VisitsContent.json";
import ShareDataContent from "../../content/ShareDataContent.json";
import QRCodeContent from "../../content/QRCodeContent.json";
import ExposedAlerts from "../../content/ExposedAlerts.json";

const Generator = lazy(() => import("../../components/Generator"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        type="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        icon="First.png"
        id="intro"
      />
      <MiddleBlock
        title={MiddleBlockContent.title}
        content={MiddleBlockContent.text}
        button={MiddleBlockContent.button}
        id="download"
      />
      <ContentBlock
        type="left"
        title={AboutContent.title}
        content={AboutContent.text}
        section={AboutContent.section}
        icon="GeoTracing.png"
        id="about"
      />
      <ContentBlock
        type="right"
        title={VisitsContent.title}
        content={VisitsContent.text}
        icon="Visits.png"
        id="visits"
      />
      <ContentBlock
        type="left"
        title={ShareDataContent.title}
        content={ShareDataContent.text}
        icon="ShareData.png"
        id="sharedata"
      />
      <ContentBlock
        type="right"
        title={ExposedAlerts.title}
        content={ExposedAlerts.text}
        icon="ExposedAlerts.png"
        id="exposedalert"
      />
      {/* <Generator
        title={QRCodeContent.title}
        content={QRCodeContent.text}
        id="qrcodegenerator"
      /> */}
    </Container>
  );
};

export default Home;
