import { Row, Col } from "antd";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";
import { notification } from "antd";

interface MiddleBlockProps {
  title: string;
  content: string;
  button: string;
  id: string;
}

const MiddleBlock = ({ title, content, button, id }: MiddleBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "On Progress",
      description: "Feature Coming Soon! WIP",
    });
  };
  return (
    <MiddleBlockSection id={id}>
      <Slide direction="up">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{title}</h6>
              <Content>{content}</Content>
              {button && (
                <Button
                  name="submit"
                  onClick={() => openNotificationWithIcon()}
                >
                  {button}
                </Button>
              )}
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </MiddleBlockSection>
  );
};

export default MiddleBlock;
