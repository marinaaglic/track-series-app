const info = (...serije) => {
    if(process.env.NODE_ENV !=='test'){
      console.log(...serije);
    }
  }
   
  const greska = (...serije) => {
    console.error(...serije);
  }
   
  module.exports = {info, greska}