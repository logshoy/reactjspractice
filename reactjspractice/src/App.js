import React from 'react';
import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import {autoLogin} from './store/actions/auth'
import Logout from './components/Logout/Logout';

class App extends React.Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render () {

    let routes = (

    <Layout>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    </Layout>
    )

    if (this.props.isAuthenticared) {
      routes = (
        <Layout>
          <Switch>
            <Route path="/quiz-creator" component={QuizCreator} />
            <Route path="/quiz/:id" component={Quiz} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={QuizList} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
    }
}

function mapStateToProps(state) {
  return {
    isAuthenticared: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
