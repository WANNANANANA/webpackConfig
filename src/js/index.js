// import '../style/index.less';

console.log('~~~~~~~~~~~~~~~~~');
// 这个是注释~~~~~~~~~~~~~~~~~~~~~~~测试

// const obj = {
//     add() {
//         const body = document.getElementsByTagName('body')[0];
//         const div = document.createElement('div');
//         div.innerHTML = '这个是测试';
//         body.appendChild(div);
//         div.onclick = () => {
//             console.log(0);
//             import ('./tool').then((data) => {
//                 console.log(data);
//             })
//         }
//     }
// }

// obj.add();

// const arr = [1, 2, 3];
// arr.forEach(item => {
//     console.log(item);
// })

// if(document.all) {
//     alert('这个是ie浏览器');
// }

const a = 'hello world lalal';
document.body.innerHTML = a;
console.log('这个是入口文件indexaaa');

if (module.hot) {
    module.hot.accept();
}

