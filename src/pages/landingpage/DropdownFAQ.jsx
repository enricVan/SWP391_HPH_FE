import Dropdown from "react-bootstrap/Dropdown";

function DropdownFAQ() {
  const customStyle = {
    width: "100%",
    textAlign: "left",
    backgroundColor: "#F58C4D",
    margin: "20px 0px",
  };

  const menuStyle = {
    pointerEvents: "none",
  };

  return (
    <>
      <div className="container">
        <Dropdown alignRight={false}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={customStyle}
          >
            1. Khi ở KTX cần lưu ý điều gì?
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ ...menuStyle, ...customStyle }}>
            <div className="dropdown-item">
              <h6>Ký túc xá có một số điều cần lưu ý khi ở như sau:</h6>
              <div className="text-wrap">
                <ul>
                  <li>Không được nuôi vật nuôi, thú cưng (chó, mèo,...).</li>
                  <li>
                    Không được uống rượu, bia, chơi cờ bạc, sử dụng các chất
                    kích thích và chất cấm.
                  </li>
                  <li>Không được nấu ăn trong ký túc xá.</li>
                  <li>
                    Không được đưa người lạ không ở trong ký túc xá vào phòng
                    sau giờ giới nghiêm.
                  </li>
                  <li>
                    Giờ giới nghiêm trong ký túc xá là sau 10 giờ 30 phút tối.
                  </li>
                  <li>Giữ gìn vệ sinh chung và đổ rác trước 9 giờ sáng.</li>
                </ul>
                <h6>
                  Tất cả các lỗi vi phạm đều bị trừ dựa trên điểm uy tín dựa
                  trên mức độ lỗi vi phạm.
                </h6>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown alignRight={false}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={customStyle}
          >
            2. Điểm uy tín là gì?
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ ...menuStyle, ...customStyle }}>
            <div className="dropdown-item">
              <div className="text-wrap">
                <h6>
                  Điểm uy tín (Credibility in FPT Dormitory - CFD score) là một
                  trong những yếu tố để tạo ra môi trường KTX văn minh và lành
                  mạnh hơn
                </h6>
                <ul>
                  <li>
                    Điểm uy tín là tiêu chí để đánh giá ý thức của sinh viên khi
                    sử dụng dịch vụ ký túc xá.
                  </li>
                  <li>
                    Điểm uy tín thay đổi dựa theo những hành vi, hoạt động và sự
                    đóng góp của sinh viên trong suốt thời gian ở ký túc xá.
                  </li>
                  <li>
                    Điểm uy tín sẽ được tăng, giảm tương ứng theo các quy định
                    đã được đề ra trong nội quy KTX.
                  </li>
                  <li>
                    Điểm uy tín là một trong những tiêu chí được dùng để xét
                    duyệt xem sinh viên có được sử dụng ký túc xá trong kỳ hay
                    không.
                  </li>
                  <li>Giữ gìn vệ sinh chung và đổ rác trước 9 giờ sáng.</li>
                </ul>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default DropdownFAQ;
