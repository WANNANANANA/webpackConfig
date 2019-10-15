console.log('other');
document.body.innerHTML = 'hahaha';

if (module.hot) {
    module.hot.accept();
}

const a = 'this is a index';
 
document.body.innerHTML = 'please replace the content';

// const html = $('html');
// console.log(html);