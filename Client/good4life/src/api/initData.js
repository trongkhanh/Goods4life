const initData = () => (
    fetch('http://192.168.1.187:8080/local-server/ProductInfo?functionName=GetHomeInfo')// eslint-disable-line
    .then(res => res.json())
);

export default initData;
