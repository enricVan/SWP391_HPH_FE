import logo from "./images/Logo.png";
import contentbanner from "./images/content-banner.png";
import "./styleLanding.css";
import CarouselHeader from "./CarouselHeader";
import infoImg1 from "./images/info-1.jpg";
import infoImg2 from "./images/info-2.jpg";
import infoImg3 from "./images/info-3.jpg";
export default function Landing() {
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
          </div>
        </div>
      </section>

      {/* Image Showcases*/}
      <section className="showcase ">
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
                mà còn chăm lo cho đời sống sinh viên. Bằng việc đầu tư, xây
                dựng khu{" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  Ký túc xá
                </span>{" "}
                xịn sò. Đầy đủ trang thiết bị cần thiết, không gian thoáng mát,
                sạch sẽ. Để đáp ứng nhu cầu và tạo không gian học tập, sinh hoạt
                thoải mái nhất cho sinh viên.{" "}
                <span style={{ color: "#F48120", fontWeight: "bold" }}>
                  KTX
                </span>{" "}
                cũng được xem như ngôi nhà thứ 2 của nhiều sinh viên.
              </p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-lg-8 text-white ">
              <img src={infoImg2} alt="" />
            </div>
            <div className="col-lg-3 d-flex align-items-end justify-content-end">
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
      <section className="testimonials text-center bg-light">
        <div className="container">
          <h2 className="mb-5">What people are saying...</h2>
          <div className="row">
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-1.jpg"
                  alt="..."
                />
                <h5>Margaret E.</h5>
                <p className="font-weight-light mb-0">
                  This is fantastic! Thanks so much guys!
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-2.jpg"
                  alt="..."
                />
                <h5>Fred S.</h5>
                <p className="font-weight-light mb-0">
                  Bootstrap is amazing. I have been using it to create lots of
                  super nice landing pages.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial-item mx-auto mb-5 mb-lg-0">
                <img
                  className="img-fluid rounded-circle mb-3"
                  src="assets/img/testimonials-3.jpg"
                  alt="..."
                />
                <h5>Sarah W.</h5>
                <p className="font-weight-light mb-0">
                  Thanks so much for making these free resources available to
                  us!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action*/}
      <section className="call-to-action text-white text-center" id="signup">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <h2 className="mb-4">Ready to get started? Sign up now!</h2>
              {/* Signup form*/}
              {/* * * * * * * * * * * * * * * **/}
              {/* * * SB Forms Contact Form * **/}
              {/* * * * * * * * * * * * * * * **/}
              {/* This form is pre-integrated with SB Forms.*/}
              {/* To make this form functional, sign up at*/}
              {/* https://startbootstrap.com/solution/contact-forms*/}
              {/* to get an API token!*/}
              <form
                className="form-subscribe"
                id="contactFormFooter"
                data-sb-form-api-token="API_TOKEN"
              >
                {/* Email address input*/}
                <div className="row">
                  <div className="col">
                    <input
                      className="form-control form-control-lg"
                      id="emailAddressBelow"
                      type="email"
                      placeholder="Email Address"
                      data-sb-validations="required,email"
                    />
                    <div
                      className="invalid-feedback text-white"
                      data-sb-feedback="emailAddressBelow:required"
                    >
                      Email Address is required.
                    </div>
                    <div
                      className="invalid-feedback text-white"
                      data-sb-feedback="emailAddressBelow:email"
                    >
                      Email Address Email is not valid.
                    </div>
                  </div>
                  <div className="col-auto">
                    <button
                      className="btn btn-primary btn-lg disabled"
                      id="submitButton"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                {/* Submit success message*/}
                {/**/}
                {/* This is what your users will see when the form*/}
                {/* has successfully submitted*/}
                <div className="d-none" id="submitSuccessMessage">
                  <div className="text-center mb-3">
                    <div className="fw-bolder">Form submission successful!</div>
                    <p>To activate this form, sign up at</p>
                    <a
                      className="text-white"
                      href="https://startbootstrap.com/solution/contact-forms"
                    >
                      https://startbootstrap.com/solution/contact-forms
                    </a>
                  </div>
                </div>
                {/* Submit error message*/}
                {/**/}
                {/* This is what your users will see when there is*/}
                {/* an error submitting the form*/}
                <div className="d-none" id="submitErrorMessage">
                  <div className="text-center text-danger mb-3">
                    Error sending message!
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer*/}
      <footer className="footer bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
              <ul className="list-inline mb-2">
                <li className="list-inline-item">
                  <a href="#!">About</a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a href="#!">Contact</a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a href="#!">Terms of Use</a>
                </li>
                <li className="list-inline-item">⋅</li>
                <li className="list-inline-item">
                  <a href="#!">Privacy Policy</a>
                </li>
              </ul>
              <p className="text-muted small mb-4 mb-lg-0">
                © Your Website 2023. All Rights Reserved.
              </p>
            </div>
            <div className="col-lg-6 h-100 text-center text-lg-end my-auto">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-4">
                  <a href="#!">
                    <i className="bi-facebook fs-3" />
                  </a>
                </li>
                <li className="list-inline-item me-4">
                  <a href="#!">
                    <i className="bi-twitter fs-3" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">
                    <i className="bi-instagram fs-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* Bootstrap core JS*/}
      {/* Core theme JS*/}
      {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/}
      {/* * *                               SB Forms JS                               * **/}
      {/* * * Activate your form at https://startbootstrap.com/solution/contact-forms * **/}
      {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/}
    </>
  );
}
