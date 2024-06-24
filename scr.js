const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;
const tilesContainer = document.querySelector(".tiles");
let ActiveTile = null;
let revealedCount = 0;
let awaitingEndOfMove = false;

function BuildTile(color)
{
        
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color);

    element.addEventListener("click", () => {
        

        const revealed = element.getAttribute("data-revealed");

        if(awaitingEndOfMove || revealed==true || element==ActiveTile) {
            return;
        }

        element.style.backgroundColor = color;  

        if(ActiveTile === null) {
            console.log("ActiveTile is null");
            ActiveTile = element;
            return;
        }

             
        const colorToMatch = ActiveTile.getAttribute("data-color");

        if(colorToMatch === color) {
            ActiveTile.style.backgroundColor = "silver";
			element.style.backgroundColor = "silver";
            element.setAttribute("data-revealed", "true");
			ActiveTile.setAttribute("data-revealed", "true");

			ActiveTile = null;
			awaitingEndOfMove = false;
			revealedCount += 2;

			if (revealedCount === tileCount) {
				alert("You win! Refresh to start again.");
			}

            

			return;
        }
         

        awaitingEndOfMove = true;

		setTimeout(() => {
            console.log(ActiveTile.style.backgroundColor);
			ActiveTile.style.backgroundColor = null;
			element.style.backgroundColor = null;

			awaitingEndOfMove = false;
			ActiveTile = null;
		}, 50);
	});  

    return element;
    
}

for(let i = 0; i < tileCount; i++) {
    const RndInd = Math.floor(Math.random() * colorsPicklist.length);
    const color = colorsPicklist[RndInd];
    const tile = BuildTile(color);
    colorsPicklist.splice(RndInd, 1);
    tilesContainer.appendChild(tile);
}