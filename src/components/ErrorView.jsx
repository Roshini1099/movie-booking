import React from 'react';


const ErrorView = (props) => {

    if(!props.showError)
        return <span></span>;
        
    return ( 
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {props.showError}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
     );
}
 
export default ErrorView;