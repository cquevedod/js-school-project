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

function unAuthorized (msg) {
    const response = {
        status: 401,
        description: 'Unauthorized',
        message: msg
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

module.exports = {
    ok,
    noContent,
    badRequest,
    unAuthorized,
    notFound

};