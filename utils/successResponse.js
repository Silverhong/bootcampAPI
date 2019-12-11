class SuccessResponse {
  constructor(description) {
    this.description = description;
    return {
      success: "true",
      description: description
    };
  }
}
module.exports = SuccessResponse;
