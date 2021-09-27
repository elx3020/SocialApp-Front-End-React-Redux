import "../../styles/Card.css";
import NoImage from "../../images/no-img.png";

const HomeSkeletal = () => {
  const content = Array.from({ length: 5 }, (item, index) => (
    <div className="card-container" key={index}>
      <div className="card-head">
        <div id="user-image">
          <img src={NoImage} alt="userImage" />
        </div>
        <div className="fill-bar"></div>
        <div id="toggle"></div>
      </div>
      <div className="card-content">
        <div className="fill-bar"></div>
        <div className="fill-bar short"></div>
        <div className="fill-bar short"></div>
        <div className="fill-bar content"></div>
      </div>
      <div className="card-footer">
        <div className="likes-section">
          <p>
            <i className="fas fa-heart"></i> 0
          </p>
        </div>
        <span>
          <i className="fas fa-comments"></i> Comments: 0
        </span>
      </div>
    </div>
  ));

  return content;
};

export default HomeSkeletal;
