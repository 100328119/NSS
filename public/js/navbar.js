$(document).ready(function(){
  popluateNavbar();
});

function popluateNavbar(){
  var bcls = $('#liquorStore');
  var bccs = $('#cannbieStore');
  $.ajax({
    type:'GET',
    url:'/storedata/all'}).then(function(res){
        for(var i = 0; i<res.length; i++){
          if(res[i].type == 'BCLS'){
            bcls.append('<li><a href="/store/'+res[i].type+'/'+res[i].S_ID+'">'+res[i].type+' - '+res[i].S_ID+'</a></li>');
          }else{
            bccs.append('<li><a href="/store/'+res[i].type+'/'+res[i].S_ID+'">'+res[i].type+' - '+res[i].S_ID+'</a></li>');
          }
        }
    });
};

function SideSearch(){
  var input, filter, ul, li, a, i;
   input = document.getElementById("SearchInput");
   filter = input.value.toUpperCase();
   ul_bcls = document.getElementById("liquorStore");
   ul_bccs = document.getElementById("cannbieStore");
   ul_report = document.getElementById("reports");
   li = ul_bcls.getElementsByTagName("li");
   console.log(li);
   for (i = 0; i < li.length; i++) {
       a = li[i].getElementsByTagName("a")[0];
       if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
           li[i].style.display = "";
       } else {
           li[i].style.display = "none";
       }
   }
}
