let total = 0;
let count = 0;
let queue = [];


function getRandom(amt = 3) {
    if (amt == "") amt = 3;
    //Choose 'amt' Users
    let fSug = [...suggestions];
    let gSug = [];
    for (let i = 0; i < amt; i++) {
        let index = rnd(fSug.length)-1;
        gSug.push(fSug[index]);
        fSug.splice(index,1);
    }
    //Choose random objects
    let randomObjects = [];
    for (let i = 0; i < gSug.length; i++) {
        randomObjects.push(
            {
                user: gSug[i].user,
                item: gSug[i].suggestions.rnd(),
            }
        );
    }

    //Return Items
    return randomObjects;
}
function clear() {
    $("suggestions").innerHTML = "";
}
function trigger() {
    clear();
    queue = getRandom($("<input").value);
    count = queue.length;
    total = count;
    for (let i = 0; i < count; i++) {
        let div = $("suggestions").create("div");
        div.innerHTML = queue[0].item + " [" + queue[0].user + "]";
        div.style.opacity = 0;
        div.className = "suggestion";
        div.id = "sug" + i;
        queue.splice(0,1);
    }
}
function triggerQueue() {
    if (count < 1) return;

    setTimeout(function() {
        $("sug" + (total - count)).style.opacity = 1;
        count--;
    },1)
}


$("button").on("click",trigger);
$("button2").on("click",clear);
document.body.on("keydown",function(e) {
    if (e.key == " ") {
        triggerQueue();
    }
})