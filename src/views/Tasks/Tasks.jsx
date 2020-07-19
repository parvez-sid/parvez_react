import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron, Button, Card,InputGroup, InputGroupAddon, Input } from "reactstrap";
import swal from 'sweetalert';
import ApiHandler from '../../ApiHandler';
import PopUp from '../../component/modals/ManageTask';

class Tasks extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks : [],
            openPopUp : false,
            activeTaskId: null, //state property to hold task id
            activeTaskName: '', //state property to hold task name,
        }
    }

    //get task from system
    componentDidMount() {
        var that = this;
        ApiHandler.getTasks(function(response){
            if(response.status === 200){
                that.setState({
                tasks : response.data
            })
            }
            else if(response.response.data.message === "Session Expire"){
                swal("Oops!", "Session Expire Please Login Again!", "error")
                .then(() => {
                window.location = '/';
            });
            }
            else {
                swal('Oops',response.response.data.message,'error')
            }
        })
    }

    //pass task to modal for update a task details...
    openModalWithTask(task) {
        this.setState({
           openPopUp: true,
           activeTaskId: task._id,
           activeTaskName: task.name
        })
     }

    render() {
        var sort_by_order = [...this.state.tasks];
        sort_by_order.sort((a,b) => a.order - b.order);

        let taskList = sort_by_order.map((task) => (
            <Row key={task._id}>
                <Col>
                <Card body inverse color="secondary">
                    <Row>
                        <Col md="12">
                        <InputGroup>
                            <Input value={task.name} readOnly />
                        <InputGroupAddon addonType="prepend" >
                        <Button onClick={() => this.openModalWithTask(task)}>
                            Edit <i className="fa fa-pencil"></i>
                        </Button>
                        </InputGroupAddon>
                        </InputGroup>
                        </Col>
                    </Row>
                </Card><hr/>
                </Col>
            </Row>
        )
        );
        return(
            <>
            <Container>
                <PopUp
                    openModal={this.state.openPopUp}
                    closeModal={()=>{this.setState({ openPopUp : false })}}
                    apiCall={this.handleTask}
                    taskId={this.state.activeTaskId}
                    taskName={this.state.activeTaskName}
                />
                <Jumbotron>
                    <Row>
                        <Col md='6'>
                            <h1><i className="fa fa-list"></i>{' '}My Tasks</h1>
                        </Col>
                        <Col md='6'>
                            <h3 className="float-right">
                                <i className="fa fa-user"></i>{' '}
                                {localStorage.getItem('user_name')}
                            </h3>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <Button id="add" color="primary" className="float-right"
                                onClick={() => this.setState({openPopUp : true})}
                            >
                                <i className="fa fa-plus"></i> Add Task
                            </Button>
                        </Col>
                    </Row><hr/>
                    {taskList}
                </Jumbotron>
            </Container>
            </>
        )
    }
}
export default Tasks;