import { Footer } from "antd/lib/layout/layout";
import moment from "moment";
import './Footer.styles.scss';

const Footers = () => {
  const currentYear = moment().year();

  return <footer className="footer-sec" id="footer-sec">
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="footer-icons d-flex">
            <a href="javascript:void(0)" className="wow fadeInUp"><i className="lab la-facebook-f"></i> </a>
            <a href="javascript:void(0)" className="wow fadeInDown"><i className="lab la-linkedin-in"></i> </a>
            <a href="javascript:void(0)" className="wow fadeInUp"><i className="lab la-instagram"></i> </a>
          </div>
        </div>
        <div className="col-12 text-center mt-3">
          <p className="company-about fadeIn">© {currentYear} 252.mn </p>
        </div>
      </div>
    </div>
  </footer>;
};

export default Footers;