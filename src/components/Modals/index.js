import React from 'react'


class ModalComponent extends React.Component {

    darkStyle = {
        color: 'white'
    }

    render() {
        return (
            <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark" style={this.darkStyle}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLongTitle">{this.props.title}</h5>
                        </div>
                        <div className="modal-body">
                            {this.props.modalBody}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ModalComponent