// //promises->->->
// //problem statement the f2 should run after the f1
// function f1(a){
//    //setTimeout(()=>{return 5;},1000);
//    return new Promise((resolve, reject)=>{
//     if(a>0)
//     resolve (a);
//     else
//     reject("Something went wrong")
//    });
// }
// function f2(x){
//     console.log(x+7)
// }
// // const n=f1()
// // const results= f2(n)// by default it will wait 1 sec
// // console.log(results)
// f1(8)
// .then((n)=> f2(n))
// .catch((err) => console.log(err));
// // buy().then((n)=>pay(n));
///////////////////////////////////////////////////////////////////////////////////////////////////////

// FETCHING API DATA AND HEANDELING
//METHOD 1
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((res) => res.json())//fetch the data cominng and converting it into jason
//   .then((data) => {         //parse data into variable
//     data.map(value=>{
//         console.log(value.name,value.email)
//   })
//   })
//   .catch((err) => console.log(err));

//METHOD 2

const fetchData = async () => {
  //use await then add async to parent function

  const res = await fetch("https://jsonplaceholder.typicode.com/users"); //fetch function return promise that's why use await before this as data is dependent on res i.e fetch
  const data = await res.json();
  data.map((val) => {
    console.log(val.name);
  });
};

fetchData();
