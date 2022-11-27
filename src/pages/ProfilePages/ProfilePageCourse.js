import NavigationBar from "../../components/ui/NavigationBar/NavigationBar";

function ProfilePageCourse() {
  return (
    <div>
      <NavigationBar />
      <div>
        <div className="ppc-center">
          <div>
            <p className="ppc-header-name">Course Name:</p>
            <p className="ppc-header-other">
              Object Oriented Software Engineeering
            </p>
          </div>
        </div>
        <hr className="ppc-line"></hr>
        <div className="ppc-container">
          <table className="ppc-table">
            <tr>
              <td className="ppc-header-other">Course Code: </td>
              <td className="ppc-text-other">CS 319</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="ppc-text-other">
                <a
                  className="ppu-link"
                  href="https://www.cs.bilkent.edu.tr/~eraytuzun/teaching/cs319/"
                  target="_blank"
                >
                  Website
                </a>
              </td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="ppc-text-other">
                <a
                  className="ppu-link"
                  href="https://stars.bilkent.edu.tr/syllabus/view/CS/319/20221"
                  target="_blank"
                >
                  Syllabus
                </a>
              </td>
            </tr>
          </table>
          <table className="ppc-table">
            <tr>
              <td className="ppc-header-other">Required Language: </td>
              <td className="ppc-header-other">English</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="ppc-header-other">ECTS Credits: </td>
              <td className="ppc-header-other">6.5</td>
            </tr>
            <tr>
              <br />
            </tr>
            <tr>
              <td className="ppc-header-other">University: </td>
              <td className="ppc-header-other">Bilkent University</td>
            </tr>
          </table>
        </div>
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

export default ProfilePageCourse;
