function ok (data, msg) {
    const response = {
        status: 200,
        description: 'OK',
        message: msg,
        items: data.length,
        books: data
      }
      return response;
};


function lentTheBook (data, msg, rDate) {
    const response = {
        status: 200,
        description: 'OK',
        message: msg,
        items: data.length,
        return_date: rDate,
      }
      return response;
};

function invalidLentDate () {
    const response = {
        status: 400,
        description: 'Bad request',
        message: 'Please enter a valid body key',
        valid_key: 'return_date',
    }
    return response;
}

function alreadyLentOrNot (data, msg) {
    const response = {
        status: 401,
        description: 'Unauthorized',
        message: msg,
        items: data.length,
        isLent: data[0].isLent,
        book: data
      }
      return response;
};

function noContent (msg) {
    const response = {
        status: 204,
        description: 'No Content',
        message: msg,
        // books: data
    }
    return response;
};


function badRequest (msg) {
    const response = {
        status: 400,
        description: 'Bad Request',
        message: msg
    }
    return response;
};

function unAuthorized (msg, data) {
    const response = {
        status: 401,
        description: 'Unauthorized',
        message: msg,
    }
    return response;
};


function notFound (msg) {
    const response = {
        status: 404,
        description: 'Not Found',
        message: msg
    }
    return response;
};

function internalError (msg) {
    const response = {
        status: 500,
        description: 'Internal Server Error',
        message: msg
    }
    return response;
};

function dataRequired (msg) {
    const response = {
        status: 422,
        description: 'Unprocessable entity',
        message: msg
    }
    return response;
};

function duplEmail (msg) {
    const response = {
        status: 401,
        description: 'Unauthorized',
        message: msg
    }
    return response;
};


module.exports = {
    ok,
    alreadyLentOrNot,
    lentTheBook,
    invalidLentDate,
    noContent,
    badRequest,
    unAuthorized,
    notFound,
    internalError,
    dataRequired,
    duplEmail

};