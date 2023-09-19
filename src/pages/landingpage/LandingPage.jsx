import logo from "./images/Logo.png";
import contentbanner from "./images/content-banner.png";
import "./styleLanding.css";
import CarouselHeader from "./CarouselHeader";
import infoImg1 from "./images/info-1.jpg";
import infoImg2 from "./images/info-2.jpg";
import infoImg3 from "./images/info-3.jpg";
import DropdownFAQ from "./DropdownFAQ";
export default function LandingPage() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic"
        rel="stylesheet"
        type="text/css"
      />

      <nav className="navbar navbar-light bg-light static-top">
        <div className="container">
          <img src={logo} />
          <a className="btn btn-orange" href="#signup">
            Login
          </a>
        </div>
      </nav>

      {/* Masthead*/}
      <header style={{ paddingBottom: "25px" }}>
        {/* Slider here */}
        <CarouselHeader />
        {/* Slider end here */}
      </header>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <img
                className="d-block rounded mx-auto"
                src={contentbanner}
                width={"90%"}
              />
            </div>
          </div>
          <div
            className="row mx-auto"
            style={{
              width: "90%",
              marginTop: "10px",
              transform: "translateX(10px)",
            }}
          >
            <div
              className="col-lg-4"
              style={{
                borderRadius: "10px",
                backgroundColor: "#F48120",
                width: "31%",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h4
                style={{
                  fontFamily: "monospace",
                  color: "#fff",
                }}
              >
                Thông tin KTX Đại Học FPT
              </h4>
              <p
                className="lead mb-0 "
                style={{
                  fontFamily: "monospace",
                  color: "#fff",
                }}
              >
                Thông tin{" "}
                <a href="#dorm-info">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                    >
                      <path
                        d="M13.6667 1L21 8M21 8L13.6667 15M21 8H1"
                        stroke="white"
                      />
                    </svg>
                  </span>
                </a>
              </p>
            </div>
            <div
              className="col-lg-4"
              style={{
                borderRadius: "10px",
                backgroundColor: "#F48120",
                width: "31%",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h4
                style={{
                  fontFamily: "monospace",
                  color: "#fff",
                }}
              >
                Đăng kí sử dụng KTX
              </h4>
              <p
                className="lead mb-0 "
                style={{
                  fontFamily: "monospace",
                  color: "#fff",
                }}
              >
                Đăng kí{" "}
                <a href="#">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                    >
                      <path
                        d="M13.6667 1L21 8M21 8L13.6667 15M21 8H1"
                        stroke="white"
                      />
                    </svg>
                  </span>
                </a>
              </p>
            </div>
            <div
              className="col-lg-4"
              style={{
                borderRadius: "10px",
                backgroundColor: "#F48120",
                width: "31%",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h4
                style={{
                  fontFamily: "monospace",
                  color: "#fff",
                }}
              >
                Các câu hỏi thường gặp
              </h4>
              <p
                className="lead mb-0 "
                style={{
                  fontFamily: "monospace",
                  color: "#fff",
                }}
              >
                FAQ{" "}
                <a href="#FAQ">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                    >
                      <path
                        d="M13.6667 1L21 8M21 8L13.6667 15M21 8H1"
                        stroke="white"
                      />
                    </svg>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Showcases*/}
      <section className="showcase" id="dorm-info">
        <div className="container p-0">
          <div className="row mb-5">
            <h1
              className="text-center p-4"
              style={{ fontFamily: "monospace", color: "#F48120" }}
            >
              Thông tin Ký túc xá Đại Học FPT
            </h1>
            <div className="col-lg-6 order-lg-2 text-white ">
              <img src={infoImg1} alt="" />
            </div>
            <div className="col-lg-6 order-lg-1 d-flex align-items-end">
              <p
                className=" mb-0 "
                style={{
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  fontSize: "16px",
                  lineHeight: "180%",
                }}
              >
                Trường Đại học FPT là một trong những ngôi trường nổi tiếng đào
                tạo đa ngành, với chất lượng đào tạo đạt chuẩn quốc tế. Trường
                không chỉ quan tâm đến chất lượng đào tạo, công tác tuyển sinh
                mà còn chăm lo cho đời sống sinh viên.
                <p>
                  Bằng việc đầu tư, xây dựng khu{" "}
                  <span style={{ color: "#F48120", fontWeight: "bold" }}>
                    Ký túc xá
                  </span>{" "}
                  xịn sò. Đầy đủ trang thiết bị cần thiết, không gian thoáng
                  mát, sạch sẽ. Để đáp ứng nhu cầu và tạo không gian học tập,
                  sinh hoạt thoải mái nhất cho sinh viên.{" "}
                  <span style={{ color: "#F48120", fontWeight: "bold" }}>
                    KTX
                  </span>{" "}
                  cũng được xem như ngôi nhà thứ 2 của nhiều sinh viên.
                </p>
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-lg-8 text-white ">
              <img src={infoImg2} alt="" width={"95%"} />
            </div>
            <div className="col-lg-4 d-flex align-items-end justify-content-end">
              <p
                className=" mb-0 "
                style={{
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  fontSize: "16px",
                  lineHeight: "180%",
                }}
              >
                {" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  Ký túc xá của trường Đại học FPT là chỗ ở dành riêng cho sinh
                  viên của Đại học FPT.
                </span>{" "}
                <br /> Hiện nay, một vấn đề các bạn tân sinh viên sau khi biết
                kết quả trúng tuyển Đại học. Đó là tìm kiếm cho mình một chỗ ở
                phù hợp, vừa tiết kiệm vừa đảm bảo an ninh, môi trường học tập.
                Không chỉ các tân sinh viên mà các bạn sinh viên các khóa trước
                hầu hết cũng đều mong muốn ở tại{" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  KTX
                </span>{" "}
                trường để thuận lợi cho việc di chuyển. Và để tiết kiệm chi phí,
                có một trường trường để học tập và sinh hoạt.
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-lg-12 order-lg-1 text-white d-flex justify-content-center">
              <img src={infoImg3} alt="" />
            </div>
            <div className="col-lg-10 order-lg-2 offset-md-1">
              <p
                className=" mb-0"
                style={{
                  fontFamily: "Helvetica Neue,Helvetica,Arial,sans-serif",
                  fontSize: "16px",
                  lineHeight: "180%",
                }}
              >
                {" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  Ký túc xá trường Đại học FPT được xây dựng với thiết kế hiện
                  đại, thoáng mát và đầy đủ tiện nghi.
                </span>{" "}
                <br /> Khu{" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  KTX
                </span>{" "}
                gồm các tòa nhà. Mỗi tòa{" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  KTX
                </span>{" "}
                có các tầng rộng rãi, sạch sẽ, có cả wifi, máy bán nước tự động,
                máy giặt sấy tự động... Xung quanh còn là cây cối xanh mướt
                trong lành, dễ chịu, thoáng mát. Phòng ở được thiết kế hiện đại,
                không gian thoải mái, thiết kế phù hợp cho từng loại phòng
                3-4-6-8 người. Mỗi phòng sẽ được trang bị các thiết bị cần
                thiết, đầy đủ phục vụ cho những nhu cầu thiết yếu của sinh viên
                như giường tầng, bàn học, giá phơi quần áo, bình nóng lạnh, điều
                hòa, tủ để giày, nhà vệ sinh riêng cho mỗi phòng… giúp sinh viên
                an tâm học tập trong quãng thời gian gắn bó với đại học FPT, đem
                đến cho sinh viên cảm giác thoải mái tiện nghi như ở nhà.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials*/}
      <section className="testimonials text-center bg-light" id="FAQ">
        <div className="container">
          <h1
            className="text-center mb-5"
            style={{
              fontFamily: "monospace",
              color: "#F48120",
              fontSize: "72px",
            }}
          >
            FAQ
          </h1>

          <DropdownFAQ />
        </div>
      </section>

      {/* Footer*/}
      <footer className="footer bg-light">
        <div className="container">
          <div className="row">
            <hr style={{ borderColor: "#F48120", borderWidth: "4px" }} />
            <div className="col-lg-3">
              <h3>Hà Nội</h3>
              <p>
                {" "}
                Khu Giáo dục và Đào tạo - Khu Công nghệ cao Hòa Lạc - KM29 Đại
                Lộ Thăng Long, H. Thạch Thất, TP. Hà Nội
              </p>

              <p>Điện thoại: 024 7300 1866</p>

              <p>Email: daihocfpt@fpt.edu.vn</p>
            </div>
            <div className="col-lg-3">
              <h3>Đà Nẵng</h3>
              <p>
                Khu đô thị công nghệ FPT Đà Nẵng, P. Hoà Hải, Q. Ngũ Hành Sơn,
                TP. Đà Nẵng
              </p>
              <p>Điện thoại: 024 7300 1866</p>
              <p>Email: daihocfpt@fpt.edu.vn</p>
            </div>
            <div className="col-lg-3">
              <h3>Cần Thơ</h3>
              <p>
                Số 600 Đường Nguyễn Văn Cừ (nối dài), P. An Bình, Q. Ninh Kiều,
                TP. Cần Thơ
              </p>
              <p>Điện thoại: 024 7300 1866</p>
              <p>Email: daihocfpt@fpt.edu.vn</p>
            </div>
            <div className="col-lg-3">
              <h3>Quy nhơn</h3>
              <p>
                Khu đô thị mới An Phú Thịnh, Phường Nhơn Bình & Phường Đống Đa,
                TP. Quy Nhơn, Bình Định
              </p>
              <p>Điện thoại: 024 7300 1866/ 0256 7300 999</p>
              <p>Email: daihocfpt@fpt.edu.vn</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}