import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch, BrowserRouter, Route} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import WrappedNormalLoginForm from './login'
import WrappedNormalRegisterForm from './register'
import Food from './food'
import Order from './order';
import Comments from './comments';
import InfoForm from './info';
import MyCart from './cart';
import Report from './report';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


//ReactDOM.render(<WrappedNormalRegisterForm />, document.getElementById('registerBox'));

ReactDOM.render(
  <BrowserRouter>
      <div>
        <LocaleProvider locale={zh_CN}>
        <Switch>
          <Route path='/login' component={WrappedNormalLoginForm} />
          <Route path='/register' component={WrappedNormalRegisterForm} />
          <Route path='/food/:type/:id' component={Food} />
          <Route path='/order/:type/:id' component={Order} />
          <Route path='/comments/:type/:id' component={Comments} />
          <Route path='/info/:type/:id' component={InfoForm} />
          <Route path='/cart/:type/:id' component={MyCart} />
          <Route path='/report/:type/:id' component={Report} />
        </Switch>
        </LocaleProvider>
      </div>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
