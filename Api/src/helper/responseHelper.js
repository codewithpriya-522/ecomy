 const SendResponse = (res, message, status, data,page,limit, error, isSuccess) => {
  return res.status(status).json({
    isSuccess,
    message,
    data,
    error,
  });
};

 const SendSuccessResponse = (res, message = "Successful", data) => {
  return SendResponse(res, message, 200, data, null, true);
};

 const SendErrorResponse = (
  res,
  message = "Internal Server Error",
  error
) => {
  return SendResponse(res, message, 500, null, error, false);
};

 const SendBadRequest = (res, message = "Bad Request") => {
  return SendResponse(res, message, 400, null, null, false);
};
const SendPagedResult = (res, message = "Successful", data, page, limit) => {
  return SendResponse(res, message, 200, data, null, true);
};
module.exports={SendResponse,SendBadRequest,SendSuccessResponse,SendErrorResponse,SendPagedResult};