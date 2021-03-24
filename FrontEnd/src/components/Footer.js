import React from 'react'

//footer, common to all pages
export default function Footer() {
    return (
        <footer className="page-footer font-small blue-grey lighten-5">
            <div style={{ backgroundColor: "#bdbdbd" }}>
                <div className="container text-center text-md-left pt-5" >
                    <div className="row dark-grey-text" >
                        <div className="col-md-3 col-lg-4 col-xl-3 mb-4">
                            <h6 className="text-uppercase font-weight-bold">About</h6>
                            <hr className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto" />
                            <p>Add Footer</p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2">
                            <h6 className="text-uppercase  font-weight-bold">Contact</h6>
                            <hr className="teal accent-3 mb-2 mt-0 d-inline-block mx-auto" />
                            <p>
                                Add Footer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3" style={{ color: "black" }}>© 2021 Copyright
          </div>
        </footer>
    )
}
