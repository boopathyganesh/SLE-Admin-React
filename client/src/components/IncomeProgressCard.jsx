import React from "react";

const IncomeProgressCard = () => {
  return (
    <div className="card overflow-hidden">
      <div className="card-body p-4">
        <h5 className="card-title mb-9 fw-semibold text-info">
          Income Progress
        </h5>
        <div className="row align-items-center">
          <div className="col-8">
            <h4 className="fw-semibold mb-3">$36,358</h4>
            <div className="d-flex align-items-center mb-3">
              <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                <i className="ti ti-arrow-up-left text-success"></i>
              </span>
              <p className="text-dark me-1 fs-3 mb-0">+9%</p>
              <p className="fs-3 mb-0">last year</p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-center">
              <img src="../assets/images/logos/dash-2.png" alt="" srcSet="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeProgressCard;
