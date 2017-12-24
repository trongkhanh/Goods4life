const checkLogin = () =>(
    new WebSocket('ws://192.168.1.8:8080/local-server/check_login.php')
  );

module.exports = checkLogin;