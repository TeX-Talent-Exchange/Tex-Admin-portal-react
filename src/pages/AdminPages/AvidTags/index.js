import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List } from './List';
import { AvidForm } from './AvidForm';

const Avidtags = ({ match }) => {
    const { path } = match;
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/create`} component={AvidForm} />
            <Route path={`${path}/:id/edit`} component={AvidForm} />
        </Switch>
    )
}


export default Avidtags