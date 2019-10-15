// import $ from 'jquery';
const body = $('body');
body[0].innerHTML = 'this is body';

// 热加载
if (module.hot) {
    module.hot.accept();
}
