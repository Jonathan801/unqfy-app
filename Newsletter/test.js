function holaF(){
    return arguments.callee.name;
}

function testB(func){
    return console.log(func);
}

testB(holaF());