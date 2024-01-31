const getCurrentScript = ()=>{
  if( document.currentScript ){
    return document.currentScript
  }
  return document.currentScript
}
//export default function (url) {
//  let fileName = url + '.min.js'
//  let publicPath =   getCurrentScript()
//  console.log('publicPath ' + publicPath);
//  var script = document.createElement('script');
  
//  script.async = !0
//  script.src = publicPath + '/' + fileName;

//  document.head.appendChild(script);
//}

let publicPath =   getCurrentScript()
console.log(publicPath);