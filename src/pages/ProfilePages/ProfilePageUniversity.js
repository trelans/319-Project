import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";
import img from "./image.png";

function ProfilePageUniversity() {
  return (
    <div>
      <NavigationBar />
      <div className="ppu-container">
        <div className="ppu-img-container">
          <img className="ppu-img" alt="" src={img} />
        </div>
        <div>
          <table className="ppu-table">
            <tr>
              <td>
                <h1 className="ppu-header-name">Bilkent University</h1>
              </td>
            </tr>
            <tr>
              <td className="ppu-header-other">Country/Region:</td>
            </tr>
            <tr>
              <td className="ppu-text-other">Ankara, Turkey</td>
            </tr>
            <tr>
              <td>
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <br />
              </td>
            </tr>
            <tr>
              <td className="ppu-text-other">
                <a
                  className="ppu-link"
                  href="https://w3.bilkent.edu.tr/www/"
                  target="_blank"
                >
                  Official Website
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div className="ppu-table-container">
      <table className="ppu-table2">
        <tr>
          <td className="ppu-td">
            <p className="ppu-table-header">Comments</p>
          </td>
          <td className="ppu-td">
            <p className="ppu-table-header">Rate</p>
          </td>
        </tr>
        <tr>
          <td className="ppu-td">
            <p className="ppu-table-other">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </td>
          <td className="ppu-td">
            <p className="ppu-table-other">4/5</p>
          </td>
        </tr>
        <tr>
          <td className="ppu-td">
            <p className="ppu-table-other">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </td>
          <td className="ppu-td">
            <p className="ppu-table-other">3/5</p>
          </td>
        </tr>
        <tr>
          <td className="ppu-td">
            <p className="ppu-table-other">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </td>
          <td className="ppu-td">
            <p className="ppu-table-other">3.5/5</p>
          </td>
        </tr>
      </table>
      </div>
    </div>
  );
}

export default ProfilePageUniversity;
