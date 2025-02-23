import {Drawer } from "antd";

const ViewUserDetail = (props) => {
  const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

  console.log(dataDetail);
  return (
    <>
      <Drawer
        title="Basic Drawer"
        onClose={() => {
          setDataDetail(null);
          setIsDetailOpen(false);
        }}
        open={isDetailOpen}>
        {dataDetail ? (
          <>
            <p>Id: {dataDetail._id}</p>
            <p>Full Name: {dataDetail.fullName}</p>
            <p>Email: {dataDetail.email}</p>
            <p>Phone: {dataDetail.phone}</p>
          </>
        ) : (
          <p>No data</p>
        )}
      </Drawer>
    </>
  );
};

export default ViewUserDetail;
