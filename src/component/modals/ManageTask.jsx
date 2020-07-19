import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import ApiHandler from '../../ApiHandler';
import swal from 'sweetalert';

class ManageTask extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
           taskName : '',
           taskId: props.taskId
        }
    }
    
    // Input field value
    handleInputValue=(event)  => {
        this.setState({[event.target.name] : event.target.value})
    }

    handleTask = () => {
        var payload = {
            _id : this.props.taskId,
            name: this.state.taskName
        };
        ApiHandler.addTask(payload, function(response){
            if(response.status === 200){
                window.location.reload()
            }
            else{
                swal('Oops',response.response.data.message,'error')
            }
        })
    }

    render(){
        return (
            <div>
                <Modal isOpen={this.props.openModal}>
                    <ModalHeader>Manage Task</ModalHeader>
                    <ModalBody>
                    <InputGroup>
                        <Input defaultValue={this.props.taskName} name="taskName" contentEditable="true" onChange={e => this.handleInputValue(e)} />
                        <InputGroupAddon addonType="prepend" ></InputGroupAddon>
                    </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={() => {
                        this.handleTask()
                        this.props.closeModal()
                    }}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={() => {
                        this.setState({taskName: ''})
                        this.props.closeModal()
                    }}>
                        Cancel
                    </Button>
                    </ModalFooter>
                </Modal>
            </div>
          );
    }
}
export default ManageTask;