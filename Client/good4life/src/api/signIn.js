const signIn = () =>(
    new WebSocket('ws://192.168.1.10:8080/local-server/SignIn')
  );
// const signIn = (email, password) => (
//   fetch('http://192.168.1.155:8080/api/login.php',
//   {   
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json'
//       },
//       body: JSON.stringify({ email, password })
//   })
//   .then(res => res.json())
// );

module.exports = signIn;