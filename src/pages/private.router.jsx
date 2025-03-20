import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRouter = (props) => {
  const { user } = useContext(AuthContext);
  if (user.id && user) {
    return <>{props.children}</>;
  } else
    return (
      <>
        <Result
          status="404"
          title="Oops!"
          subTitle="Ban can dang nhap"
          extra={
            <Button type="primary">
              <Link to="/">
                <span>Back to homepage</span>
              </Link>
            </Button>
          }
        />
      </>
    );
};

export default PrivateRouter;
