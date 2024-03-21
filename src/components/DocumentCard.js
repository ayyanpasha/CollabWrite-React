import React from 'react'
import { Link } from 'react-router-dom'

export default function DocumentCard(props) {

  return (
    <div className="col-lg-3 col-md-4 col-sm-12 my-2">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{props.documentId.title}</h5>
          </div>
          <Link to={`/document/${props.documentId._id}`} className="btn btn-primary">View</Link>
          <i className="fa-regular fa-trash-can mx-2" onClick={() => props.deleteDocument(props.documentId._id, props._id)} style={{ cursor: "pointer" }}></i>
        </div>
      </div>
    </div>
  )
}
