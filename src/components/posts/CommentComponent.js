import dayjs from "dayjs";

let titleStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const CommentComponent = (props) => {
  const {
    comment: { userHandle, body, createdAt, userImage },
  } = props;

  return (
    <div
      className="comment-container"
      style={{ backgroundColor: "white", color: "black" }}
    >
      <div className="header" style={titleStyle}>
        <img
          src={userImage}
          alt={userHandle}
          style={{ width: "50px", height: "auto" }}
        />
        <h3 style={{ marginLeft: "1rem" }}>{userHandle}</h3>
      </div>
      <div>{body}</div>
      <span>{dayjs(createdAt).format("MMM YYYY")}</span>
    </div>
  );
};

export default CommentComponent;
