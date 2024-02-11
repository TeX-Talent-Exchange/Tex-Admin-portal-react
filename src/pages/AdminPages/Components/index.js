import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { ComponentForm } from './ComponentForm';

function Components({ match }) {    
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/create`} component={ComponentForm} />
            <Route path={`${path}/:id/edit`} component={ComponentForm} />
        </Switch>
    );
}

export default Components;