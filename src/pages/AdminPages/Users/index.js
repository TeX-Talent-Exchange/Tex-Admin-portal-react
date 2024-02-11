import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { UserForm } from './UserForm';

function Users({ match }) {    
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/create`} component={UserForm} />
            <Route path={`${path}/:username/edit`} component={UserForm} />
        </Switch>
    );
}

export default Users;