class TodoResponse {
  constructor(state, operation, message) {
    this.state = state;
    this.operation = operation;
    this.message = message;
  }
}

const successResponse = ({ operation, message }) =>
  new TodoResponse("Success", operation, message);
const failureResponse = ({ operation, message }) =>
  new TodoResponse("Failure", operation, message);

module.exports = {
  successResponse,
  failureResponse
};
