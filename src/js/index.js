import '../style/index.less';

const obj = {
    add() {
        const body = document.getElementsByTagName('body')[0];
        const div = document.createElement('div');
        div.innerHTML = '这个是测试';
        body.appendChild(div);
        div.onclick = () => {
            console.log(0);
            import ('./tool').then((data) => {
                console.log(data);
            })
        }
    }
}

obj.add();

const arr = [1, 2, 3];
arr.forEach(item => {
    console.log(item);
})