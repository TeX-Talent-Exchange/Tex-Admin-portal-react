import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { GroupForm } from './GroupsForm';

function Groups({ match }) {    
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/create`} component={GroupForm} />
            <Route path={`${path}/:id/edit`} component={GroupForm} />
        </Switch>
    );
}

export default Groups;