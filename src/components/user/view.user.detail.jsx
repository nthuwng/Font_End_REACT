import { Drawer } from "antd";

const ViewUserDetail = (props) => {
  const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetail } = props;

  console.log(dataDetail);
  return (
    <>
      <Drawer
        width={"40vw"}
        title="Basic Drawer"
        onClose={() => {
          setDataDetail(null);
          setIsDetailOpen(false);
        }}
        open={isDetailOpen}>
        {dataDetail ? (
          <>
            <p>Id: {dataDetail._id}</p>
            <br />
            <p>Full Name: {dataDetail.fullName}</p>
            <br />
            <p>Email: {dataDetail.email}</p>
            <br />
            <p>Phone: {dataDetail.phone}</p>
            <br />
            <p>Avatar:</p>
            <img
              height={"100"}
              width={"150"}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
                dataDetail.avatar
              }`}
              alt=""
            />
            <div>
              <label
                htmlFor="BtnUpload"
                style={{
                  display: "block",
                  width: "fit-content",
                  marginTop: "15px",
                  padding: "5px 10px",
                  background: "orange",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}>
                Upload Avatar
              </label>
              <input type="file" id="BtnUpload" hidden />
            </div>
          </>
        ) : (
          <p>No data</p>
        )}
      </Drawer>
    </>
  );
};

export default ViewUserDetail;
