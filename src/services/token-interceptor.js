import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/';

const getLocalAccessToken = () => {
    const user = JSON.parse( localStorage.getItem( "user" ) );

    const { access_token } = user;
    console.log( access_token );

    return access_token;
};

const getLocalRefreshToken = () => {
    const user = JSON.parse( localStorage.getItem( "user" ) );

    const { refresh_token } = user;

    console.log( refresh_token );

    return refresh_token;
};

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',   
    }
});


instance.interceptors.request.use(
    ( config ) => {

        const access_token = getLocalAccessToken();

        if ( access_token ){
            config.headers.Authorization = access_token;
        }
        return config;
    },
    ( error ) => {
        return Promise.reject( error );
    }
);


instance.interceptors.response.use(
    ( resp ) => {
        return resp;
    },

    async ( err ) => {
        const originalConfig = err.config;

        if ( err.response ){
            if ( err.response.status === 401 && !originalConfig._retry ){
                
                originalConfig._retry = true;

                try {
                    const rs = await refreshToken();

                    const { access_token, refresh_token } = rs.data;

                    localStorage.setItem('access_token', JSON.stringify( access_token ));
                    localStorage.setItem('refresh_token', JSON.stringify( refresh_token ));

                    instance.defaults.headers.Authorization = access_token;

                    return instance( originalConfig );
                } catch (_error) {
                    if(_error.response && _error.response.data){
                        return Promise.reject( _error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }
            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
              }
            }
        
            return Promise.reject(err);
        }
)


const refreshToken = () => {
    return instance.post('/refresh-token', { refresh_token: getLocalRefreshToken(), });
};

export {
    instance
};