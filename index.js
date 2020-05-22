async function initDB(){
   ipfs = await window.Ipfs.create();
    await ipfs.ready;
    window.aviondb = await AvionDB.init("myDB", ipfs);
    console.log(await AvionDB.listDatabases())
    window.collection = await aviondb.initCollection("movies");
}
initDB();
async function getMovies(){
      let response = await collection.find({})
      console.log(response)
      if (response.length ==0){
    document.querySelector('#response').innerHTML = "No Movies Listed..";
    return;
 }
    let sectionsContent = `<table class="table table-striped table-hover">
   <tr>
    <th>S.No.</th>
   <th>Movie Id</th>
   <th>Name</th>
   <th>Producer</th>
   <th>Rating</th>
    <th>Rank</th>
    </tr>`

      for (let i = 0; i < response.length; i++) {
                  sectionsContent += `<tr>
                      <td>${i+1}</td>
                      <td>${response[i]._id}</td>
                      <td>${response[i].name}</td>
                      <td>${response[i].producer}</td>
                      <td>${response[i].rating}</td>
                      <td>${response[i].rank}</td>
                      </tr>`
                }
      let content = sectionsContent + `</table>`
      document.querySelector('#response').innerHTML = content
    }

async function getMovie() {
let movieName = document.getElementById('searchMovieName').value
let response = await collection.find({name:movieName})
 console.log(response)
 if (response.length ==0){
   document.querySelector('#response').innerHTML = "No Results..";
   return;
 }
  let sectionsContent = `<table class="table table-striped table-hover">
   <tr>
   <th>Movie Id</th>
   <th>Name</th>
   <th>Producer</th>
   <th>Rating</th>
    <th>Rank</th>
    </tr>
     <tr>
    <td>${response[0]._id}</td>
    <td>${response[0].name}</td>
    <td>${response[0].producer}</td>
    <td>${response[0].rating}</td>
    <td>${response[0].rank}</td>
   </tr></table>`
 document.querySelector('#response').innerHTML = sectionsContent;

}
async function addMovie() {
let name = document.getElementById('a-name').value
let producer = document.getElementById('a-producer').value
let rating = document.getElementById('a-rating').value
let rank = document.getElementById('a-rank').value
   
  await collection.insertOne({
      name: name,
      producer: producer,
      rating: rating,
      rank: rank,
    });
document.querySelector('#response').innerHTML = `New Movie ${name} Added..`;
$('#getMovies').click();
}
async function updateMovie() {
let name = document.getElementById('u-name').value
let producer = document.getElementById('u-producer').value
let rating = document.getElementById('u-rating').value
let rank = document.getElementById('u-rank').value

let response = await collection.update(
    { name: name },
    { $set: { name: name,producer: producer,rank: rank,rating: rating } }
    );
   if (response.length ==0){
   document.querySelector('#response').innerHTML = `No Movie found with ${name}`;
   return;
 }
 console.log(response)
  let sectionsContent = `<table class="table table-striped table-hover">
   <tr>
   <th>Movie Id</th>
   <th>Name</th>
   <th>Producer</th>
   <th>Rating</th>
    <th>Rank</th>
    </tr>
     <tr>
    <td>${response[0]._id}</td>
    <td>${response[0].name}</td>
    <td>${response[0].producer}</td>
    <td>${response[0].rating}</td>
    <td>${response[0].rank}</td>
   </tr></table>`
 document.querySelector('#response').innerHTML = sectionsContent;

}
async function deleteMovie() {
let name = document.getElementById('d-name').value
   await collection.findOneAndDelete({ name: name });
 document.querySelector('#response').innerHTML = `Movie ${name} Deleted Successfully.`;
 $('#getMovies').click();
}
$('#getMovies').click();
