const register = () => (
  new WebSocket('ws://192.168.1.10:8080/local-server/CreateAccount')
  );
// const register = (email, name, password) => (
//   fetch('http://192.168.1.155:8080/api/register.php',
//   {   
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json'
//       },
//       body: JSON.stringify({ email, name, password })
//   })
//   .then(res => res.text())
// );

module.exports = register;
