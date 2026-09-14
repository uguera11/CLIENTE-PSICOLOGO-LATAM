module.exports = function handler(req, res) {
  res.setHeader('Cache-Control','no-store');
  res.status(200).json({
  "apiKey": "AIzaSyANd2gwCaulyYhk9hkkOqGeQc4FzzXamCk",
  "authDomain": "mauricio-beron-cursos.firebaseapp.com",
  "projectId": "mauricio-beron-cursos",
  "appId": "1:1032386706056:web:1e9a87c581ee31821a7d3d",
  "messagingSenderId": "1032386706056"
});
};
