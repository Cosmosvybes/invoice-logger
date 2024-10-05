import { Container } from "reactstrap";
import BreadCrumb from "../../../Tools/Layout/BreadCrumb";
import { ConnectKitButton } from "connectkit";

const Subscription = () => {
  return (
    <>
      <BreadCrumb title="Subscriptions" useLink={false} linkTitle="" />
      <Container fluid={true}>
        <ConnectKitButton
          customTheme={{
            "--ck-accent-color": "#00D54B",
            "--ck-accent-text-color": "#ffffff",
          }}
        />
      </Container>
    </>
  );
};

export default Subscription;
