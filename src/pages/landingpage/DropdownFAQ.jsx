import { useState, useEffect } from "react";
import axios from "axios";

function DropdownFAQ() {
  const customStyle = {
    width: "100%",
    textAlign: "left",
    backgroundColor: "#fff",
    margin: "20px 0px",
    border: "1px solid #F58C4D",
    borderRadius: "10px",
    padding: "10px",
  };

  const faqStyle = {
    backgroundColor: "#F58C4D",
    color: "#fff",
    padding: "12px",
    fontWeight: "bold",
    fontSize: "1.5rem",
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const getFaq = async (API_URL) => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Lỗi khi gọi API:" + error);
      }
    };

    getFaq("http://localhost:8888/api/v1/faq");
  }, []);

  return (
    <>
      {data.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <div className="container">
          <div className="faq-title" style={{ ...customStyle, ...faqStyle }}>
            {item.faqId}. {item.title}
          </div>

          <div style={{ ...customStyle }}>
            <div className="faq-content">
              <h6>{item.subTitle}</h6>
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
          </div>
        </div>
      ))}
    </>
  );
}

export default DropdownFAQ;

// {data.map((item) => (
//   <div key={item.faqId}>
//     <h1 key={item.title}>{item.title}</h1>
//     <h2 key={item.subTitle}>{item.subTitle}</h2>
//     <h3 key={item.content}>{item.content}</h3>
//   </div>
// ))}
