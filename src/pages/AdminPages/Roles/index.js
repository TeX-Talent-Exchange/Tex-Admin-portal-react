import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { RoleForm } from './RoleForm';

function Roles({ match }) {    
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/create`} component={RoleForm} />
            <Route path={`${path}/:id/edit`} component={RoleForm} />
        </Switch>
    );
}

export default Roles;