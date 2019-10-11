console.log('other');
document.body.innerHTML = 'hahaha';

if (module.hot) {
    module.hot.accept();
}