import React from "react";
import { Icon } from 'semantic-ui-react';

function UnderConstruction () {
    return(
        <div id="under-const">
            <div className="under-const-msg">
                <Icon name='cogs' size='big' style={{marginRight: 8}}/>
                <h1>Section Under Construction</h1>
            </div>
        </div>
    );
}

export default UnderConstruction;