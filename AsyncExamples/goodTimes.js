// goodTimes.js
let myTime = 0.0;
let startTime = new Date();
// What will this do?
setTimeout(function(){
        myTime += 1.0;
        elapsedTime = (new Date() - startTime)/1000.0;
        console.log(`myTime = ${myTime}, elapsedTime = ${elapsedTime}`);
        setTimeout(function(){
            myTime += 1.0;
            elapsedTime = (new Date() - startTime)/1000.0;
            console.log(`myTime = ${myTime}, elapsedTime = ${elapsedTime}`);
            setTimeout(function(){
                myTime += 1.0;
                elapsedTime = (new Date() - startTime)/1000.0;
                console.log(`myTime = ${myTime}, elapsedTime = ${elapsedTime}`);
                setTimeout(function(){
                    myTime += 1.0;
                    elapsedTime = (new Date() - startTime)/1000.0;
                    console.log(`myTime = ${myTime}, elapsedTime = ${elapsedTime}`);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);


