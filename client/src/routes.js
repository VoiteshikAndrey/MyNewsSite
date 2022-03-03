import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage}  from './pages/authPage';
import {NewsPage} from './pages/newsPage';
import {ProfilePage} from './pages/profilePage';
import {AdminPage} from './pages/adminPage';
import {PostPage} from './pages/postPage';
import {EditPage} from './pages/editPage';

export const useRoutes = (isAuthenticated, role) => {
    
    console.log("Role:",role);
    if(isAuthenticated && role === "admin") {
        return(
            <Switch>
                <Route path="/" exact>
                    <NewsPage />
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/admin" exact>
                    <AdminPage />
                </Route>
                <Route path="/post/:id">
                    <PostPage />
                </Route>
                <Route path="/edit/:id">
                    <EditPage />
                </Route>
                <Redirect to='/' />
            </Switch>
        );
    }
    else if(isAuthenticated && role === "user") {
        return(
            <Switch>
                <Route path="/" exact>
                    <NewsPage />
                </Route>
                <Route path="/profile" exact>
                    <ProfilePage />
                </Route>
                <Route path="/post/:id">
                    <PostPage />
                </Route>
                <Redirect to='/' />
            </Switch>
        );
    }

    return(
        <Switch>
            <Route path="/" exact>
                <NewsPage />
            </Route>
            <Route path="/auth">
                <AuthPage value = {true}/>
            </Route>
            <Route path="/post/:id">
                <PostPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    );
}