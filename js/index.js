const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target =
        Number(counter.dataset.target);

        const current =
        Number(counter.innerText);

        const increment =
        target / 100;

        if(current < target){

            counter.innerText =
            Math.ceil(current + increment);

            setTimeout(updateCounter,20);

        }else{

            counter.innerText = target;
        }

    };

    updateCounter();

});