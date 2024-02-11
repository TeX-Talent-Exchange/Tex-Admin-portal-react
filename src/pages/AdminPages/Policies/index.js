import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { PolicyForm } from './PolicyForm';

function Policies({ match }) {    
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/create`} component={PolicyForm} />
            <Route path={`${path}/:id/edit`} component={PolicyForm} />
        </Switch>
    );
}

export default Policies;