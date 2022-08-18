import "../styles/Header.css";

function Header() {
  return (
    <div className="Header">
      <a href="/" className="image_link">
        <img
          src="./images/rubriklogo.jpg"
          className="rubrik_logo"
          alt="Rubrik"
        />
      </a>
      <h1> Azure Subscriptions Management</h1>
    </div>
  );
}
export default Header;
