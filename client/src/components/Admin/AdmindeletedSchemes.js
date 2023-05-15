import React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Moment from "moment";
import Button from "react-bootstrap/Button";
// import { AppContext } from "./appContext";

export default function AdminAppliedSchemes() {
  const [schemedata, setschemedata] = useState([]);
  const [Schemeid, setSchemeid] = useState();
  const [Applicationsinfo, setApplicationsinfo] = useState([]);
  const [Applieddatatable, setApplieddatatable] = useState(false);
  const [FullApplicationstable, setFullApplicationstable] = useState(false);
  const [morebtntry, setmorebtntry] = useState();
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const auth = localStorage.getItem("user");
  const [message, setMessage] = useState("");
  // const { socket} = useContext(AppContext);

  useEffect(() => {
    getschemedata();
    console.log(JSON.parse(auth).Farmertype);
    console.log(JSON.parse(auth).Category);
  }, []);

  function getschemedata() {
    fetch(`http://localhost:8000/scheme/alldeletedschemes`, {
      method: "GET",
      crossDomain: true,
    })
      .then((response) => response.json())
      .then((data) => {
        const Scheme = data;
        console.log(Scheme, "schemdata");
        setschemedata(Scheme);
        setApplieddatatable(true);
        setFullApplicationstable(false);
      });
  }

  function handlemoreinfo(Schemeid) {
    fetch(`http://localhost:8000/scheme/schemeinfo/${Schemeid}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.warn(data);
        console.warn(Schemeid);
        getschemedata();
        setmorebtntry(data);
        setShow(true);
      });
  }


  return (
    <>
      {Applieddatatable ? (
        <Table striped bordered hover className="TableAllskims">
          <thead>
            <tr>
              <th>No.</th>
              <th>Scheme Title</th>
              <th>Last Date</th>
              <th>Total pending</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {schemedata.map((scheme, idx) => {
              return (
                <>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{scheme.Title}</td>
                    <td>{Moment(scheme.Expired).format("DD-MM-YYYY")}</td>
                    <td>{scheme.Applied - scheme.Approved} </td>
                    <td onClick={() => handlemoreinfo(scheme.Schemeid)}>
                      <Button variant="info">More Info</Button>
                    </td>
                  </tr>

                  {show ? (
                    <Modal
                      show={show}
                      backdrop="static"
                      keyboard={true}
                      size="xl"
                      onHide={() => setShow(false)}
                      dialogClassName="modal-190w"
                      aria-labelledby="example-custom-modal-styling-title"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                          {morebtntry.Title}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <table id="F_model_Table">
                          <tr>
                            <th>Title</th>
                            <td>{morebtntry.Title}</td>
                          </tr>
                          <tr>
                            <th>Description</th>
                            <td> {morebtntry.Description} </td>
                          </tr>
                          <tr>
                            <th>Benefits</th>
                            <td>{morebtntry.Benefits} </td>
                          </tr>
                          <tr>
                            <th>For More Information </th>
                            <td> {morebtntry.How} </td>
                          </tr>
                          <tr>
                            <th>Start Date</th>
                            <td>
                              {Moment(morebtntry.Start).format("DD-MM-YYYY")}{" "}
                            </td>
                          </tr>
                          <tr>
                            <th>Expire Date</th>
                            <td>
                              {Moment(morebtntry.Expired).format("DD-MM-YYYY")}{" "}
                            </td>
                          </tr>
                          <tr>
                            <th> Eligible Category</th>
                            <td>{morebtntry.Category.join(" , ")} </td>
                          </tr>
                          <tr>
                            <th>Eligible Farmer Type</th>
                            <td> {morebtntry.Farmertype.join(" , ")} </td>
                          </tr>
                        </table>
                      </Modal.Body>
                    </Modal>
                  ) : null}
                </>
              );
            })}
          </tbody>
        </Table>
      ) : null}
    </>
  );
}
