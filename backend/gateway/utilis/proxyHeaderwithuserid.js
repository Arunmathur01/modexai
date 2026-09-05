import proxy from 'express-http-proxy';

const proxyHeaderWithUserId = (serviceUrl)=>{
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            // Add the user ID to the headers of the proxied request
            if (srcReq.user) {
                proxyReqOpts.headers['x-user-id'] = srcReq.user.userId;
            }
             return proxyReqOpts;
          
        },
    });
}

export default proxyHeaderWithUserId;