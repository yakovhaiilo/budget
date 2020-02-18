let idCounter = 4; 

// remove income or outcome
  function remove(ar,req,res){
   const id = req.params.id;
   let idIndex = ar.findIndex((index) => {return index.id == id});
   if(idIndex == -1){
    res.sendStatus(404);
    return;
   }else{
       ar.splice(idIndex,1);
       res.sendStatus(200);
   }
}


// post for |history / income/ outcome
function post(ar,req,res){
    const newPost = req.body;
    newPost.id = idCounter;
    idCounter++
    ar.push(newPost);
    res.status(201).send(newPost);
}



module.exports.post = post;
module.exports.remove = remove;